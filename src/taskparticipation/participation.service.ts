import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ApparitionPrisma } from "../domain/participation/ApparitionPrisma";
import { ParticipationAll } from "../domain/participation/ParticipationAll";
import { ParticipationPrisma } from "../domain/participation/ParticipationPrisma";
import { RequestApparitionDTO } from "../dto/participation/RequestApparitionDTO";
import { RequestParticipationDTO } from "../dto/participation/RequestParticipationDTO";
import { TaskService } from "../task/task.service";

@Injectable()
export class ParticipationService {

    constructor(private taskService: TaskService) { }

    async createParticipation(data: RequestParticipationDTO): Promise<ParticipationPrisma> {

        const transactionResult = await this.taskService.$transaction(async (prisma) => {

            const episode = await prisma.episode.findFirst({
                where: {
                    episode: data.episode.episode
                },
                include: {
                    estatus: true,
                    subCategory: true,
                },
            })

            if (!episode) throw new BadRequestException('No se encontro el episodio ' + data.episode.episode)

            const apparitionsInSeconds = data.apparitions.map(a => ({
                initSec: this.convertToSeconds(a.init),
                finishSec: this.convertToSeconds(a.finish)
            }));

            const participationExisting = await prisma.characterParticipation.findFirst({
                where: {
                    episodeId: episode.id,
                    characterId: data.character.id
                },
                include: {
                    episode: {
                        include: {
                            estatus: true,
                            subCategory: true
                        }
                    },
                    character: {
                        include: {
                            estatus: true,
                            subCategory: true
                        }
                    }
                },
            })

            var apparitionExisting = null
            if (participationExisting)
                apparitionExisting = await prisma.characterApparition.findFirst({
                    where: {
                        characterparticipationId: participationExisting.id,
                        OR: apparitionsInSeconds.map(a => ({
                            init: {
                                gte: a.initSec,
                                lte: a.finishSec,
                            },
                            finish: {
                                gte: a.initSec,
                                lte: a.finishSec,
                            }
                        }))
                    }
                })

            if (apparitionExisting) throw new BadRequestException('No debe haber apariciones coincidente en ' + data.apparitions.map(a => a.init + ' - ' + a.finish))

            const createParticipationDto = Object.assign(new RequestParticipationDTO(), data);
            const participation = createParticipationDto.toDomain(episode.id);

            var part = null
            if (participationExisting)
                part = participationExisting
            else
                part = await prisma.characterParticipation.create({
                    data: participation,
                    include: {
                        episode: {
                            include: {
                                estatus: true,
                                subCategory: true
                            }
                        },
                        character: {
                            include: {
                                estatus: true,
                                subCategory: true
                            }
                        }
                    },
                })

            const apar = await Promise.all(
                data.apparitions.map(a => {
                    const createApparitionnDto = Object.assign(new RequestApparitionDTO(), a);
                    return prisma.characterApparition.create({
                        data: createApparitionnDto.toDomain(part.id)
                    })
                }
                )
            )

            return { part, apar };

        });

        const { part, apar } = transactionResult;
        const participationPrisma = Object.assign(new ParticipationPrisma(), part);
        const apparitions = apar.map(a => Object.assign(new ApparitionPrisma(), a))
        participationPrisma.apparitions = apparitions

        return participationPrisma;

    }

    async getAll(characterStatus?: string, episodeStatus?: string, season?: string, page?: string, lon?: string): Promise<ParticipationAll> {

        const filters: Prisma.CharacterParticipationWhereInput = {};
        var thePage = 0;
        var take = lon ? Number(lon) : 5;

        if (page) {
            thePage = Number(page) * take
        }

        if (characterStatus) {
            filters.character = {
                estatus: {
                    description: characterStatus
                }
            };
        }

        if (episodeStatus) {
            filters.episode = {
                estatus: {
                    description: episodeStatus
                }
            };
        }

        if (season) {
            filters.episode = {
                subCategory: {
                    description: season
                }
            };
        }
        const [participations, total] = await Promise.all([
            this.taskService.characterParticipation.findMany({
                where: filters,
                skip: thePage,
                take: take,
                include: {
                    episode: {
                        include: {
                            estatus: true,
                            subCategory: true
                        }
                    },
                    character: {
                        include: {
                            estatus: true,
                            subCategory: true
                        }
                    },
                    characterApparitions: true
                }
            }),
            this.taskService.characterParticipation.count({
                where: filters
            })
        ])
        const particip = participations.map(a => Object.assign(new ParticipationPrisma(), a))
        return {
            info : {
                page: thePage,
                count: total,
                page_size: take
            },
            participations : particip
        }
    }

    async update(id : number, data : RequestApparitionDTO) : Promise<ApparitionPrisma> {

        const actualApparition = await this.taskService.characterApparition.findUnique({
            where : {
                id
            }
        })

        if(!actualApparition) throw new BadRequestException('No se encontro aparicion id '+id)

        const initSec = this.convertToSeconds(data.init)
        const finishSec = this.convertToSeconds(data.finish)

        const apparitionExisting = await this.taskService.characterApparition.findFirst({
            where: {
                characterparticipationId: actualApparition.characterparticipationId,
                    init: {
                        gte: initSec,
                        lte: finishSec,
                    },
                    finish: {
                        gte: initSec,
                        lte: finishSec,
                    }
            }
        })

        if (apparitionExisting) throw new BadRequestException('No se puede solapar aparicion en los min '+data.init+'-'+data.finish)

        const requestApparitionDTO = Object.assign(new RequestApparitionDTO(), data)    
        const apparition =  await this.taskService.characterApparition.update({
            where : {
                id : id
            },
            data : requestApparitionDTO.toDomain(actualApparition.characterparticipationId),
            include : {
                characterParticipation : true
            }
        })

        return Object.assign(new ApparitionPrisma(), apparition)
    }

    async delete(characterId : number, episodeId : number) : Promise<ParticipationPrisma> {
        const participation = await this.taskService.characterParticipation.findFirst({
            where : {
                characterId : characterId,
                episodeId : episodeId
            },
            include: {
                episode: {
                    include: {
                        estatus: true,
                        subCategory: true
                    }
                },
                character: {
                    include: {
                        estatus: true,
                        subCategory: true
                    }
                },
                characterApparitions: true
            }
        })

        if(!participation) throw new BadRequestException('No se encontro el  personaje en el episodio')

        await this.taskService.characterApparition.deleteMany({
            where : {
                characterparticipationId : participation.id
            }
        })
        await this.taskService.characterParticipation.delete({
            where : {
                id : participation.id
            }
        })
        return Object.assign(new ParticipationPrisma(), participation)
    }

    convertToSeconds(time: string): number {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
    }

}
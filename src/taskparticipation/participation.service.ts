import { BadRequestException, Injectable } from "@nestjs/common";
import { log } from "console";
import { ApparitionPrisma } from "src/domain/participation/ApparitionPrisma";
import { ParticipationPrisma } from "src/domain/participation/ParticipationPrisma";
import { RequestApparitionDTO } from "src/dto/participation/RequestApparitionDTO";
import { RequestParticipationDTO } from "src/dto/participation/RequestParticipationDTO";
import { TaskService } from "src/task/task.service";

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

    convertToSeconds(time: string): number {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
    }

}
import { Test, TestingModule } from '@nestjs/testing';
import { RequestParticipationDTO } from '../../src/dto/participation/RequestParticipationDTO';
import { ResponseParticipationDTO } from '../../src/dto/participation/ResponseParticipationDTO';
import { ResponseAllParticipationDTO } from '../../src/dto/participation/ResponseAllParticipationDTO';
import { ResponseApparitionDTO } from '../../src/dto/participation/ResponseApparitionDTO';
import { RequestApparitionDTO } from '../../src/dto/participation/RequestApparitionDTO';
import { ParticipationController } from '../../src/taskparticipation/participation.controller';
import { ParticipationService } from '../../src/taskparticipation/participation.service';
import { CharacterApparition, CharacterParticipation } from '@prisma/client';
import { ParticipationPrisma } from '../../src/domain/participation/ParticipationPrisma';
import { ParticipationAll } from '../../src/domain/participation/ParticipationAll';
import { ApparitionPrisma } from '../../src/domain/participation/ApparitionPrisma';

describe('ParticipationController', () => {
  let controller: ParticipationController;
  let service: ParticipationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationController],
      providers: [
        {
          provide: ParticipationService,
          useValue: {
            createParticipation: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ParticipationController>(ParticipationController);
    service = module.get<ParticipationService>(ParticipationService);
  });

  describe('create', () => {
    it('should create a participation and return it', async () => {
      const createParticipationDto: RequestParticipationDTO = {
          "episode": {
              "episode": "S01E01"
          },
          "character": {
              "id": 23
          },
          "apparitions": [
              {
                  "init": "02:01", "finish": "02:59",
                  toDomain: function (characterParticipationId: number): Omit<CharacterApparition, 'id'> {
                      return {
                          characterparticipationId: characterParticipationId,
                          init: this.convertToSeconds(this.init),
                          finish: this.convertToSeconds(this.finish)
                      };
                  },
                  convertToSeconds: function (time: string): number {
                      const [minutes, seconds] = time.split(':').map(Number);
                      return minutes * 60 + seconds;
                  }
              },
          ],
          toDomain: function (episodeId: number): Omit<CharacterParticipation, 'id'> {
            return {
                episodeId : episodeId,
                characterId : this.character.id,
    
            }
          }
      };

      const createdParticipation = {
        id: 1,
        episodeId: 1,
        characterId: 1,
        episode : {
            id : 1,
            estatus: {
                id : 1,
                description : "ACTIVE"
            },
            subCategory : {
                id : 1,
                description : "SEASON 2"
            }

        },
        character : {
            id : 1,
            estatus: {
                id : 1,
                description : "HUMAN"
            },
            subCategory : {
                id : 1,
                description : "SEASON 2"
            }

        },
        characterApparitions : []
      };

      jest.spyOn(service, 'createParticipation').mockResolvedValue(createdParticipation as any);

      const result = await controller.create(createParticipationDto);
      expect(result).toEqual(ResponseParticipationDTO.of(Object.assign(new ParticipationPrisma(), createdParticipation)));
    });
  });

  describe('getAll', () => {
    it('should return all participations', async () => {
      const participations = {
        info: { page: 1, count: 10, page_size: 5 },
        participations: [
          { id: 1,
            episode : {
                id : 1,
                estatus: {
                    id : 1,
                    description : "ACTIVE"
                },
                subCategory : {
                    id : 1,
                    description : "SEASON 2"
                }
    
            },
            character : {
                id : 1,
                estatus: {
                    id : 1,
                    description : "HUMAN"
                },
                subCategory : {
                    id : 1,
                    description : "SEASON 2"
                }
    
            },
            characterApparitions : []
          }
        ],
      };

      jest.spyOn(service, 'getAll').mockResolvedValue(participations as any);

      const result = await controller.getAll('Active', 'Aired', '1', '1', '5');
      expect(result).toEqual(ResponseAllParticipationDTO.of(Object.assign(new ParticipationAll(), participations)));
    });
  });

  describe('patch', () => {
    it('should update a participation and return it', async () => {
      const requestApparitionDTO: RequestApparitionDTO = {
          init: "10:30",
          finish: "10:35",
          toDomain: function (characterParticipationId: number): Omit<CharacterApparition, 'id'> {
            return {

                characterparticipationId : characterParticipationId,
                init : this.convertToSeconds(this.init),
                finish : this.convertToSeconds(this.finish)
    
            }
          },
          convertToSeconds: function (time: string): number {
            const [minutes, seconds] = time.split(':').map(Number);
            return minutes * 60 + seconds;
          }
      };

      const updatedApparition = {
        id: 1,
        init: 630,
        finish : 635
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedApparition as any);

      const result = await controller.patch(1, requestApparitionDTO);
      expect(result).toEqual(ResponseApparitionDTO.of(Object.assign(new ApparitionPrisma(), updatedApparition)));
    });
  });

  describe('delete', () => {
    it('should delete a participation and return it', async () => {
      const deletedParticipation = {
        id: 1,
        episode : {
            id : 1,
            estatus: {
                id : 1,
                description : "ACTIVE"
            },
            subCategory : {
                id : 1,
                description : "SEASON 2"
            }

        },
        character : {
            id : 1,
            estatus: {
                id : 1,
                description : "HUMAN"
            },
            subCategory : {
                id : 1,
                description : "SEASON 2"
            }

        },
        characterApparitions : []

      };

      jest.spyOn(service, 'delete').mockResolvedValue(deletedParticipation as any);

      const result = await controller.delete(1, 1);
      expect(result).toEqual(ResponseParticipationDTO.of(Object.assign(new ParticipationPrisma(), deletedParticipation)));
    });
  });
});

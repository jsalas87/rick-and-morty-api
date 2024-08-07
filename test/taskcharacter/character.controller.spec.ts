import { Test, TestingModule } from '@nestjs/testing';
import { ResponseCharacterDTO } from '../../src/dto/character/ResponseCharacterDTO';
import { RequestCharacterDTO } from '../../src/dto/character/RequestCharacterDTO';
import { ResponseAllCharacterDTO } from '../../src/dto/character/ResponseAllCharacterDTO';
import { CharacterController } from '../../src/taskcharacter/character.controller';
import { CharacterService } from '../../src/taskcharacter/character.service';
import { Character } from '@prisma/client';
import { CharacterPrisma } from '../../src/domain/character/CharacterPrisma';
import { CharacterAll } from '../../src/domain/character/CharacterAll';

describe('CharacterController', () => {
    let controller: CharacterController;
    let service: CharacterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CharacterController],
            providers: [
                {
                    provide: CharacterService,
                    useValue: {
                        createCharacter: jest.fn(),
                        getFiltered: jest.fn(),
                        getAllCharacters: jest.fn(),
                        updateCharacter: jest.fn(),
                        suspend: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CharacterController>(CharacterController);
        service = module.get<CharacterService>(CharacterService);
    });

    describe('create', () => {
        it('should create a character and return it', async () => {
            const createCharacterDto: RequestCharacterDTO = {
                name: 'Test Character',
                estatus: { description: 'Active' },
                subCategory: { description: 'Hero' },
                type: 'Main',
                gender: 'Male',
                image: 'image_url',
                url: 'character_url',
                toDomanin: function (estatusId: number, subCategoryId: number): Omit<Character, 'id'> {
                    return {
                        name : this.name,
                        estatusId : estatusId,
                        subCategoryId : subCategoryId,
                        type: this.type,
                        gender : this.gender,
                        image : this.image,
                        url: this.url,
                        created : new Date()
                      }
                }
            };

            const createdCharacter = {
                id: 1,
                ...createCharacterDto,
            };

            jest.spyOn(service, 'createCharacter').mockResolvedValue(createdCharacter as any);

            const result = await controller.create(createCharacterDto);
            expect(result).toEqual(ResponseCharacterDTO.of(Object.assign(new CharacterPrisma(), createdCharacter)));
        });
    });

    describe('getFiltered', () => {
        it('should return filtered characters', async () => {
            const characters = [
                { id: 1, name: 'Test Character', estatus: { id: 1, description: 'Active' }, subCategory: { id: 1, description: 'Hero' }, type: 'Main', gender: 'Male', image: 'image_url', url: 'character_url', created: new Date() }
            ];

            const characterAll = {
                info : {
                    page : 0,
                    count : 10,
                    page_size : 5
                },
                characters : characters
            }

            const page = '1';
            const lon = '5';
            const pageNumber = 1;
            const lonNumber = 5;

            jest.spyOn(service, 'getFiltered').mockResolvedValue(characterAll as any);

            const result = await controller.getFiltered('Active', 'Hero', page, lon);
            expect(result).toEqual(ResponseAllCharacterDTO.of(Object.assign(new CharacterAll(),  characterAll)));
        });
    });

    describe('getAll', () => {
        it('should return all characters', async () => {
            const characters = [
                { id: 1, name: 'Test Character', estatus: { id: 1, description: 'Active' }, subCategory: { id: 1, description: 'Hero' }, type: 'Main', gender: 'Male', image: 'image_url', url: 'character_url', created: new Date() }
            ];

            const page = '1';
            const lon = '5';
            const pageNumber = 1;
            const lonNumber = 5;

            const characterAll = {
                info : {
                    page : 0,
                    count : 10,
                    page_size : 5
                },
                characters : characters
            }

            jest.spyOn(service, 'getAllCharacters').mockResolvedValue(characterAll as any);

            const result = await controller.getAll(page, lon);
            expect(result).toEqual(ResponseAllCharacterDTO.of(Object.assign(new CharacterAll(),  characterAll)));
        });
    });

    describe('update', () => {
        it('should update a character and return it', async () => {
            const updateCharacterDto: RequestCharacterDTO = {
                name: 'Updated Character',
                estatus: { description: 'Inactive' },
                subCategory: { description: 'Villain' },
                type: 'Secondary',
                gender: 'Female',
                image: 'new_image_url',
                url: 'new_character_url',
                toDomanin: function (estatusId: number, subCategoryId: number): Omit<Character, 'id'> {
                    throw new Error('Function not implemented.');
                }
            };

            const updatedCharacter = {
                id: 1,
                ...updateCharacterDto,
            };

            jest.spyOn(service, 'updateCharacter').mockResolvedValue(updatedCharacter as any);

            const result = await controller.update(1, updateCharacterDto);
            expect(result).toEqual(ResponseCharacterDTO.of(Object.assign(new CharacterPrisma(), updatedCharacter)));
        });
    });

    describe('deleteTask', () => {
        it('should delete a character and return it', async () => {
            const deletedCharacter = {
                id: 1,
                name: 'Deleted Character',
                estatus: { id: 1, description: 'Active' },
                subCategory: { id: 1, description: 'Hero' },
                type: 'Main',
                gender: 'Male',
                image: 'image_url',
                url: 'character_url',
                created: new Date(),
            };

            jest.spyOn(service, 'suspend').mockResolvedValue(deletedCharacter as any);

            const result = await controller.deleteTask(1);
            expect(result).toEqual(ResponseCharacterDTO.of(Object.assign(new CharacterPrisma(), deletedCharacter)));
        });
    });
});

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CharacterAll } from "../domain/character/CharacterAll";
import { CharacterPrisma } from "../domain/character/CharacterPrisma";
import { RequestCharacterDTO } from "../dto/character/RequestCharacterDTO";
import { TaskService } from "../task/task.service";

@Injectable()
export class CharacterService {

  constructor(private taskService: TaskService) { }

  async createCharacter(data: RequestCharacterDTO): Promise<CharacterPrisma> {

    const futEstatus = this.taskService.estatus.findFirst({
      where: {
        description: data.estatus.description.trim().toUpperCase()
      }
    })

    const futSubCategory = this.taskService.subCategory.findFirst({
      where: {
        description: data.subCategory.description.trim().toUpperCase()
      }
    })

    const existingCharacter = await this.taskService.character.findFirst({
      where: {
        name: data.name,
        estatus: {
          description: data.estatus.description.trim().toUpperCase(),
        },
        subCategory: {
          description: data.subCategory.description.trim().toUpperCase(),
        },
      },
      include: {
        estatus: true,
        subCategory: true,
      },
    });

    const estatus = await futEstatus
    if (!estatus) throw new BadRequestException('No se encontro estatus ' + data.estatus.description)
    const subCategory = await futSubCategory
    if (!subCategory) throw new BadRequestException('No se encontro subCategoria ' + data.subCategory.description)

    if (existingCharacter) {
      throw new BadRequestException(
        `Personaje '${data.name}' ya existe para el estatus y subcategoria indicada.`,
      );
    }

    const createCharacterDto = Object.assign(new RequestCharacterDTO(), data);
    const character = createCharacterDto.toDomanin(estatus.id, subCategory.id);


    return this.taskService.character.create({
      data: character,
      include: {
        estatus: true,
        subCategory: true,
      },
    })
  }

  async getFiltered(estatusDescription: string, subCategoryDescription: string, skip: number = 0, take: number = 5): Promise<CharacterAll> {

    const page = (skip * take) || 0
    const lon = take || 5

    const [characters, total] = await Promise.all([
      this.taskService.character.findMany({
        where: {
          estatus: {
            description: estatusDescription.trim().toUpperCase(),
          },
          subCategory: {
            description: subCategoryDescription.trim().toUpperCase(),
          },
        },
        skip: page,
        take: lon,
        include: {
          estatus: true,
          subCategory: true,
        },
      }),
      this.taskService.character.count({
        where: {
          estatus: {
            description: estatusDescription.trim().toUpperCase(),
          },
          subCategory: {
            description: subCategoryDescription.trim().toUpperCase(),
          },
        },
      }),
    ]);

    if (characters.length <= 0) throw new NotFoundException('No se encontraron personajes por estatus y subcategoria')
    return {
      info: {
        page: page,
        count: total,
        page_size: lon
      },
      characters: characters
    }

  }

  async getAllCharacters(skip: number = 0, take: number = 5): Promise<CharacterAll> {

    const page = (skip * take) || 0
    const lon = take || 5

    const [characters, total] = await Promise.all([
      this.taskService.character.findMany({
        skip: (skip * take) || 0,
        take: take || 5,
        include: {
          estatus: true,
          subCategory: true,
        },
      }),
      this.taskService.character.count(),
    ]);

    return {
      info: {
        page: page,
        count: total,
        page_size: lon
      },
      characters: characters
    }
  }

  async updateCharacter(id: number, data: RequestCharacterDTO): Promise<CharacterPrisma> {

    const characterOld = await this.taskService.character.findUnique({
      where: {
        id
      },
      include: {
        estatus: true,
        subCategory: true,
      }
    });

    var estatus = null
    if (data.estatus && data.estatus.description) {
      estatus = await this.taskService.estatus.findFirst({
        where: {
          description: data.estatus.description.trim().toUpperCase()
        }
      })
      if (!estatus) throw new BadRequestException('No se encontro estatus ' + data.estatus.description)
    } else {
      estatus = characterOld.estatus
    }


    var subCategory = null
    if (data.subCategory && data.subCategory.description) {
      subCategory = await this.taskService.subCategory.findFirst({
        where: {
          description: data.subCategory.description.trim().toUpperCase()
        }
      })
      if (!subCategory) throw new BadRequestException('No se encontro subCategoria ' + data.subCategory.description)
    } else {
      subCategory = characterOld.subCategory
    }

    const estatusDesc = (data.estatus && data.estatus.description) ? data.estatus.description : characterOld.estatus.description
    const subCategoryDesc = (data.subCategory && data.subCategory.description) ? data.subCategory.description : characterOld.subCategory.description
    const nameDesc = data.name || characterOld.name

    const existingCharacter = await this.taskService.character.findFirst({
      where: {
        name: nameDesc,
        estatus: {
          description: estatusDesc.trim().toUpperCase(),
        },
        subCategory: {
          description: subCategoryDesc.trim().toUpperCase(),
        },
        id: {
          not: id
        }
      },
      include: {
        estatus: true,
        subCategory: true,
      },
    });

    if (existingCharacter) {
      throw new BadRequestException(
        `Personaje '${data.name}' ya existe para el estatus y subcategoria indicada.`,
      );
    }

    const createCharacterDto = Object.assign(new RequestCharacterDTO(), data);
    const character = createCharacterDto.toDomanin(estatus.id, subCategory.id);
    try {
      return this.taskService.character.update({
        where: {
          id
        },
        data: character,
        include: {
          estatus: true,
          subCategory: true,
        }
      })
    } catch (error) {
      throw new NotFoundException('Character id ' + id + ' No encontrada')
    }
  }

  async suspend(id: number): Promise<CharacterPrisma> {

    const estatus = await this.taskService.estatus.findFirst({
      where: {
        description: "SUSPENDED"
      }
    })

    try {
      return await this.taskService.character.update({
        where: {
          id: id,
          estatusId: {
            not: estatus.id
          }
        },
        data: {
          estatusId: estatus.id
        },
        include: {
          estatus: true,
          subCategory: true,
        }
      })
    } catch (error) {
      throw new NotFoundException('Character id ' + id + ' No encontrada')
    }
  }

}
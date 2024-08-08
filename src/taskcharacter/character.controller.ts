import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { CharacterService } from "./character.service";
import { RequestCharacterDTO } from "src/dto/character/RequestCharacterDTO";
import { ResponseCharacterDTO } from "src/dto/character/ResponseCharacterDTO";
import { ResponseAllCharacterDTO } from "src/dto/character/ResponseAllCharacterDTO";

@Controller('character')
export class CharacterController {

    constructor(private readonly characterService : CharacterService) {}

    @Post()
    async create(@Body() createCharacterDto: RequestCharacterDTO): Promise<ResponseCharacterDTO> {
      const character = await this.characterService.createCharacter(createCharacterDto);
      return ResponseCharacterDTO.of(character);
    }

    @Get('estatus/:estatusDesc/subcategory/:subCategoryDesc')
    async getFiltered(@Param('estatusDesc') estatusDesc : string, @Param('subCategoryDesc') subCategoryDesc : string,
                      @Query('page') page?: string, @Query('lon') lon?: string) {

        const pageNumber = page ? parseInt(page, 10) : 0;
        const lonNumber = lon ? parseInt(lon, 5) : 5;

        const characters =  await this.characterService.getFiltered(estatusDesc, subCategoryDesc, pageNumber,  lonNumber)
        return ResponseAllCharacterDTO.of(characters);
    }

    @Get()
    async getAll(@Query('page') page?: string, @Query('lon') lon?: string) {
        const pageNumber = page ? parseInt(page, 10) : 0;
        const lonNumber = lon ? parseInt(lon, 5) : 5;
        const characters =  await this.characterService.getAllCharacters(pageNumber, lonNumber);
        return ResponseAllCharacterDTO.of(characters);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id : number, @Body() data : RequestCharacterDTO) {
        const character = await this.characterService.updateCharacter(Number(id), data)
        return ResponseCharacterDTO.of(character);

    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id : number) {
        const character = await this.characterService.suspend(Number(id))
        return ResponseCharacterDTO.of(character);
    }

}
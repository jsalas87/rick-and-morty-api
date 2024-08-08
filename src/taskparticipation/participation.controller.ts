import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ParticipationService } from "./participation.service";
import { RequestParticipationDTO } from "src/dto/participation/RequestParticipationDTO";
import { ResponseParticipationDTO } from "src/dto/participation/ResponseParticipationDTO";
import { ResponseCharacterDTO } from "src/dto/character/ResponseCharacterDTO";
import { ResponseAllParticipationDTO } from "src/dto/participation/ResponseAllParticipationDTO";
import { ResponseApparitionDTO } from "src/dto/participation/ResponseApparitionDTO";
import { RequestApparitionDTO } from "src/dto/participation/RequestApparitionDTO";

@Controller('participation')
export class ParticipationController {

    constructor(private readonly participationService : ParticipationService) {}

    @Post()
    async create(@Body() createParticipationDto: RequestParticipationDTO): Promise<ResponseParticipationDTO> {
      const participationPrisma = await this.participationService.createParticipation(createParticipationDto)
      return ResponseParticipationDTO.of(participationPrisma);
    }

    @Get()
    async getAll(@Query('characterStatus') characterStatus?: string,
                 @Query('episodeStatus') episodeStatus?: string,
                 @Query('season') season?: string,
                 @Query('page') page?: string,
                 @Query('lon') lon?: string) : Promise<ResponseAllParticipationDTO> {
      const participation = await this.participationService.getAll(characterStatus, episodeStatus, season, page, lon)
      return ResponseAllParticipationDTO.of(participation)
    }

    @Patch(':id')
    async patch(@Param('id', ParseIntPipe) id : number, @Body() requestApparitionDTO : RequestApparitionDTO) : Promise<ResponseApparitionDTO> {
      const apparition = await this.participationService.update(id,requestApparitionDTO)
      return ResponseApparitionDTO.of(apparition)
    }

    @Delete('/episode/:episodeId/character/:characterId')
    async delete(@Param('episodeId', ParseIntPipe) episodeId : number, 
                 @Param('characterId', ParseIntPipe) characterId : number) : Promise<ResponseParticipationDTO> {
      const participation = await this.participationService.delete(characterId, episodeId)
      return ResponseParticipationDTO.of(participation)
    }

}
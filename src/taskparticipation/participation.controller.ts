import { Body, Controller, Post } from "@nestjs/common";
import { ParticipationService } from "./participation.service";
import { RequestParticipationDTO } from "src/dto/participation/RequestParticipationDTO";
import { ResponseParticipationDTO } from "src/dto/participation/ResponseParticipationDTO";
import { ResponseCharacterDTO } from "src/dto/character/ResponseCharacterDTO";

@Controller('participation')
export class ParticipationController {

    constructor(private readonly participationService : ParticipationService) {}

    @Post()
    async create(@Body() createParticipationDto: RequestParticipationDTO): Promise<ResponseParticipationDTO> {
      const participationPrisma = await this.participationService.createParticipation(createParticipationDto)
      return ResponseParticipationDTO.of(participationPrisma);
    }

}
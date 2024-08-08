import { Character, CharacterApparition, CharacterParticipation, Episode } from "@prisma/client";
import { ApparitionPrisma } from "./ApparitionPrisma";
import { EpisodePrisma } from "../episode/EpisodePrisma";
import { CharacterPrisma } from "../character/CharacterPrisma";

export class ParticipationPrisma implements CharacterParticipation {
    id: number;
    episodeId: number;
    characterId: number;
    episode : EpisodePrisma;
    character : CharacterPrisma;
    characterApparitions : ApparitionPrisma[]

}
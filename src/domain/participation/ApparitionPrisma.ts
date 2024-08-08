import { CharacterApparition } from "@prisma/client";
import { ParticipationPrisma } from "./ParticipationPrisma";

export class ApparitionPrisma implements CharacterApparition {
    id: number;
    characterparticipationId: number;
    init: number;
    finish: number;
    characterParticipation : ParticipationPrisma;
}
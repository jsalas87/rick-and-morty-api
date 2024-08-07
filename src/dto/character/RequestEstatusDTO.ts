import { IsString } from "class-validator"

export class RequestEstatusDTO {
    @IsString()
    description: string;
}
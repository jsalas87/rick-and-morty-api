import { IsString } from "class-validator"

export class ResponseEstatusDTO {
    id : number
    @IsString()
    description: string;
}
import { IsString } from "class-validator";

export class ResponseSubCategoryDTO {

    id : number
    @IsString()
    description: string;

}
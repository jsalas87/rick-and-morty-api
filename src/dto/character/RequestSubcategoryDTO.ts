import { IsString } from "class-validator";

export class RequestSubCategoryDTO {

    @IsString()
    description: string;

}
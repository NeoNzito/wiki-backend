import { IsNotEmpty } from "class-validator";


export class CreateCommunityDTO {
    @IsNotEmpty()
    title: string;

    description: string;

    @IsNotEmpty()
    ownerId: string;
}
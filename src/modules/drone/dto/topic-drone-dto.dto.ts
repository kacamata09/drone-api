import { ApiProperty } from "@nestjs/swagger";
export class TopicDroneDto {
    @ApiProperty({example: "kirei/drone"})
    topic : string   
}

import { ApiProperty } from "@nestjs/swagger";
export class MessageDroneDto {
    @ApiProperty({example: "kirei/drone"})
    topic : string
    
    @ApiProperty({example : {lat : 6.012323, lon: -105.2323}})
    message : any
}

import { ApiProperty } from "@nestjs/swagger";
export class MessageDroneDto {
    @ApiProperty({ example: 'RS. Arjuna W338' })
    name: string;
  
    @ApiProperty({ example: 'Jl. Bima' })
    address: string;
  
    @ApiProperty({ example: '-4.002323' })
    lat: string;
  
    @ApiProperty({ example: '1.040021' })
    lon: string;
  
    @ApiProperty({ example: 'Pajajaran' })
    desa: string;
  
    @ApiProperty({ example: 'Cicendo' })
    kecamatan: string;
  
    @ApiProperty({ example: 'Bandung' })
    kabupaten: string;
  
    @ApiProperty({ example: 'Jawa Barat' })
    provinsi: string;
}

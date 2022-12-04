import { IsNumber, IsString } from "class-validator";

export class createEquipmentDto {
  
  @IsString()
  equipmentId: string;

  @IsString()
  equipmentName: string;

  description?: string

  width?: number

  height?: number

}
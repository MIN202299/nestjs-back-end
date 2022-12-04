import { EquipmentService } from './equipment.service';
import { Body, Controller, Post } from "@nestjs/common";
import { createEquipmentDto } from "./dto/createEquipment.dto";


@Controller('equip')
export class EquipmentController {

  constructor(
    private readonly equipmentService: EquipmentService
  ) {}

  @Post('register')
  async createEquipment(@Body() body: createEquipmentDto) {
    return this.equipmentService.createEquipment(body)
  }
}

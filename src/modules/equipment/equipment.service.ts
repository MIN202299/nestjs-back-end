import { createEquipmentDto } from './dto/createEquipment.dto';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from "@nestjs/common";
import { Equipment } from 'src/entities/equipment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipmentService {

  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>
  ) {}

  async createEquipment(payload: createEquipmentDto): Promise<Equipment | undefined> {

    const existingEquipment = await this.equipmentRepository.findOne({
      where: { equipmentId: payload.equipmentId }
    })

    if (existingEquipment) {
      throw new BadRequestException(['设备已存在'])
    }

    const equipment = new Equipment();

    equipment.equipmentId = payload.equipmentId;
    equipment.equipmentName = payload.equipmentName;
    equipment.description = payload.description;
    equipment.height = payload.height
    equipment.width = payload.width

    return await this.equipmentRepository.save(equipment)

  }

}
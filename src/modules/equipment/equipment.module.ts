import { EquipmentService } from './equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentController } from './equipment.controller';
import { Module } from "@nestjs/common";
import { Equipment } from 'src/entities/equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Equipment])
  ],
  providers: [EquipmentService],
  controllers: [EquipmentController]
})
export class EquipmentModule {}
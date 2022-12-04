import { EquipmentModule } from './modules/equipment/equipment.module';
import { ormConfig } from './config/config.dev';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig
    }),
    UserModule,
    AuthModule,
    EquipmentModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

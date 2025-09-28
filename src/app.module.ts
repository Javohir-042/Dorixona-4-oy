import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediciesModule } from './medicies/medicies.module';
import { StockModule } from './stock/stock.module';
import { DistrictModule } from './district/district.module';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { RegionModule } from './region/region.module';
import { Region } from './region/model/region.model';
import { Pharmacies } from './pharmacies/model/pharmacy.model';
import { District } from './district/model/district.model';
import { Stock } from './stock/model/stock.model';
import { Medicies } from './medicies/model/medicy.model';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from './admin/model/admin.model';
import { MedicineType } from './medicine-type/model/medicine-type.model';
import { MedicineTypeModule } from './medicine-type/medicine-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASS),
      database: String(process.env.DB_NAME),
      logging: false,
      synchronize: true,
      autoLoadModels: true,
      models: [Medicies, MedicineType, Stock, District, Pharmacies, Region, Admin],
    }),

    AdminModule,
    AuthModule,
    MedicineTypeModule,
    MediciesModule,
    StockModule,
    DistrictModule,
    PharmaciesModule,
    RegionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

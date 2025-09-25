import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Medicies } from "../../medicies/model/medicy.model";

interface IMedicine_type{
    id?: number;
    name: string;
}

@Table({ tableName: 'medicine_type'})
export class MedicineType extends Model<IMedicine_type>{
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @HasMany(() => Medicies)
    declare medicies: Medicies[];
}

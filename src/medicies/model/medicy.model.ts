import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { MedicineType } from "../../medicine-type/model/medicine-type.model";
import { Stock } from "../../stock/model/stock.model";

interface IMedicies {
    id?: number;
    name: string;
    manufacturer: string;
    medicine_type_id: number;
    price: number;
    expiry_date: string;
    info: string;
}

@Table({ tableName: 'medicies' })
export class Medicies extends Model<IMedicies> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare manufacturer: string;


    @ForeignKey(() => MedicineType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare medicine_type_id: number;

    @BelongsTo(() => MedicineType)
    medicineType: MedicineType;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare price: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare expiry_date: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare info: string;

    @HasMany(() => Stock)
    declare stock: Stock[];
}

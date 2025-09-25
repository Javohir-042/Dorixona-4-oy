import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Pharmacies } from "../../pharmacies/model/pharmacy.model";
import { Medicies } from "../../medicies/model/medicy.model";

interface IStock{
    id?: number;
    pharmacy_id: number;
    medicine_id: number;
    quantity: string;
}

@Table({ tableName: 'stock'})
export class Stock extends Model<IStock>{
    @ForeignKey(() => Pharmacies)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare pharmacy_id: number;

    @BelongsTo(() => Pharmacies)
    declare pharmacies: Pharmacies;


    @ForeignKey(() => Medicies)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare medicine_id: number;

    @BelongsTo(() => Medicies)
    declare medicies: Medicies;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare quantity: string;
}

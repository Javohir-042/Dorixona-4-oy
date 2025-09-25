import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/model/region.model";
import { District } from "../../district/model/district.model";
import { Stock } from "../../stock/model/stock.model";
import { Medicies } from "../../medicies/model/medicy.model";

interface IPharmacies {
    id?: number;
    name: string;
    address: string;
    location: string;
    phone: string;
    email: string;
    region_id: number;
    district_id: number;
}

@Table({ tableName: 'pharmacies' })
export class Pharmacies extends Model<IPharmacies> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare location: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare email: string;

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare region_id: number;

    @BelongsTo(() => Region)
    declare region: Region;


    @ForeignKey(() => District)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare district_id: number;

    @BelongsTo(() => District)
    declare district: District;


    @HasMany(() => Stock)
    declare stock: Stock[];

    @BelongsToMany(() => Medicies, () => Stock)
    medicies: Medicies[];

}

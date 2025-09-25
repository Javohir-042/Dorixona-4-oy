import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/model/region.model";
import { Pharmacies } from "../../pharmacies/model/pharmacy.model";

interface IDistrict {
    id?: number;
    name: string;
    region_id: number;
}

@Table({ tableName: 'district' })
export class District extends Model<IDistrict> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare region_id: number;

    @BelongsTo(() => Region)
    declare region: Region;


    @HasMany(() => Pharmacies)
    declare pharmacies: Pharmacies[];
}

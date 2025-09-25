import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "../../district/model/district.model";
import { Pharmacies } from "../../pharmacies/model/pharmacy.model";

interface IRegion {
    id?: number;
    name: string;
}

@Table({ tableName: "region" })
export class Region extends Model<IRegion> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @HasMany(() => District)
    declare district: District[];

    @HasMany(() => Pharmacies)
    declare pharmacies: Pharmacies[];

}

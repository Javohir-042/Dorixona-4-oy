import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../../common/enum/admin-enum";

interface IAdminCreationAttr {
    name: string;
    email: string;
    password: string;
    is_Active: boolean;
    role: string;
}


@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    })
    declare password: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    declare is_Active: boolean;

    @Column({
        type: DataType.ENUM(...Object.values(Role)),
        allowNull: false,
        defaultValue: Role.ADMIN,
    })
    declare role: Role;
}


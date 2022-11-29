import {Column, DataType, Model, Table} from "sequelize-typescript";
import {Optional} from "sequelize";

interface UserAttributes {
    id: number,
    user_name: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {

}

@Table({
    tableName: 'user'
})
export default class UserAdminModel extends Model <UserAttributes, UserCreationAttributes> {
    @Column({
        type: DataType.INET,
        primaryKey: true
    })
    id?: number

    @Column({
        type: DataType.STRING
    })
    user_name?: string

    @Column({
        type: DataType.CHAR(64)
    })
    password?: string

    @Column({
        type:DataType.STRING
    })
    user_account?:string
}


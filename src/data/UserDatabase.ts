import BaseDatabase  from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

   static TABLE_NAME = "NOME_TABELA_USUARIOS";

  public async createUser(
    email: string,
    name: string,
    password: string,
    role: string,
    id?: string,
  ): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await BaseDatabase.connection
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }

}
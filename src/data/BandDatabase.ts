import BaseDatabase  from "./BaseDatabase";
import {Band} from "../model/Band";

export class BandDatabase extends BaseDatabase{

    static TABLE_NAME = "NOME_TABELA_BANDAS"

    public async createBand(
        id: string,
        name: string,
        music_genre:string,
        responsible: string
    ) {
        try{
            await BaseDatabase.connection
            .insert({
                id,
                name,
                music_genre,
                responsible
            })
            .into(BandDatabase.TABLE_NAME)
        }catch(error: any){
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
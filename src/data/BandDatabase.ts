import BaseDatabase  from "./BaseDatabase";
import {Band} from "../model/Band";

export class BandDatabase extends BaseDatabase{
    getBandDetails(info: string) {
        throw new Error("Method not implemented.");
    }

    private static toBandModel (band: any) {
        return band && new Band(
            band.id,
            band.name,
            band.music_genre,
            band.responsible
        )
    }

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
        }catch(error){
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async selectBandById(
        id: string
    ): Promise<Band> {
        try {
            const result = await BaseDatabase.connection
                .select("*")
                .from(BandDatabase.TABLE_NAME)
                .where({ id })
                
            return BandDatabase.toBandModel(result[0])
        } catch (error) {
            throw new Error("An unexpected error ocurred")
        }
    }

    public async selectBandByName(
        name: string
    ): Promise<Band> {
        try {
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${BandDatabase.TABLE_NAME}
                WHERE name LIKE "%${name}%"
            `)
                
            return BandDatabase.toBandModel(result[0][0])
        } catch (error) {
            throw new Error("Algo deu errado com a sua requisição =(")
        }
    }

    public async selectAllBands() 
    : Promise<Band[]> {
        try {
            const result = await BaseDatabase.connection
                .select("*")
                .from(BandDatabase.TABLE_NAME)
                
            const bands: Band[] = []
            for (let band of result) {
                bands.push(
                    BandDatabase.toBandModel(band)
                )
            }

            return bands
        } catch (error) {
            throw new Error("Algum erro ocorreu!")
        }
    }
}
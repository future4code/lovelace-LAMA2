import { BandInputDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { Authenticator } from "../service/Authenticator";


export class BandBusiness {

    async createBand(band:BandInputDTO){

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const bandDatabase = new BandDatabase();
        await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id });

        return accessToken
    }

}
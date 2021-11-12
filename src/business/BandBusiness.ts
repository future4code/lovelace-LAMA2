import { BandInputDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { Authenticator } from "../service/Authenticator";


export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase
    ) {

    }

    async createBand(band:BandInputDTO){

        if (!band.name || !band.music_genre || !band.responsible) {
            throw new Error("Preencha os campos corretamente!")
        }

        const id = this.idGenerator.generate();

        await this.bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

        const accessToken = this.authenticator.generateToken({ id });

        return accessToken
    }

}
import { Band, BandInputDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { Authenticator } from "../service/Authenticator";


export class BandBusiness {
    static getBandByProperty(token: string, id: string, name: string) {
        throw new Error("Method not implemented.");
    }

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


    public async getBandByProperty(
        token: string,
        id: string,
        name: string
    ): Promise<Band> {
        try {
            this.authenticator.getData(token);

            if (!id && !name) {
                throw new Error("Preencha os campos id ou nome de forma correta!")
            }

            let band: Band

            if (id) {
                band = await this.bandDatabase.selectBandById(id)
            } else {
                band = await this.bandDatabase.selectBandByName(name)
            }

            if (!band) {
                throw new Error("Banda não encontrada!")
            }

            return band

        } catch (error) {
            throw new Error(
                error.message
            )
        }
    }
}
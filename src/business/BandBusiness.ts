import { Band, BandInputDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { Authenticator } from "../service/Authenticator";


export class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase
    ) { }

    async createBand(band: BandInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const bandDatabase = new BandDatabase();
        await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id });

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
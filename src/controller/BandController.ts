import { Request, Response } from "express";
import  BaseDatabase  from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";
import { IdGenerator } from "../service/IdGenerator";
import { Authenticator } from "../service/Authenticator";
import { BandDatabase } from "../data/BandDatabase";

const idGenerator = new IdGenerator()

const authenticator = new Authenticator()

const bandDatabase = new BandDatabase()

export class BandController{

    async registerBand(req: Request, res:Response){
        try{

            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness(
               idGenerator,
               authenticator,
               bandDatabase
                )
            
            const token = await bandBusiness.createBand(input)

            res.status(200).send({ token });

        }catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }


    public async getBandByProperty (req: Request, res: Response) {
        try {
            const token: string = req.headers.authorization!
            const id = req.query.id as string
            const name = req.query.name as string
            
            const result = await BandBusiness.getBandByProperty(token, id, name)

            res.status(200).send({ result })

        } catch (error) {
            res
            .status(error.statusCode || 400)
            .send({ error: error.message });
        }
    }
}
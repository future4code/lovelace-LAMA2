import { Request, Response } from "express";
import  BaseDatabase  from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";

export class BandController{

    async registerBand(req: Request, res:Response){
        try{

            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness
            const token = await bandBusiness.createBand(input)

            res.status(200).send({ token });

        }catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}
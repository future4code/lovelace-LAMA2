import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import  BaseDatabase  from "../data/BaseDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { HashManager } from "../service/HashManager";
import { Authenticator } from "../service/Authenticator";
import { UserDatabase } from "../data/UserDatabase";

const idGenerator = new IdGenerator()
const hashManager = new HashManager()
const autenticator = new Authenticator()
const userDatabase = new UserDatabase()

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const userBusiness = new UserBusiness(
                idGenerator,
                hashManager,
                autenticator,
                userDatabase
            );
            const token = await userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const userBusiness = new UserBusiness(
                idGenerator,
                hashManager,
                autenticator,
                userDatabase
            );
            const token = await userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}
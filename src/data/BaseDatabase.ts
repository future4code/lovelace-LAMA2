import knex from "knex";
import dotenv from "dotenv";


dotenv.config();

export default class BaseDatabase {    
     static connection = knex({        
        client: "mysql",        
        connection: {            
            host: process.env.DB_HOST,            
            user: process.env.DB_USER,            
            password: process.env.DB_PASSWORD,            
            database: process.env.DB_NAME,            
            port: 3306,            
            multipleStatements: true       
        }    
    });

    public static async destroyConnection(): Promise<void>{
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
        }
    }
}
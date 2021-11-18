import BaseDatabase from "./BaseDatabase";

export const bandaTableName = "NOME_TABELA_BANDAS";
export const showsTableName = "NOME_TABELA_SHOWS";
export const usuariosTableName = "NOME_TABELA_USUARIOS";


export class migrations extends BaseDatabase {

   static createTables = async () => {
      try {
         await BaseDatabase.connection.raw(`
         CREATE TABLE IF NOT EXISTS ${bandaTableName} (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL,
         music_genre VARCHAR(255) NOT NULL,
         responsible VARCHAR(255) UNIQUE NOT NULL 
         )
         `)

         await BaseDatabase.connection.raw(`
         CREATE TABLE IF NOT EXISTS ${showsTableName} (
         id VARCHAR(255) PRIMARY KEY,
         week_day VARCHAR(255) NOT NULL,
         start_time INT NOT NULL,
         end_time INT NOT NULL,
         band_id VARCHAR(255) NOT NULL,
         FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
          )
          `)
         
          await BaseDatabase.connection.raw(`
          CREATE TABLE IF NOT EXISTS ${usuariosTableName}(
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
          )
         
          `)  


         console.log("Tabelas criadas com sucesso!");
      } catch (error) {
         console.log(error)
      };
   };
};

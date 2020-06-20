import 'reflect-metadata';
import type { Server } from 'http';
import express, { Express } from 'express';
import type { Connection } from 'typeorm';
import type { ApolloServer } from 'apollo-server-express';
import config from './nconf';
import { initApolloServer } from './init_apollo_server';
import { initDatabase } from './init_db';
import { integer } from './custom_types';


export class Application
{
   private _server: Server | undefined;
   private _db_conn: Connection | undefined;
   private _apollo: ApolloServer | undefined;


   constructor(
      private readonly _host: string,
      private readonly _port: integer,
      private readonly _restInitialisator: () => Express,
      private readonly _dbInitialisator: () => Promise<Connection>,
      private readonly _apolloInitialisator: () => Promise<ApolloServer>,
   ) {}


   public async start(): Promise<void>
   {
      try {
         const [conn, apollo] = await Promise.all([
            this._dbInitialisator(),
            this._apolloInitialisator(),
         ]);
         this._db_conn = conn;
         this._apollo = apollo;

         const app = this._restInitialisator();
         this._apollo.applyMiddleware({app});

         this._server = app.listen(this._port, this._host, () => {
            console.info(`server started on http://${this._host}:${this._port}/graphql`);
         });

      } catch (err) {
         console.error(err);
         return this.stop();
      }
   }


   public async stop(): Promise<void>
   {
      this._server?.close();

      await Promise.all([
         this._apollo?.stop(),
         this._db_conn?.close(),
      ]);
   }
}

export const application = new Application(
   config.get('host'),
   config.get('port'),
   express,
   initDatabase,
   initApolloServer,
);
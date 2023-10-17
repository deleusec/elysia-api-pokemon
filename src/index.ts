import { Elysia, t } from "elysia";

import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';

import "./config/database/db";
import { pokemons } from "./api/routes/pokemons.route"
import { users } from "./api/routes/users.route"

const app = new Elysia();

app.use(
  swagger({
    path: '/api',
    documentation: {
      info : {
        title : 'Bun.js CRUD app with Elysia.js',
        version: '1.0.0',
      }
    }
  })
)
app.use(cors())
app.use(helmet())
app.get("/", ()=> "Welcome in Elysia ! 🦊" )

app.group("/api", app => 
  app.use(pokemons)
  .use(users)
)


app.listen( process.env.PORT??3000 ,()=>
  console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
);
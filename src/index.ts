import { Elysia, t } from "elysia";
import "./config/database/db";
import { pokemons } from "./api/routes/pokemons.route"
import { users } from "./api/routes/users.route"

const app = new Elysia();

app.get("/", ()=> "Welcome in Elysia ! 🦊" )

app.group("/api", app => 
  app.use(pokemons)
  .use(users)
)

app.listen( process.env.PORT??3000 ,()=>
  console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
);
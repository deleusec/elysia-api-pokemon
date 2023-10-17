import { Elysia, t } from "elysia";
import "./config/database/db";
import { pokemons } from "./routes/pokemons.route"

const app = new Elysia();

app.get("/", ()=> "Welcome in Elysia ! 🦊" )

app.group("/api", app => 
  app.use(pokemons)
)

app.listen( process.env.PORT??3000 ,()=>
  console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
);
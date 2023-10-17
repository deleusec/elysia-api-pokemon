import { Elysia, t } from "elysia";
import "./config/database/db";
import { pokemonsController } from './controllers/pokemons.controller';


const app = new Elysia();

//app.get("/", ()=> "Hello World !" )
app.use(pokemonsController)

app.listen( 3000 ,()=>
  console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
);
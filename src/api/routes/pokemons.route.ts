import { Elysia, t } from "elysia";
import { pokemonsController } from "../controllers/pokemons.controller";

export const pokemons = new Elysia().group('/pokemons', app => 
    app.use(pokemonsController)
)
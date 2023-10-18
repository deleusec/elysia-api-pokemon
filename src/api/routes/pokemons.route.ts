import { createElysia } from "../../utils/createElysia";
import { pokemonsController } from "../controllers/pokemons.controller";

export const pokemons = createElysia().group('/pokemons', app => 
    app.use(pokemonsController)
)
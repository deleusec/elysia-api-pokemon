import { Elysia, t } from "elysia";
import Pokemon, { IPokemon } from '../entities/pokemon.schema';

export const pokemonsController = new Elysia()
  .get('/get', async ({ set }) => {
    try {
        const pokemons = await Pokemon.find({});
        return pokemons;
      } catch (e: unknown) {
        set.status = 500;
        return {
          message: 'Unable to retrieve items from the database!',
          status: 500,
        };
      }
  })

  .guard({
    body: t.Object({
        pokemonId: t.Number(),
        name: t.String(),
        type: t.String(),
        level: t.Number()
    })
  }, app => app
  .post('/create',async (handler)=>{
    try {
      const newPokemon = new Pokemon();
      newPokemon.pokemonId = handler.body.pokemonId;
      newPokemon.name = handler.body.name;
      newPokemon.type = handler.body.type;
      newPokemon.level = handler.body.level;

      const savedUser = await newPokemon.save();
      
      handler.set.status = 201;
      return newPokemon;
    } catch (e) {

    }
  })
  )
)



/*    app.group("/pokemons", (app: Elysia) => {
        app
        app.get('/get', async ({ set }: Elysia.Set) => {

            try {
                const pokemons = await Pokemon.find({});
                return pokemons;
              } catch (e: unknown) {
                set.status = 500;
                return {
                  message: 'Unable to retrieve items from the database!',
                  status: 500,
                };
              }
        
        })
   // }) 
}*/
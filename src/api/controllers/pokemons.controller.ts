import { Elysia, t } from "elysia";
import Pokemon, { IPokemon } from '../entities/pokemon.schema';

export const pokemonsController = new Elysia()
  .get('/', async ({ set }) => {
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
    } catch (e:any) {
      // If unique mongoose constraint (for username or email) is violated
      if (e.name === 'MongoServerError' && e.code === 11000) {
        handler.set.status = 422;
        return {
          message: 'Resource already exists!',
          status: 422,
        };
      }

      handler.set.status = 500;
      return {
        message: 'Unable to save entry to the database!',
        status: 500,
      };
    }
  })
  )
  .delete("/delete/:id", async (handler)=>{
      try {
        const { id } = handler.params;
        await Pokemon.findOneAndDelete({ pokemonId : id });
        return {
          message: `Resource deleted successfully!`,
          status: 200,
        };
      } catch (e:any) {
        handler.set.status = 500;
        return {
          message: 'Unable to delete resource!',
          status: 500,
        };
      }
  })
  .patch("/update/:id", async (handler)=> {
    try {
      const { id } = handler.params;
  
      await Pokemon.findOneAndUpdate({ pokemonId : id}, handler.body)
      return {
        message: 'Resources are successfully updated',
        status: 200,
      };
    } catch (e:any) {
      
    }

    
  })
  .put("/change/:id", async (handler)=> {
    try {
      const { id } = handler.params;
      console.log(handler.body);
  
      await Pokemon.findOneAndReplace({ pokemonId : id}, handler.body)
      return {
        message: 'Resources are successfully updated',
        status: 200,
      };
    } catch (e:any) {
      
    } 
  })

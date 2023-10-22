import { Elysia, t } from "elysia";
import Pokemon, { IPokemon } from '../entities/pokemon.schema';
import isAuth from "../../middleware/authMiddleware";
import { set } from "mongoose";

export const pokemonsController = new Elysia()
  .get('/', async ({ set }) => {
    try {
        const pokemons = await Pokemon.find({});
        set.status = 200;
        return pokemons;
      } catch (e: unknown) {
        set.status = 500;
        return {
          message: 'Unable to retrieve items from the database!',
          status: 500,
        };
      }
  }, { beforeHandle : isAuth})
  .get("/:id", async ({set, params})=> {
    try {
      const { id } = params;
      
      const pokemon =  await Pokemon.find({ pokemonId : id}).exec();

      set.status = 200;
      return pokemon[0]
    } catch (error) {
      set.status = 500;
      return error
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
  .post('/create',async ({body,set})=>{
    try {
      const newPokemon = new Pokemon();
      newPokemon.pokemonId = body.pokemonId;
      newPokemon.name = body.name;
      newPokemon.type = body.type;
      newPokemon.level = body.level;

      const savedPokemon = await newPokemon.save();
      
      set.status = 201;
      return savedPokemon;
    } catch (error:any) {
      // If unique mongoose constraint (for username or email) is violated
      if (error.name === 'MongoServerError' && error.code === 11000) {
        set.status = 422;
        return {
          message: 'Resource already exists!',
          status: 422,
        };
      }

      set.status = 500;
      return {
        message: 'Unable to save entry to the database!',
        status: 500,
      };
    }
  })
  )
  .delete("/delete/:id", async ({set,params})=>{
      try {
        const { id } = params;
        await Pokemon.findOneAndDelete({ pokemonId : id });
        set.status = 200;
        return {
          message: `Resource deleted successfully!`,
          status: 200,
        };
      } catch (e:any) {
        set.status = 500;
        return {
          message: 'Unable to delete resource!',
          status: 500,
        };
      }
  })
  .patch("/update/:id", async ({set,params,body})=> {
    try {
      const { id } = params;
  
      await Pokemon.findOneAndUpdate({ pokemonId : id}, body)
      set.status = 200;
      return {
        message: 'Resources are successfully updated',
        status: 200,
      };
    } catch (e:any) {
      set.status = 500;
      return {
        message: 'Unable to update resource!',
        status: 500,
      };
    }

    
  })
  .put("/change/:id", async ({set,params,body})=> {
    try {
      const { id } = params;
      console.log(body);
  
      await Pokemon.findOneAndReplace({ pokemonId : id}, body)
      set.status = 200;
      return {
        message: 'Resources are successfully updated',
        status: 200,
      };
    } catch (e:any) {
      set.status = 500;
      return {
        message: 'Unable to update resource!',
        status: 500,
      };
      
    } 
  })

import { Elysia, t } from "elysia";
// Import plugins
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import { html } from '@elysiajs/html';
// Import database connect
import "./config/database/db";
// Import routes 
import { pokemons } from "./api/routes/pokemons.route"
import { users } from "./api/routes/users.route"

// Init Elysia
const app = new Elysia();

// Swagger config
app.use(
  swagger({
    path: '/api',
    documentation: {
      info : {
        title : 'Bun.js CRUD app with Elysia.js',
        version: '1.0.0'
      }
    }
  })
)
// Plugins
app.use(cors())
app.use(helmet())
// Routes
app.use(html())
app.get("/", ()=> "Welcome in Elysia ! 🦊\nAdd /api in the url")
app.group("/api", app => 
  app.use(pokemons)
  .use(users)
)
// Start server
app.listen( process.env.PORT??8080 ,()=>
  console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
);
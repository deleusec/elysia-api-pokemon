import { Elysia, t } from "elysia";
import { usersController } from "../controllers/users.controller";

export const users = new Elysia().group('/users', app => 
    app.use(usersController)
)
import { createElysia } from "../../utils/createElysia";
import { usersController } from "../controllers/users.controller";

export const users = createElysia().group('/users', app => 
    app.use(usersController)
)
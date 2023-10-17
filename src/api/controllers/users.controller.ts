import { Elysia, t } from "elysia";
import User, { IUser } from '../entities/user.schema';


export const usersController = new Elysia()
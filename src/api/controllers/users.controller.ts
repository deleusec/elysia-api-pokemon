import { Elysia, t } from "elysia";
import User, { IUser } from '../entities/user.schema';
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";

// Users controller
export const usersController = new Elysia()  
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET as string,
        })
    )
    // Get all users
    .get('/', async ({ set, cookie, jwt }) => {
        try {
            const auth = await jwt.verify(cookie.token.value);
            
            if(!auth) {
                return "Unauthorized !";
            }

            const users = await User.find({});
            set.status = 200;
            return users;
        } catch (error) {
            return "error"+error
        }
    })
    // Logout
    .get("/logout", async ({ set, cookie }) => {    
        try {
            cookie.token.remove()
            return "You are logged out !";
        } catch (error) {
            return "error"+error
        }
    })
    // Guard    
    .guard({
        body: t.Object({
            username : t.String(),
            email : t.String(),
            password : t.String()
        })
    }, app => app
    .use(cookie())
    // Login
    .post('/login', async ({set, body, jwt,setCookie}) => {
        try {
            const user = await User.findOne({email: body.email}, body.email)
            const userProfile = await User.findById(user);

            const isMatch = await Bun.password.verify(body.password, userProfile?.password as string);

            if(!isMatch) {
                return "Wrong password !";
            }

            const token = await jwt.sign({id: userProfile?._id});
            set.headers = {
                'X-Authorization': token,
              };
            set.status = 201;
            setCookie('token', token, {httpOnly: true});
            return "You are logged in !";
            
        } catch (error) {
            return "error"+error
        }
    })
    // Register
    .post('/register', async ({set,body, jwt, setCookie}) => {
        try {
            const newUser = new User();
            const { username, email, password } = body;
            newUser.username = username;
            newUser.email = email;
            newUser.password = await Bun.password.hash(password);

            const savedUser = await newUser.save();

            const token = await jwt.sign({id: savedUser._id});
            set.headers = {
                'X-Authorization': token,
              };
            set.status = 201;
            setCookie('token', token, {httpOnly: true});


            return newUser;
        } catch (error) {
            return "error"+error
        }
    })
    )
    
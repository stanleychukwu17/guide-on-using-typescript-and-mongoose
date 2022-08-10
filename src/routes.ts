import {Express, Request, Response, NextFunction} from 'express';
import { registerUserHandler, loginUserHandler } from './controllers/user.controller';

export default function routes (app: Express) {
    app.get('/healthCheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })

    // for registering a new user
    app.post('/api/new-user', registerUserHandler)

    // for user login
    app.post('/api/login', loginUserHandler)
}
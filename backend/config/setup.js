import AdminJS from "adminjs";
import AdminjSExpress from '@adminjs/express';
import session from 'express-session';
import ConnectMongoDBSession from "connect-mongodb-session";
import { Database, Resource } from "@adminjs/mongoose";
import { User } from '../models/user.js';
import { Intro } from '../models/intro.js';
import { About } from '../models/about.js';
import { Projects } from '../models/projects.js';
import { Skills } from '../models/skills.js';
import { CoreSkills } from '../models/coreSkills.js';
import { SocialLink } from '../models/SocialLinks.js';
import { Contact } from '../models/contact.js'

AdminJS.registerAdapter({
    Database,
    Resource
});

const DEFAULT_ADMIN = {
    email: 'venkateshni24@gmail.com',
    password: '987654321'
}

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

export const buildAdminJS = async (app) => {
    const admin = new AdminJS({
        resources: [
            { resource: User },
            { resource: Intro },
            { resource: About },
            { resource: Projects },
            { resource: Skills },
            { resource: SocialLink },
            { resource: Contact },
            { resource: CoreSkills }
        ],
        branding: {
            companyName: "Kreative",
            withMadeWithLove: false,

        },
        rootPath: '/admin'
    })

    const mongoDBStore = ConnectMongoDBSession(session)
    const sessionStore = new mongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions'
    })


    const adminRouter = AdminjSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: process.env.COOCKIE_PASSWORD
        },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: process.env.COOCKIE_PASSWORD,
            cookie: {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production'
            },
            name: 'adminjs',
        }
    )
    app.use(admin.options.rootPath, adminRouter)
}

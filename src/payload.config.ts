import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv"
import { Blood } from "./collections/Blood/Blood";

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    //each collection is essentialy a table (see folder "collection")
    collections: [Users, Blood],
    routes: {
        admin : '/sell'
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta : {
            titleSuffix: "- DigitalHippo",
            favicon: "/favicon.ico",
            ogImage: "thumbnail.jpg", 
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
})
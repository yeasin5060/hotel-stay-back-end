import { app } from "./app.js";
import { dbConnection } from "./db/index.js";
import { clerkMiddleware } from '@clerk/express'

const port = process.env.PORT || 7000

dbConnection()

app.use(clerkMiddleware());

app.listen(port, () => {
    console.log('Server is running on http://localhost:', port);
}).on("error", (err) => {
    console.error("Server failed to start:", err);
});
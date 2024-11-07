import express from "express";
import cors from "cors";
import healtCheckRouter from "./routes/healthcheck.routes.js";
import userRegister from "./routes/user.routes.js";

const app = express();

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials: true
    })
);


//Common Middlewares used in every backend.
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

//Routes

app.use("/api/v1/healthcheck",healtCheckRouter)

//UserRoutes
app.use("/api/v1/users",userRegister)

export default app;

import express from "express";
import cors from "cors";
import healtCheckRouter from "./routes/healthcheck.routes.js";
import userRegister from "./routes/user.routes.js";
import ideas from "./routes/idea.routes.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());

//Routes

app.use("/api/v1/healthcheck",healtCheckRouter)

//UserRoutes
app.use("/api/v1/users",userRegister)

//IdeaRoutes
app.use("/api/v1/idea",ideas);
app.use("/api/v1/idea",ideas);

export default app;

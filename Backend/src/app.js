import express from "express";
import cors from "cors";

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

export default app;
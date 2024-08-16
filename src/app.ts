import express, { Application, Request, Response } from "express";
import cookieParser from 'cookie-parser'
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app:Application = express();

// meddelware use
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['https://permachi-client.vercel.app'], credentials: true }));


app.use('/api/v1', router);


app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

// //Not Found
app.use(notFound);

export default app;


"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com.",
        port: 587,
        secure: config_1.default.NODE_ENV === "production",
        auth: {
            user: "mdsahidulislam.sagor9@gmail.com",
            pass: "cfeg qiit ypjw larl",
        },
    });
    yield transporter.sendMail({
        from: "mdsahidulislam.sagor9@gmail.com",
        to,
        subject: "confirm your email",
        text: "",
        html: `
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>confirm mail  Notification</title>
          <!-- Include any additional styling or frameworks here -->
          <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: whitesmoke;
        }
        
    </style>
      </head>
      <body>
      <div style="font-family: 'Arial', sans-serif; padding: 20px; font-size: 24px">
       <p> your code  </p>
       <h2 > ${html} </h2>
      </div>
      </body>
      </html>

        `,
    });
});
exports.sendEmail = sendEmail;

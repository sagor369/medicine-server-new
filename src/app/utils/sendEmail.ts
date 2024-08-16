import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: "mdsahidulislam.sagor9@gmail.com",
      pass: "cfeg qiit ypjw larl",
    },
  });

  await transporter.sendMail({
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
};

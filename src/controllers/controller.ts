import { Request, Response } from "express";
import { Password } from "../models/passwordModel";
import generator from "generate-password";
import nodemailer from "nodemailer";

interface Options {
  numbers?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  symbols?: boolean;
  length: number;
  //   email: string;
}
export default {
  generatePassword: async (req: Request, res: Response) => {
    const { numbers, uppercase, lowercase, symbols, length } = req.body;
    // if (!length || !email) {
    //   return res.send("Length and Email are required");
    // }
    const requiredLength = Number(length);
    const options: Options = { length: requiredLength };
    if (numbers) {
      options.numbers = true;
    }
    if (uppercase) {
      options.uppercase = true;
    }
    if (lowercase) {
      options.lowercase = true;
    }
    if (symbols) {
      options.symbols = true;
    }
    const create = () => {
      return generator.generate(options);
    };
    let password = create();
    let status = password.length > requiredLength ? false : true;
    while (status) {
      password = create();
      status = password.length >= requiredLength ? false : true;
    }
    try {
      //   const generatedPassword = Password.build({ email, password });
      //   await generatedPassword.save();
      res.status(201).send(password);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getMyPasswords: async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const passwords = await Password.find({ email });
      res.status(200).send(passwords);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  sendMail: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service: "Gmail",
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_EMAIL_PASSWORD,
        },
      });
      transporter.sendMail({
        to: email,
        from: process.env.USER_EMAIL,
        subject: "Generated pssword",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Password Generator</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for Selecting our service.
           </p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color:
           #fff;border-radius: 4px;">${password}</h2>
        </div>
      </div>`,
      });
      console.log(1525);

      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
    }
  },
};

import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";


@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    async sendVerificationEmail(email: string, token: string) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: "<h1>Here goes the body of the email</h1>"
        };

        return await this.transporter.sendMail(mailOptions);
    }

}
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";


export class MailtrapMailProvider implements IMailProvider{
    private transporter: Mail;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "smpt.mailtrap.io",
            port: 2525,
            auth: {
                user: 'b46da52+0e73cc',
                pass: '84b46267394ac9'
            }
        })
    }

    async sendMail(message: IMessage): Promise<void>{
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from :{
                name : message.from.name,
                address : message.from.email
            },
            subject: message.subjecy,
            html: message.body,
        })
    }
}
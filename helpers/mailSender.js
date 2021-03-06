import { createTransport } from "nodemailer";

export default async function notifyByEmail(receiver, message) {
    let transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "", //TODO: set email
            pass: "", //TODO: set password
        },
    });

    let info = await transporter.sendMail({
        from: "",
        to: receiver,
        subject: "Available stock!",
        text: message,
    });

    return info.messageId;
}
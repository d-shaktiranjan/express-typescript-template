import { createTransport } from "nodemailer";

import { EMAIL_ID, EMAIL_PASSWORD } from "../config/constants";
import { FileAttachment } from "../libs/CustomInterface.lib";

const sendEmail = async (
    to: string,
    subject: string,
    html: string,
    files?: [FileAttachment],
) => {
    try {
        // create a nodemailer transporter
        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_ID,
                pass: EMAIL_PASSWORD,
            },
        });

        // define email options
        const mailOptions = {
            from: EMAIL_ID,
            to,
            subject,
            html,
            attachments: files,
        };

        // send the email
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};
export default sendEmail;

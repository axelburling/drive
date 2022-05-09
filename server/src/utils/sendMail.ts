import { createTransport, SendMailOptions, SentMessageInfo } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

console.log(process.env.EMAIL_USER_NAME);
const transporter = createTransport({
  service: "gmail",
  auth: {
    // disable the thing on google
    user: process.env.EMAIL_USER_NAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

function sendMail(
  options: SendMailOptions
): Promise<SMTPTransport.SentMessageInfo> {
  return new Promise<SentMessageInfo>(
    (
      resolve: (info: SMTPTransport.SentMessageInfo) => SentMessageInfo,
      reject: (err: Error | null) => void
    ) => {
      transporter.sendMail(
        {
          from: `${
            process.env.EMAIL_USER_NAME
              ? process.env.EMAIL_USER_NAME.split("@")[0].split(".").join("")
              : "adrive"
          }  ${process.env.EMAIL_USER_NAME}`,
          ...options
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        }
      );
    }
  );
}

export default sendMail;

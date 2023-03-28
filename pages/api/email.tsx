import { Email } from "@/templates";
import { render } from "@react-email/render";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { object, string } from "yup";

let emailConfig: SMTPTransport.Options = {
  host: process.env.EMAIL_HOST || "",
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.EMAIL_SECURE),
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
};

const bodySchema = object({
  email: string().email().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = await bodySchema.validate(JSON.parse(req.body));

    console.log("sending...");
    if (!body) {
      return;
    }

    await fetch(process.env.SAVE_URL || "", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then(console.log);

    if (process.env.NODE_ENV !== "production") {
      const mailAcc = await nodemailer.createTestAccount();

      emailConfig = {
        host: mailAcc.smtp.host,
        port: mailAcc.smtp.port,
        secure: mailAcc.smtp.secure,
        auth: {
          user: mailAcc.user,
          pass: mailAcc.pass,
        },
      };
    }

    const transporter = nodemailer.createTransport(emailConfig);

    const emailHtml = render(<Email responses={Object.entries(body)} />);

    const options = {
      to: body.email,
      from: "arpitbhalla@icloud.com",
      subject: "Typiee form responses",
      html: emailHtml,
    };

    const temp = await transporter.sendMail(options);

    console.log(temp);
    if (process.env.NODE_ENV === "development") {
      console.log(nodemailer.getTestMessageUrl(temp));
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: true,
    });
  }
}

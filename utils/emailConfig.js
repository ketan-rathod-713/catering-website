import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ketanrathod17547@gmail.com',
    pass: 'Ketan17547@',
  },
});

export default transporter;
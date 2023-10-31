// emailService.js

import transporter from "./emailConfig.js"

const sendEmail = (to, subject, text, html) => {
 const mailOptions = {
   from: 'ketanrt2@gmail.com', // Replace with your email address
   to,
   subject,
   text,
   html,
 };

 return new Promise((resolve, reject) => {
   transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
       reject(error);
     } else {
       resolve(info.response);
     }
   });
 });
};

export {sendEmail}
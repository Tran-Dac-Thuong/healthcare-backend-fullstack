import db from "../models/index";
const nodemailer = require("nodemailer");
require("dotenv").config();

let SendEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Thuong Coder 👻" <hoangdeptraibodoiqua4321@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let resault = "";
  if (dataSend.language === "vi") {
    resault = `<h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn đã đặt lịch khám bệnh online thành công</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận hoàn tất thủ tục đặt lịch khám bệnh</p>
    <div><a href=${dataSend.redirect} target="_blank">Nhấn vào đây</a></div>
    <div>Xin cảm ơn</div>`;
  }
  if (dataSend.language === "en") {
    resault = `<h3>Dear ${dataSend.patientName}!</h3>
    <p>You have successfully booked an online medical appointment</p>
    <p>Information to schedule an appointment:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the above information is true, please click on the link below to confirm completion of the medical appointment booking procedure.</p>
    <div><a href=${dataSend.redirect} target="_blank">Click here</a></div>
    <div>Thank you so much</div>`;
  }
  return resault;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let resault = "";
  if (dataSend.language === "vi") {
    resault = `<h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn đã đặt lịch khám bệnh online thành công</p>
    <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>
    <div>Xin cảm ơn</div>`;
  }
  if (dataSend.language === "en") {
    resault = `<h3>Dear ${dataSend.patientName}!</h3>
    <p>You have successfully booked an online medical appointment</p>
    <p>Prescription/invoice information is sent in the attached file.</p>
    <div>Thank you so much</div>`;
  }
  return resault;
};

let sendAttachment = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Thuong Coder 👻" <hoangdeptraibodoiqua4321@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend), // html body
    attachments: [
      {
        // encoded string as an attachment
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};

module.exports = {
  SendEmail: SendEmail,
  sendAttachment: sendAttachment,
};

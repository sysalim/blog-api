import nodemailer from "nodemailer";
export const sendEmail = (email, verificationCode) => {
  // menyiapkan configurasi pengiriman email
  const auth = {
    user: "mohsalim951@gmail.com",
    pass: "jrib omvs emxx qern",
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth,
  });

  const mailOptions = {
    from: auth.user,
    to: email,
    subject: "Metablog validation",
    text: `Your Code is ${verificationCode}`,
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

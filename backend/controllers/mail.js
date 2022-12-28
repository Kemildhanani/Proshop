var nodemailer = require('nodemailer');
const CouponHistory = require("../models/CouponHistory");
const Coupon = require("../models/coupon");
const Return = require("../models/Return")

const User = require("../models/user");
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey("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");

exports.SendMAil = (req, res) => {
  // console.log("userfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",req.body )
  // var transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     // port:,
  //     auth: {
  //       user: 'proshop1211@gmail.com',
  //       pass: '9727388397'
  //     }
  //   });

  //   var mailOptions = {
  //     from: 'proshop1211@gmail.com',
  //     to: `${req.params.email}`,
  //     subject: 'Sending Email from Proshop',
  //     text: `your pin is ${req.body.data}`
  //   };

  //   transporter.sendMail(mailOptions, function(error, info){
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });

  function getMessage() {
    const body = 'This is a test email using SendGrid from Node.js';
    return {
      to: req.params.email,
      from: 'proshop1211@gmail.com',
      subject: 'Proshop',
      text: body,
      html: `<strong>Pin: ${req.body.data}</strong>`,
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  (async () => {
    console.log('Sending test email');
    await sendEmail();
  })();
}

exports.SendMAilCoupon = async (req, res) => {
  // console.log("userfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",req.body )
  // var transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'proshop1211@gmail.com',
  //       pass: '9727388397kemil'
  //     }
  //   });

  //   var mailOptions = {
  //     from: 'proshop1211@gmail.com',
  //     to: `${req.params.email}`,
  //     subject: 'Sending Email from Proshop',
  //     text: `your Coupon Name is ${req.body.data}`
  //   };

  //   transporter.sendMail(mailOptions, function(error, info){
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
  // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", req.params.email)
  // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", req.body.data)

  try {

    const finduserByEmail = await User.findOne({ email: req.params.email });


    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",finduserByEmail)
    const couponhi = await new CouponHistory({
      coupon_name: req.body.data[0].name,
      coupon_id: req.body.data[0]._id,
      discount: req.body.data[0].discount,
      seller: req.body.data[0].seller,
      user: finduserByEmail._id,
      buyer_email: req.params.email
    }).save();
    res.json(couponhi);
  } catch (err) {
    console.log("err", err);
  }

  function getMessage() {
    const body = 'This is a test email using SendGrid from Node.js';
    return {
      to: req.params.email,
      from: 'proshop1211@gmail.com',
      subject: 'Proshop',
      text: body,
      html: `<strong>coupon: ${req.body.data[0].name}
             </strong><br><h1>Buy Now And get ${req.body.data[0].discount} % </h1>
             <br>
             <h3 color:"red">Expire on${req.body.data[0].expiry}</h3>`
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  (async () => {
    console.log('Sending test email');
    await sendEmail();
  })();
}

exports.SendApproveRequestReturn = async (req, res) => {
  
console.log(req.body.data)

const ret = await Return.findById({_id:req.body.data}).exec()

  console.log("wwwwwwwwwwwww",ret)
  function getMessage() {
    const body = 'This is a test email using SendGrid from Node.js';
    return {
      to: req.params.email,
      from: 'proshop1211@gmail.com',
      subject: 'Proshop',
      text: body,
      html: `<strong>Return Id is: ${ret._id}</strong><br>
              <p>Product Name is ${ret.product}</p>
              <strong>is approved by Seller</strong><br>
              <p>Order Id is ${ret.order_id}</p>        
      `,
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  (async () => {
    console.log('Sending test email');
    await sendEmail();
  })();
}


exports.SendRejectedRequestReturn = async(req, res) => {
  
  console.log(req.body.data)

const ret = await Return.findById({_id:req.body.data}).exec()

  // console.log("wwwwwwwwwwwww",ret)

  function getMessage() {
    const body = 'This is a test email using SendGrid from Node.js';
    return {
      to: req.params.email,
      from: 'proshop1211@gmail.com',
      subject: 'Proshop',
      text: body,
      html: `<strong>Return Id is: ${ret._id}</strong><br>
      <p>Product Name is ${ret.product}</p>
      <strong>is Rejected by Seller</strong><br>
      <p>Order Id is ${ret.order_id}</p>        `,
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  (async () => {
    console.log('Sending test email');
    await sendEmail();
  })();
}


exports.SendCouriarpaymentEmail = async(req, res) => {
  
  console.log(req.body.data)

// const ret = await Return.findById({_id:req.body.data}).exec()

  // console.log("wwwwwwwwwwwww",ret)

  function getMessage() {
    const body = 'This is a test email using SendGrid from Node.js';
    return {
      to: req.params.email,
      from: 'proshop1211@gmail.com',
      subject: 'Proshop',
      text: body,
      html: `<strong>Return Id is: ${req.body.data.rid}</strong><br>
      <h6>ReturnPayment  is ${req.body.data.amt} </h6> <br/>
      <p>Order Id is ${req.body.data.orderDetails}</p>
      <br>
      <strong>Your Money Will be transfered in 7 Days</strong>
      <p>Seller Id is ${req.body.data.seller}</p>        `,
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  (async () => {
    console.log('Sending test email');
    await sendEmail();
  })();
}

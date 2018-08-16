// var TMClient = require('textmagic-rest-client');
//
// var c = new TMClient('username', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');
// c.Messages.send({text: 'test message', phones:'9540090300'}, function(err, res){
//     console.log('Messages.send()', err, res);
// });
// var smsGateway = require('sms-gateway-nodejs')('ntrinquier@provider.com', 'p4ssw0rd');
//
// smsGateway.message.sendMessageToNumber('2012', '+919540090300', 'Hello world :)')
// .then((response) => {
//
//   console.log("mssg sent");
// })
// .catch((error) => {
//
//   console.log(error);
// })

// var msg91=require("msg91")("")
//
// var http = require("http");
//
// var options = {
//   "method": "GET",
//   "hostname": "api.msg91.com",
//   "port": null,
//   "path": "/api/sendhttp.php?sender=Ananya&route=4&mobiles=9540090300&authkey=221824AIDxn9NQ3nlZ5b2c9e7f&encrypt=&country=0&message=Hello!%20This%20is%20a%20test%20message&flash=&unicode=&schtime=&afterminutes=&response=&campaign=",
//   "headers": {}
// };
//
// var req = http.request(options, function (res) {
//   var chunks = [];
//
//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });
//
//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });
//
// req.end();
// //
// var msg91 = require("msg91")("Ananya", "221824AIDxn9NQ3nlZ5b2c9e7f", "4" );
//
//
// // Mobile No can be a single number, list or csv string
//
// var mobileNo = "+91-9540090300";
// //
// // var mobileNo = [ "XXXXXXXXXX", "XXXXXXXXXX", "XXXXXXXXXX" ];
// //
// // var mobileNo =  "XXXXXXXXXX,XXXXXXXXXX,XXXXXXXXXX";
// //
// msg91.send(mobileNo, "helllo", function(err, response){
//     console.log(err);
//     console.log(response);
// });
var http = require("http");
//
// var options = {
//   "method": "POST",
//   "hostname": "api.msg91.com",
//   "port": null,
//   "path": "/api/v2/sendsms",
//   "headers": {
//     "authkey": "221824AIDxn9NQ3nlZ5b2c9e7f",
//     "content-type": "application/json"
//   }
// };
//
// var req = http.request(options, function (res) {
//   var chunks = [];
//
//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });
//
//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });
//
// var mobileNo=['9540090300'];
//
// req.write(JSON.stringify({ sender: 'SOCKET',
//   route: '4',
//   country: '91',
//   sms:
//    [ { message: 'Thanks for choosing us', to:mobileNo }/*,
//      { message: 'Message2', to: [ '98260XXXXX', '98261XXXXX' ] }*/ ] }));
// req.end();

var clientEmail="ananyadhingra6@gmail.com";
var OTP=parseInt(Math.random()*100000);
var clientMobile='9540090300';
var emailOTPPath="/api/sendmailotp.php?otp=&template=&&message=Your%OTP%is&sender=Ananya&expiry=30&authkey=221824AIDxn9NQ3nlZ5b2c9e7f&email=&mobile=";
emailOTPPath=emailOTPPath.slice(0,25)+OTP+emailOTPPath.slice(25,122)+clientEmail+emailOTPPath.slice(122)+clientMobile;

console.log(emailOTPPath);
//
// var emailOTPOptions = {
//   "method": "POST",
//   "hostname": "control.msg91.com",
//   "port": null,
//   "path": emailOTPPath,
//   "headers": {}
// };
//
// var req = http.request(emailOTPOptions, function (res) {
//   var chunks = [];
//
//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });
//
//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });
//
// req.end();

// var smsOTPPath=
//
var options = {
  "method": "POST",
  "hostname": "control.msg91.com",
  "port": null,
  "path": "/api/sendotp.php?template=&otp_length=&authkey=221824AIDxn9NQ3nlZ5b2c9e7f&message=&sender='Ananya'&mobile=9540090300&otp=9089&otp_expiry=20&email=",
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();

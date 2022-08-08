const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const serverRoutes = require('./routes')

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(serverRoutes)

// const getCurrentTimestamp = () => {
//   return "" + Math.round(new Date().getTime() / 1000);
// };

// app.get("/transaction",authorize, (req, res) => {
//   axios({
//     // Below is the API URL endpoint
//     url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization:
//         "Basic " +
//         Buffer.from(`${process.env.SERVER_KEY}`).toString(
//           "base64"
//         ),
//       // Above is API server key for the Midtrans account, encoded to base64
//     },
//     data:
//       // Below is the HTTP request body in JSON
//       {
//         transaction_details: {
//           order_id: "order-csb-" + getCurrentTimestamp(),
//           gross_amount: 100000,
//         },
//         credit_card: {
//           secure: true,
//         },
//         customer_details: {
//           first_name: "Ahmad",
//           last_name: "niz",
//           email: "ahmad@pondok.com",
//           phone: "08111222333",
//         },
//       },
//   }).then(
//     (snapResponse) => {
//       let snapToken = snapResponse.data.token;
//       console.log("Retrieved snap token:", snapToken);
//       return res.status(200).json({
//         status: "ok",
//         token: snapToken,
//       });
//     },
//     (error) => {
//       res.send(`Fail to call API w/ error ${error}`);
//       console.log(error);
//     }
//   );
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

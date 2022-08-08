const axios = require("axios");
const { asyncWrapper, getCurrentTimestamp } = require("./common/utils");

const mainController = asyncWrapper((req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Ping...",
  });
});

const paymentController = asyncWrapper(async (req, res) => {
  try {
    const requestPaymentToken = await axios({
      // Below is the API URL endpoint
      url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${process.env.SERVER_KEY}`).toString("base64"),
        // Above is API server key for the Midtrans account, encoded to base64
      },
      data:
        // Below is the HTTP request body in JSON
        {
          transaction_details: {
            order_id: "order-csb-" + getCurrentTimestamp(),
            gross_amount: 100000,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: "Ahmad",
            last_name: "niz",
            email: "ahmad@pondok.com",
            phone: "08111222333",
          },
        },
    });

    if (requestPaymentToken) {
      return res.status(200).json({
        status: "ok",
        token: requestPaymentToken.data.token,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error,
    });
    console.log(error);
  }
});

module.exports = {
  mainController,
  paymentController,
};

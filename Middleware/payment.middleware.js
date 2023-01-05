const express = require("express");
require("dotenv").config({ path: require("find-config")(".env") });
const stripe = require("stripe")(process.env.STRIPE_KEY);
console.log(process.env.STRIPE_KEY);

const PaymentGateway = async (description, Address, name, Amount) => {
  await stripe.paymentIntents.create({
    description: description,
    shipping: {
      name: name,
      address: {
        line1: Address,
        postal_code: Address,
        city: Address,
        state: Address,
        country: Address,
      },
    },
    amount: 1,
    currency: "usd", // stripe current version does not provide the rupees support for the indian that is why I am using the dollar as the currency for the payment.
    payment_method_types: ["card"],
  });
};
module.exports = PaymentGateway;

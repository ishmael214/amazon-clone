const functions = require('firebase-functions');

const express = require("express");

const cors = require("cors");

const stripe = require("stripe")('sk_test_51HzNkfEug3o4FtRPRoJvnruJZSltOmQ48H5YWBqFVPNK2Ec5WRNVv2AI6RjuCMibmf2ruqL11bbAbHNxC9BM00Qi00HhtbIcOJ');

// API SETUP 

// -App config
const app = express();

// -Middlewares 
app.use(cors({ origin: true }));
app.use(express.json());

// -API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Recieved BOOM! for this amount >>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    });
    // ok created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// -listen command
exports.api = functions.https.onRequest(app)
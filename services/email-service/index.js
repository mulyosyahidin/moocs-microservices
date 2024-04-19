import express from "express";
import {consumeMessageBroker} from "./consume-message-broker.js";

const app = express();

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Email Service!',
    });

    res.send();
});

app.listen(3002, async () => {
    await consumeMessageBroker();

    console.log('Application started at port 3002');
});

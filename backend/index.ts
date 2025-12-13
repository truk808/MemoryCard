import { Request, Response } from "express";
require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);


app.use(errorHandler)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message:'Hello World'});
})

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

start()
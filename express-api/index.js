const express = require('express');
const { getCustomers } = require('./services/shopify-service');
const customerRoutes = require('./modules/customers/router');
require('dotenv').config()
const port = process.env.PORT || 3000

const app = express();
app.use(express.json());

app.use('/customers', customerRoutes);

app.get('/',(req,res)=>{
    res.json({message:`Hello from new app==>${process.env.GQL_Access_Token}`});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
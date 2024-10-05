const express = require('express')
const shopifyService = require('../../services/shopify-service')
const router = express.Router()

// We can add middlewares for auth and response handler with the function.
router.get('/',getCustomers)

router.post('/',createCustomers)

router.put('/',updateCustomers)

async function getCustomers(req,res){
    try{
        const result = await shopifyService.getCustomers()
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json({ message: 'Failed to fetch customers' });  
    }
}

async function createCustomers(req,res){
    try{
        const result = await shopifyService.createCustomers(req.body)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json({ message: 'Failed to create customer' });  
    }
}

async function updateCustomers(req,res){
    try{
        const result = await shopifyService.updateCustomers(req.body)
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json({ message: 'Failed to update customer' });  
    }
}

module.exports = router

const express = require('express')
const shopifyService = require('../../services/shopify-service')
const router = express.Router()


router.get('/',getCustomers)

router.post('/',createCustomers)

router.put('/',updateCustomers)

async function getCustomers(req,res){
    try{
        const result = await shopifyService.getCustomers()
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch customers' });  
    }
}

async function createCustomers(req,res){
    try{
        const result = await shopifyService.createCustomers()
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch customers' });  
    }
}

async function updateCustomers(req,res){
    try{
        const result = await shopifyService.updateCustomers
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch customers' });  
    }
}

module.exports = router

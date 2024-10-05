const fetch = require('node-fetch')
require('dotenv').config()

const shopifyGQLUrl = `https://${process.env.SHOPIFY_DOMAIN}/admin/api/2023-04/graphql.json`;
const shopifyGQLHeaders = {
  "Content-Type": "application/json",
  "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
};

// get customers
const getCustomersQuery = `
  query {
    customers(first: 10) {
      edges {
        node {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

// create customer
const createCustomerMutation = (firstName, lastName, email) => `
  mutation {
    customerCreate(input: {
      firstName: "${firstName}",
      lastName: "${lastName}",
      email: "${email}",
      tags: ["42"]
    }) {
      customer {
        id
        firstName
        lastName
        email
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// update customer
const updateCustomerMutation = (id, firstName, lastName, email) => `
  mutation {
    customerUpdate(id: "${id}", input: {
      firstName: "${firstName}",
      lastName: "${lastName}",
      email: "${email}",
      tags: ["42"]
    }) {
      customer {
        id
        firstName
        lastName
        email
      }
      userErrors {
        field
        message
      }
    }
  }
`;

async function getCustomers(){
    try{
        const response = await fetch(shopifyGQLUrl, {
          method: 'POST',
          headers: shopifyGQLHeaders,
          body: JSON.stringify({ query: getCustomersQuery }),
        });
        //We can even return this promise instead of awaiting since the calling function has await
        const data = await response.json();
        return data
    }catch(error){
        console.log('Error:',error)
        throw error
    }
}

async function createCustomers(){
    try{
        const response = await fetch(shopifyGQLUrl, {
          method: 'POST',
          headers: shopifyGQLHeaders,
          body: JSON.stringify({ query: createCustomerMutation(firstName, lastName, email) }),
        });
        //We can even return this promise instead of awaiting since the calling function has await
        const data = await response.json();
        return data
    }catch(error){
        console.log('Error:',error)
        throw error
    }
}

async function updateCustomers(){
    try{
        const response = await fetch(shopifyGQLUrl, {
          method: 'POST',
          headers: shopifyGQLHeaders,
          body: JSON.stringify({ query: updateCustomerMutation(id, firstName, lastName, email) }),
        });
        //We can even return this promise instead of awaiting since the calling function has await
        const data = await response.json(); 
        return data
    }catch(error){
        console.log('Error:',error)
        throw error
    }
}

module.exports = {
    getCustomers,
    createCustomers,
    updateCustomers
}

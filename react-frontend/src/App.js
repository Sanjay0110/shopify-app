import React, { useEffect, useState } from "react";
import {
  Page,
  FormLayout,
  Card,
  TextField,
  Button,
  Banner,
  DataTable,
  Spinner,
} from "@shopify/polaris";
import axios from 'axios';
import "./App.css";

const App = () => {
  let baseUrl = process.env.REACT_APP_API_URL
  const [id, setId] = useState("")
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetchCustomers();
  },[])

  const fetchCustomers = async ()=>{
    try{
      setLoading(true)
      let apiUrl = `${baseUrl}/customers`
      const response = await axios.get(apiUrl)
      setUsers(response.data)
    }catch(error){
      console.log('got error while fetching==>',error)
      setError("Error occurred while fetching customers!")
    }finally{
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try{
      const errorMessage = validateForm();
      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      setLoading(true)

      setError("");

      if(id){
        const newCustomer = { id, firstName, lastName, email };
        let apiUrl = `${baseUrl}/customers/`

        await axios.put(apiUrl, newCustomer, {
          headers: {
            'Content-Type': "application/json"
          }
        });
      }else{
        const newCustomer = { firstName, lastName, email };
        let apiUrl = `${baseUrl}/customers`

        await axios.post(apiUrl, newCustomer, {
          headers: {
            'Content-Type': "application/json"
          }
        });
      }

      resetFormState()
      fetchCustomers()
    }catch(error){
      console.log('got error=>',error)
      setError(error.response.data.message)
    }finally{
      setLoading(false)
    }
  };

  // Form Validations
  const validateForm = () => {
    if (!firstName || !lastName) {
      return "First name and Last name are required.";
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      return "Please provide a valid email address.";
    }
    return "";
  };

  // Editing user
  const handleEdit = (index) => {
      const user = users[index];
      setFirstname(user.firstName);
      setLastname(user.lastName);
      setEmail(user.email);
      setId(user.id);
  };

  const resetFormState = ()=>{
    setFirstname('')
    setLastname('')
    setEmail('')
    setId('')
  }

  return (
    <Page title="Customer Management">
      <Card sectioned>
        {error && (
          <Banner status="critical" onDismiss={() => setError('')}>
            <p>{error}</p>
          </Banner>
        )}
        <FormLayout>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(value) => setFirstname(value)}
            autoComplete="given-name" // Accessibility improvement
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(value) => setLastname(value)}
            autoComplete="family-name" // Accessibility improvement
          />
          <TextField
            label="Email"
            value={email}
            type="email"
            onChange={(value) => setEmail(value)}
            autoComplete="email" // Accessibility improvement
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleSubmit} primary>
              {id !== '' ? "Update" : "Add"}
            </Button>
            {loading && (
              <div className="full-page-loader">
                <Spinner accessibilityLabel="Loading data" size="large" />
              </div>
            )}
          </div>
        </FormLayout>
      </Card>

      {/* Display user data */}
      {users.length > 0 && (
        <Card title="Customer List" sectioned>
          <DataTable
            columnContentTypes={["text", "text", "text", "text"]}
            headings={["First Name", "Last Name", "Email", "Actions"]}
            rows={users.map((user, index) => [
              user.firstName,
              user.lastName,
              user.email,
              <Button key={index} onClick={() => handleEdit(index)} plain>
                Edit
              </Button>,
            ])}
          />
        </Card>
      )}
    </Page>
  );
};

export default App;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// This simulates a database
let addressBook = [];

// GET: View the Address Book
app.get('/api/contacts', (req, res) => {
  res.json(addressBook);
});

// POST: Save data ONLY if consent is given (EUDI logic)
app.post('/api/contacts', (req, res) => {
  const { name, address, phone, consent } = req.body;

  if (!consent) {
    return res.status(400).json({ error: "Consent is required to share data." });
  }

  const newContact = { id: Date.now(), name, address, phone, verified: true };
  addressBook.push(newContact);
  res.status(201).json(newContact);
});

app.listen(5000, () => console.log("Server running on port 5000"));
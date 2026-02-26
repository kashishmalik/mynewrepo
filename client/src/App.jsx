import { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', address: '', phone: '', consent: false });

  const loadContacts = () => {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data));
  };

  useEffect(() => { loadContacts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      loadContacts();
      alert("Shared via EUDI Wallet!");
    } else {
      alert("You must give consent first!");
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>EUDI Address Book</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} />
        <input placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} />
        <label>
          <input type="checkbox" onChange={e => setFormData({...formData, consent: e.target.checked})} />
          I consent to share my data
        </label>
        <button type="submit">Share Data</button>
      </form>

      <hr />
      <h3>Verified Contacts</h3>
      {contacts.map(c => <p key={c.id}>✅ {c.name} - {c.phone}</p>)}
    </div>
  );
}
export default App;
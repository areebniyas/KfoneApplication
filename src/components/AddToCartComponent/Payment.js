import { useState } from 'react';

function Payment() {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/api/payments', {
      method: 'POST',
      body: JSON.stringify({ address, paymentMethod, email, phone }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      window.location.href = '/success';
    } else {
      // display error message
    }
  }
  
  return (
    <div className='payment-page'>
      <h1>Payment Information</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input type="text" name="address" value={address} onChange={(event) => setAddress(event.target.value)} />
        </label>
        <br></br>
        <label>
          Email:
          <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br></br>
        <label>
          Phone Number:
          <input type="text" name="phonr" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <br></br>
        <label>
          Payment Method:
          <select name="paymentMethod" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash On Delivery</option>
          </select>
        </label>
        <br></br>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}

export default Payment;

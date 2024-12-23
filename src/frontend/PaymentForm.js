import React, {useState} from 'react';

function PaymentForm(){
    const [amount, setAmount]= useState('');
    const [paymentStatus, setPaymentStatus]=useState('');

    
    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, paymentMethodId: 'pm_card_visa' })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            if (data.success) {
                setPaymentStatus('Payment successful');
            } else {
                setPaymentStatus(`Payment failed: ${data.error}`);
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
            setPaymentStatus(`Error: ${error.message}`);
        }
    };

    return(
        <div>
            <h2>Enter Payment Details</h2>
            <input
                type="number"
                placeholder='Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
             <button onClick={handlePayment}>Pay</button>
             <p>{paymentStatus}</p>
        </div>
    );
}

export default PaymentForm;
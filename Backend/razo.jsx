
import React, { useEffect, useState } from 'react';
import Razorpay from 'razorpay';

const PaymentComponent = () => {
  const [razorpayObject, setRazorpayObject] = useState(null);

  useEffect(() => {
    fetch(`${baseURL}createOrder`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      payment(data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const payment = (data) => {
    let x = JSON.parse(localStorage.getItem("total"));
    console.log(x);
    const options = {
      "key": "7rzp_test_EIyEImx4Rfjccj",
      "amount": x*100,
      "currency": "INR",
      "name": "shotSpotter",
      "order_id": data.orderId,
      "handler": function (response){
          console.log(response);
          alert("This step of Payment Succeeded");
          window.location.href = "./success.html";
          
      },
      "prefill": {
          "contact":"",
          "name": "",
          "email": "" 
      },
      "theme": {
          "color": "#2300a3"
      }
    };

    const razorpay = new Razorpay(options);
    console.log(razorpay);
    setRazorpayObject(razorpay);

    razorpay.on('payment.failed', function (response){
        console.log(response);
        alert("This step of Payment Failed");
    });
  }

  const handlePayment = (e) => {
    e.preventDefault();
    razorpayObject.open();
  }

  return (
    <button id='pay-button' onClick={handlePayment}>Pay</button>
  );
}

export default PaymentComponent;

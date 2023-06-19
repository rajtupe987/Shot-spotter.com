/*************************************Razorpay********************************************************* */

// razorpay routes please dont touch these routes

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET

});


//app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/success.html'))
})

app.post('/createOrder', (req, res)=>{
    const {amount, currency, receipt, notes} = req.body;
    razorpayInstance.orders.create({amount, currency, receipt, notes},
        (err, order)=>{
            if(!err) {
                console.log(order.id)
                res.json(order)
            } else {
                res.send(err);
            }
        }
    )
});

app.post('/verifyOrder', (req, res)=>{
    const {order_id, payment_id} = req.body;
    const razorpay_signature = req.headers['x-razorpay-signature'];
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    let hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(order_id + "|" + payment_id);
    const generated_signature = hmac.digest('hex');
    if(razorpay_signature === generated_signature) {
        res.json({success:true, message:"Payment has been verified"})
    } else {
        res.json({success:false, message:"Payment verification failed"})
    }
});



// razorpay frontend
/*****************Razorpay*****************************/

    
// fetch(`${baseURL}createOrder`, {
//     method: 'POST',
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//       payment(data)
//   })
//   .catch(error => {
//     console.log(error);
//   });
  

//   function payment(data){
//       let x = JSON.parse(localStorage.getItem("total"))
//       console.log(x)
//       const options = {
//       "key": "77SrE1GqjzRMAc8Gqf9YjUB3",
//       "amount": x*100,
//       "currency": "INR",
//       "name": "shotSpotter",
//       "order_id": data.orderId,
//       "handler": function (response){
//           console.log(response)
//           alert("This step of Payment Succeeded");
//           window.location.href = "./success.html";

//       },
//       "prefill": {
//           //Here we are prefilling random contact
//           "contact":"9075537652",
//           //name and email id, so while checkout
//           "name": "Darshan Bhandwalkar",
//           "email": "bhandwalkardarshan@gmail.com" 
//       },
//       "theme": {
//           "color": "#2300a3"
//       }
//     };
  
//       var razorpayObject = new Razorpay(options);
//       console.log(razorpayObject);
  
//       razorpayObject.on('payment.failed', function (response){
//           console.log(response);
//           alert("This step of Payment Failed");
//       });
  
//       document.getElementById('pay-button').onclick = function(e){
     
//       e.preventDefault();
      
//       razorpayObject.open();
//       }
     
//   }
      
  


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

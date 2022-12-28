import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripeCheckout from '../Components/StripeCheckout'
import '../stripe.css'

const promise = loadStripe('pk_test_51KhULzSCJmRhwQzkr45BsVt9HgVhAoDEjbPTaF9Edci6zoYJJwJjDaFigDjxyU0Sc2eevVdr84TwLVjJFV19h7Bt00UdDMTbWL')

console.log(promise);

const Payment = () => {
  return (
    <div className='container p-5 text-center' style={{marginBottom: "300px"}}>
        <h4>Complete Your Purchase</h4>
        <Elements  stripe={promise} >
            <div className="col-md-8 offset-md-2">
                <StripeCheckout/> 
            </div>
        </Elements>
    </div>
  )
}

export default Payment
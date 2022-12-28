import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckOut from './StripeCheckOut'
import './stripe.css'

const key = 'pk_test_51KhULzSCJmRhwQzkr45BsVt9HgVhAoDEjbPTaF9Edci6zoYJJwJjDaFigDjxyU0Sc2eevVdr84TwLVjJFV19h7Bt00UdDMTbWL'
const promise = loadStripe(key)
console.log(promise)

const PackageFinal = () => {
    return (
        <div>
            
            <Elements stripe={promise}>
                <div className="col-md-8 offset-md-2">
                    <StripeCheckOut />
                </div>
            </Elements>
        </div>
    )
}

export default PackageFinal

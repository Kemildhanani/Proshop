import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from "react";
import PaymentReturn from '../../../../Components/cards/PaymentReturn';
// import PaymentWallet from '../../Components/cards/PaymentWallet';
const promise = loadStripe('pk_test_51KhULzSCJmRhwQzkr45BsVt9HgVhAoDEjbPTaF9Edci6zoYJJwJjDaFigDjxyU0Sc2eevVdr84TwLVjJFV19h7Bt00UdDMTbWL')


const Pay=()=>{

    return  (
        <>
            <Elements stripe={promise}>
                
                 <PaymentReturn/>
            </Elements>

        </>
    )
}

export default Pay;
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Form } from 'react-bootstrap'
import { createSeller } from '../../functions/seller';
import { createOrUpdateSeller } from '../../functions/auth'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./SellerCom.css";
import { AiOutlineMail } from "react-icons/ai";
import { ImMan } from  "react-icons/im";
import { FaRegAddressCard } from "react-icons/fa";
import { AiFillMobile , AiFillBank ,AiFillCodeSandboxCircle} from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import{toast} from "react-toastify"


const SellerRegistrationComplete = () => {

    const navigate = useNavigate();
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState("")
    const [name, setFName] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [ifsc, setIFSC] = useState(null)
    const [bank, setBank] = useState(null)
    const [address, setAddress] = useState(null)
    const [error, setError] = useState("")
    const [load,setload] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (window.localStorage.getItem('email') == null) {
            navigate("/seller/registration")
        }
        setEmail(window.localStorage.getItem('email'))
    }, [navigate]);

    const url = window.location.href


    const details = ({
        email,
        name,
        ifsc,
        mobile,
        bank,
        address,
        password,
        url
    })

    const submitHandler = async () => {


           
        

        if (email === null || ifsc === null || mobile === null || name === null || bank === null || address === null) {
            
            if (ifsc === null) {
                toast.success('Please Provide IFSC Code!')
            }
            if (mobile === null || mobile.length < 10) {
                toast.success('Please Provide Mobile Number!')
            }
            if (name === null) {
                toast.success('Please Provide Full Name!')
            }
            if (bank === null & bank.length < 11) {
                toast.success('Please Provide Bank Name!')
            }
            if (address === null) {
                toast.success('Please Provide Address!')
            }
            if (password === null && password.length <= 8) {
                toast.success('Password must be greater than 8 character!')
            }
        }
        else {

            if(password.length>8){


                if (typeof mobile !== null) {
                    var pattern = new RegExp(/^[0-9\b]+$/);
                  
                    if (!pattern.test(mobile)) {
                      toast.success("Please enter only number.") 
                    }else if(mobile.length != 10){              
                      toast.success("Please enter valid phone number.")
                  
                    }
    
                    else if(mobile.length == 10 && pattern.test(mobile)){
                        
                        if (typeof bank !== null) {
                            var pattern = new RegExp(/^[0-9\b]+$/);
                            // if(bank<0)
                            //     toast.success("Enter Account Valid Number")
                            // }
                            if (!pattern.test(bank)) {
                              toast.success("Please enter only Account number.") 
                            }else if(bank.length != 11){              
                              toast.success("Please enter valid Account number.")
                            }
                            else if(bank.length <=11 && pattern.test(bank)){
    
                                    try {
                                    window.localStorage.setItem("details", JSON.stringify(details));
                                }
                                 catch (err) {
                                    setError(err.message);
                                    console.log("error")
                                }
                                navigate('/package');
                                }
                            }
                          }
    
                }
            }
            else{
                toast.success("Please Enter 8 character Password")
            }
                
                
        }
    }

    return (
        <div className='x-2 '>
        <div className="doctor-login-container  pt-5 ">
      
        <div className="container shipping-form ">
            <div style={{ height: "100vh", width: "40%", marginLeft: "auto", marginRight: "auto" }}>
                <h1>Complete Seller Register</h1>
                <div className='first' >
                    <AiOutlineMail className='icons'/>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" key="email" size='large'   value={email}   />
                    </Form.Group>
                    {/* <input name="txtEmail" key="email" size='large' value={email} className='mb-3' disabled /> */}
                </div>
                <div className='first' >
        
                   
                <ImMan className='icons'/>
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" key="fname" size='large'   value={name} onChange={e => setFName(e.target.value)} placeholder="Enter your FullName" />
                    </Form.Group>
        
                   
                </div>
                <div className='first' >
        
                   
                   <FaRegAddressCard className='icons' /> <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" key="addresss" size='large'   value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your Address" />
                    </Form.Group>
                   
                </div>
        
                <div className='first'>
                   
                   <AiFillMobile className='icons' /> <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" key="mobile" size='large'  maxLength={10} value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Enter your Mobile Number" />
                    </Form.Group>
        
                   
                </div>
                <div className='first'>
                   
                  <AiFillBank className='icons' />  <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" key="bank" size='large' maxLength={11}   value={bank} onChange={e => setBank(e.target.value)} placeholder="Enter your Bank Account Number" />
                    </Form.Group>
                   
                </div>
                <div className='first'>
                   
                   <AiFillCodeSandboxCircle className='icons' /> <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" key="ifsc" size='large'   value={ifsc} onChange={e => setIFSC(e.target.value)} placeholder="Enter your IFSC Code" />
                    </Form.Group>
                   
                </div>
                <div className='first'>
                   
                   <MdPassword className='icons'/> <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="password" key="password" size='large' pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}"x   value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                    </Form.Group>
                  
                </div>
                <br />
                <button onClick={() => submitHandler()} className='button-31'>Register</button>
                {error == null ? <Alert className="mt-3" variant="danger">{error}</Alert> : ''}
            </div>
        </div>
        </div>
        
        </div>
    )
}

export default SellerRegistrationComplete
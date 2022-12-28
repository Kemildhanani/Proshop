import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import ps5 from "../../images/ps5logo.png"

const Footer = () => {



  return (
      <>
         <div id="footer-container">
                <div className="sec-footer">
                    {/* <hr style={{ width: "30%", margin: "10px auto" }} /> */}
                    
                </div>
                <footer className="footer-container">
                    <div className="p-1 first-section">
                        <hr />
                        <div className="footer-logo">

                            <img className="proshop-logo" style={{width: "100px", height: "65px"}} src={ps5} alt="NewsGrid" />
                            <h1 className="heading">PROSHOP</h1>

                        </div>
                        <hr />
                        <p>All products displayed on Proshop are verified from brand. All products listed on the platform are accredited.</p>
                    </div>
                    <div className="p-1 second-section">
                        <hr />
                        <h2>Contact Info</h2>
                        <hr />
                        <p>Proshop Warehouse near Noida Golf Course, Sector 38, Delhi NCR, India - 201303</p>
                        <p>+ 0261 2566788</p>
                    </div>
                    <div className="p-1 third-section">
                        <hr />
                        <h2>Site Links</h2>
                        <hr />
                        <ul className="list">
                            <li><Link to="/termsConditions">Terms & Conditions</Link></li>
                            <li><Link to="/privacyPolicy">Privacy & Policy</Link></li>
                            <li><Link to="/aboutUs">About Us</Link></li>
                            <li><Link to="/contactUs">Contact Us</Link></li>
                        </ul>
                        <div className="social">

                            <a href="https://facebook.com" rel="noreferrer" target="_blank"><i className="fab fa-facebook fa-2x"></i></a>
                            <a href="https://twitter.com" rel="noreferrer" target="_blank"><i className="fab fa-twitter fa-2x"></i></a>
                            <a href="https://instagram.com" rel="noreferrer" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>
                            <a href="https://youtube.com" rel="noreferrer" target="_blank"><i className="fab fa-youtube fa-2x"></i></a>

                        </div>
                    </div>
                    <div className="p-1 fourth-section">
                        <hr />
                        <h2> Our Community</h2>
                        <hr />
                        <p>You can also join our seller community to sell products on proshop we are having several packages to for sellers and many other benefits.</p>
                        <Link to="/seller/registration" className="btn-footer btn-footer-dark">Join Now</Link>
                    </div>
                    <div id="copy">
                        <div>Copyright &copy; {new Date().getFullYear()}</div>
                    </div>
                </footer>
            </div>
      </>
    // <div className='main'>
    //     <div className='parent'>
    //         <div className='child1' >
    //             1
    //         </div>
    //         <div className='child2' >
    //             2
    //         </div>
    //         <div className='child3' >
    //             3
    //         </div>
    //     </div>
    // </div>
  ) 
}

export default Footer
import React from 'react'
import './about.css'

const AboutUs = () => {
    window.scrollTo(0, 0)
    return (
        <>
            <section id="about-a" className="text-align py-3">
                <div className="container">
                    <h2 id="section-title">
                        About Us
                     </h2>
                    <div className="bottom-line"></div>
                    <p className="lead">Let us tell you where we started and where we are...</p>
                    <div className="about-info py-2">
                        <div className="bio bg-light">
                            <h4>You Are At Best Place</h4>
                            <p>Welcome to Proshop (e shopping store) which provides you best products from best sellers.Proshop was developed by Three persons who have one vision to provide best electronic gadgets to every place of india.Proshop has come a long way from its begining in a starting location home office.</p>
                        </div>
                    </div>
                    <h1 className="section-title mt-5">AWARDS</h1>
                    <div className="bottom-line mb-2"></div>
                    <div className="award">
                        <div className="award-1 py-1">
                            <i className="fas fa-award fa-3x"></i>
                            <h3>Award-1</h3>
                            <p>We are praiced for Best Seller in 2019 by MEIT.</p>
                        </div>
                        <div className="award-2 py-1">
                            <i className="fas fa-award fa-3x"></i>
                            <h3>Award-2</h3>
                            <p>We are praiced by IEEMA for No 1 E-pharmacy Store of 2020.</p>
                        </div>
                        <div className="award-3 py-1">
                            <i className="fas fa-award fa-3x"></i>
                            <h3>Award-3</h3>
                            <p>We are praiced Ministry of Electronics & IT during 2018.</p>
                        </div>
                    </div>

                </div>
            </section>
            <div id="about-d">
                <div className="container">
                    <h2 className="section-title text-align mt-5">Testimonial</h2>
                    <div className="bottom-line"></div>
                    <p className="lead text-align">Take a look at what our client says...</p>
                    <div className="testimonials">
                        <div>
                            <p>I can honestly say that they always gave an excellent service - from the simplicity of completing the order and ease of filling out the consultation, to the quick dispatch and delivery.they also give me advice and were always happy to help with any queries I had.</p>
                            <ul>
                                <li>
                                    Anjali Gupta,
                                </li>
                                <li> Delhi</li>
                            </ul>
                        </div>
                        <div>
                            <p>I am not a customer anymore but Proshp provided a service at a time in my life when it was truly vital.Without this service I would have probably lost my job and who knows where that would have led.I am sure you have helped people like me all over the India.</p>
                            <ul>
                                <li>
                                    Rajesh Saraiya,
                                </li>
                                <li> Dehradun</li>
                            </ul>
                        </div>
                        <div>
                            <p>I have been using Proshop for years and I cannot say enough good things about them. They are honest, efficient, reasonable in cost and always provide great service!I would ALWAYS and without any reservations i recommend proshop to anyone.</p>
                            <ul>
                                <li>
                                    Brijesh Shah,
                                </li>
                                <li> Meghalaya</li>
                            </ul>
                        </div>
                        <div>
                            <p>Top class company, and second to none,it's very professional and trustworthy. The ladies that answers the emails are so kind and helpful, they really do care about helping in anyway they can.</p>
                            <ul>
                                <li>
                                    Malhar Gupta,
                                </li>
                                <li> Mumbai</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs

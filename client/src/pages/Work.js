import React, { useState } from 'react'

import w from '../assets/onePagesImages/work.png'
import w1 from '../assets/onePagesImages/w1.png'
import work from '../assets/onePagesImages/job.png'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import FAQ from '../components/Popups/FAQ'

const Work = () => {

    const [faqs, setFaqs] = useState([
        {
          question: "Sales Excecutive",
          work: "On Site",
          exp: "2 years",
          answer:
            "Responsible for engaging with customers, understanding their needs, and providing them with the best jewelry options. Ensures customer satisfaction and drives sales by showcasing the latest collections and offers.",
          open: true
        },
        {
          question: "Accountant",
          work: "On Site",
          exp: "0-5 years",
          answer: "Manages the financial transactions of the jewelry store, including bookkeeping, invoicing, and financial reporting. Ensures accuracy in financial records and compliance with relevant regulations.",
          open: false
        },
        {
          question:
            "Store Manager",
          work: "On Site",
          exp: "5 years",
          answer: "Oversees the daily operations of the jewelry store, including staff management, inventory control, and customer service. Ensures that the store runs efficiently and meets sales targets.",
          open: false
        },
        {
          question:
            "IT Billing",
          work: "On Site",
          exp: "0-5 years",
          answer: "Handles the billing and IT-related tasks within the store, ensuring that all transactions are processed smoothly and efficiently. Manages the technical aspects of billing systems and resolves any issues that arise.",
          open: false
        }
    ]);
    
    const toggleFAQ = index => {
        setFaqs(
          faqs.map((faq, i) => {
            if (i === index) {
              faq.open = !faq.open;
            } else {
              faq.open = false;
            }
    
            return faq;
          })
        );
    };

    return (
        <>
            <NavBar />

            <h1 className='maintitleWork' style={{ textAlign: 'center' }}>Work With Us</h1>

            <div className='workTextTop' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <p style={{ textAlign: 'center', maxWidth: '800px', marginTop: '20px' }}>
                    To innovate, collaborate, and grow in a dynamic and inclusive environment.
                    Enjoy comprehensive benefits, diverse opportunities, and a culture that values your professional development.
                    Apply now and be part of our passionate team!
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{ marginTop: '50px', width: '40%' }} src={w} alt='work' />
            </div>

            <div>
                <h1 className='whyWorkWith' style={{ textAlign: 'center', marginTop: '60px' }}>Why work with us</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ backgroundColor: '#C18843', width: '10%', height: '3px', marginTop: '8px', marginBottom: '20px' }}></p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img className='workwithusImage' src={w1} alt='w1' />
            </div>

            <div className='working_container'>
                <div className='left_content'>
                    <h1>Featured opportunities</h1>

                    <div className="faqs">
                        {faqs.map((faq, index) => (
                            <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
                        ))}
                    </div>

                    <div>
                        <button style={{ backgroundColor: '#C18843', border: 'none', color: 'white', height: '40px', width: '30%', marginTop: '50px', borderRadius: '8px' }}>Contact +91 73971 84803</button>
                        <p style={{fontWeight:300,marginTop:'5px'}}>* For more info</p>
                    </div>
                </div>
                <div className='right_content'>
                    <img src={work} alt='work' />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Work
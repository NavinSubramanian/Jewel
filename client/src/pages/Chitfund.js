import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

import ChitFundScheme from '../assets/homeImages/chitFundScheme.png'

const Chitfund = () => {

    const nav = useNavigate()

    return (
        <>
            <NavBar />

            <div className='landChitfund'>
                <h1>சிட் ஃபண்ட் திட்டம்</h1>
                <p>எங்களின் பிரபலமான தங்க சேமிப்புத் திட்டங்கள், உங்கள் எதிர்காலத்தைத் திட்டமிட உதவும் வகையில் ஒவ்வொரு மாதமும் சிறிய முதலீடுகள் மற்றும் குறிப்பிடத்தக்க வருமானத்தைப் பெறுகின்றன.</p>
                <img src="https://mahesanchitfund.in/wp-content/uploads/2021/09/jjj.jpg" alt="" />
            </div>

            <div className='aboutPlanChit'>
                <div className="chitPlanLeft">
                    <h2>திட்டத்தின் விவரம்</h2>
                    <p>எங்களுடைய ஷோரூமில் மாதாந்திர தவணை ஏற்றுக்கொள்ளப்படும். <br /><br />
                    உறுப்பினர்கள் தங்கம் (நகைகள் அல்லது நாணயங்கள்), வைரம் அல்லது பிளாட்டினம் நகைகள் என VBJ ஷோரூம்களில் தங்களுடைய தங்கத்தை மீட்டுக்கொள்ள உரிமை உண்டு.</p>
                    <button onClick={()=>nav('/chitfund/enquire')}>JOIN NOW</button>
                </div>
                <img src={ChitFundScheme} className="chitPlanRight" />
            </div>

            <div className='chitTable'>
                <h1>11-மாத நிலையான திட்டம்</h1>
                <table id="planMain">
                    <tr>
                        <th>Chit</th>
                        <th>Months</th>
                        <th>Total</th>
                        <th>Bonus</th>
                        <th>Gift</th>
                        <th>Full Total</th>
                    </tr>
                    <tr>
                        <td>500</td>
                        <td>11</td>
                        <td>5500</td>
                        <td>550</td>
                        <td>275</td>
                        <td className='highlightTot'>6325</td>
                    </tr>
                    <tr>
                        <td>1000</td>
                        <td>11</td>
                        <td>11000</td>
                        <td>1100</td>
                        <td>550</td>
                        <td className='highlightTot'>12650</td>
                    </tr>
                    <tr>
                        <td>1500</td>
                        <td>11</td>
                        <td>16500</td>
                        <td>1650</td>
                        <td>825</td>
                        <td className='highlightTot'>18975</td>
                    </tr>
                    <tr>
                        <td>2000</td>
                        <td>11</td>
                        <td>22000</td>
                        <td>2200</td>
                        <td>1100</td>
                        <td className='highlightTot'>25300</td>
                    </tr>
                    <tr>
                        <td>2500</td>
                        <td>11</td>
                        <td>27500</td>
                        <td>2750</td>
                        <td>1375</td>
                        <td className='highlightTot'>31625</td>
                    </tr>
                    <tr>
                        <td>3000</td>
                        <td>11</td>
                        <td>33000</td>
                        <td>3300</td>
                        <td>1650</td>
                        <td className='highlightTot'>37950</td>
                    </tr>
                    <tr>
                        <td>5000</td>
                        <td>11</td>
                        <td>55000</td>
                        <td>5500</td>
                        <td>2750</td>
                        <td className='highlightTot'>63250</td>
                    </tr>
                    <tr>
                        <td>10000</td>
                        <td>11</td>
                        <td>110000</td>
                        <td>11000</td>
                        <td>5500</td>
                        <td className='highlightTot'>126500</td>
                    </tr>
                </table>
            </div>

            <div className='chitTerms'>
                <h1>விதிமுறைகள் மற்றும் நிபந்தனைகளின்</h1>
                <ul>
                    <li>Redemption of this saving scheme must be done after 30 days of payment of last installment.</li>

	                <li>Members are entitled to redeem their gold at the GEETHA JEWELLERS SHOWROOM as gold (jewellery or coins), diamond or platinum jewellery.</li>

	                <li>Prepayment of installments and advancement of the maturity date are not permitted.</li>

	                <li>Only one entry per month.</li>

	                <li>Membership card must be produced at the time of payment to enable the entry of the payment in the card for offline customers.</li>

	                <li>The chit amount can be paid by cash, online payments. Member’s name and membership number should be clearly written in all modes of payment.</li>

	                <li>Delay in payments will automatically extend the maturity date by the number of months delayed.</li>

	                <li>Members are entitled to redeem the total weight of the gold credited to their account on maturity.</li>

	                <li>Members are entitled to apply the rate of gold prevailing on the date of their purchase/ redemption.</li>

	                <li>Cash will not be refunded under any circumstance.</li>

	                <li>The stone charges, making charges and GST/ Tax will be borne by members as applicable at the time of purchase / redemption.</li>

	                <li>GEETHA JEWELLERS reserves the rights to alter, amend, modify, add or delete any of the terms and conditions from time to time.</li>

	                <li>The conduct of the scheme is subject to the terms and policies laid down by the Central and/or State Government from time to time.</li>

	                <li>All disputes are subject to the jurisdiction of the competent court in Salem.</li>

                </ul>
            </div>

            <Footer />
        </>
    )
}

export default Chitfund;
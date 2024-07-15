import React, { useState } from 'react';

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const Chitfund = () => {
    return (
        <>
            <NavBar />

            <div className='landChitfund'>
                <h1>சிட் ஃபண்ட் திட்டம்</h1>
                <p>எங்களின் பிரபலமான தங்க சேமிப்புத் திட்டங்கள், உங்கள் எதிர்காலத்தைத் திட்டமிட உதவும் வகையில் ஒவ்வொரு மாதமும் சிறிய முதலீடுகள் மற்றும் குறிப்பிடத்தக்க வருமானத்தைப் பெறுகின்றன.</p>
                <img src="" alt="" />
            </div>

            <div className='aboutPlanChit'>
                <div className="chitPlanLeft">
                    <h2>திட்டத்தின் விவரம்</h2>
                    <p>எங்களுடைய ஷோரூமில் மாதாந்திர தவணை ஏற்றுக்கொள்ளப்படும்.
                    உறுப்பினர்கள் தங்கம் (நகைகள் அல்லது நாணயங்கள்), வைரம் அல்லது பிளாட்டினம் நகைகள் என VBJ ஷோரூம்களில் தங்களுடைய தங்கத்தை மீட்டுக்கொள்ள உரிமை உண்டு.</p>
                </div>
                <div className="chitPlanRight"></div>
            </div>

            <div className='chitTable'>
                <h1>12-மாத நிலையான திட்டம்</h1>
                <table id="planMain">
                    <tr>
                        <th>Month</th>
                        <th>Gold Rate</th>
                        <th>Fixed Installment</th>
                        <th>Grams Deposited</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Berglunds snabbköp</td>
                        <td>Christina Berglund</td>
                        <td>Sweden</td>
                        <td>Sweden</td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                        <td>Mexico</td>
                    </tr>
                    <tr>
                        <td>Ernst Handel</td>
                        <td>Roland Mendel</td>
                        <td>Austria</td>
                        <td>Austria</td>
                    </tr>
                    <tr>
                        <td>Island Trading</td>
                        <td>Helen Bennett</td>
                        <td>UK</td>
                        <td>UK</td>
                    </tr>
                    <tr>
                        <td>Königlich Essen</td>
                        <td>Philip Cramer</td>
                        <td>Germany</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Laughing Bacchus Winecellars</td>
                        <td>Yoshi Tannamuri</td>
                        <td>Canada</td>
                        <td>Canada</td>
                    </tr>
                    <tr>
                        <td>Magazzini Alimentari Riuniti</td>
                        <td>Giovanni Rovelli</td>
                        <td>Italy</td>
                        <td>Italy</td>
                    </tr>
                    <tr>
                        <td>North/South</td>
                        <td>Simon Crowther</td>
                        <td>UK</td>
                        <td>UK</td>
                    </tr>
                    <tr>
                        <td>Paris spécialités</td>
                        <td>Marie Bertrand</td>
                        <td>France</td>
                        <td>France</td>
                    </tr>
                </table>
            </div>

            <div className='chitTerms'>
                <h1>விதிமுறைகள் மற்றும் நிபந்தனைகளின்</h1>
                <ul>
                    <li>Redemption of this saving scheme must be done after 30 days of payment of last instalment.</li>
                    <li>Monthly instalment will be accepted at any VBJ showroom.</li>
                    <li>Members are entitled to redeem their gold at any of the VBJ showrooms as gold (jewellery or coins), diamond or platinum jewellery.</li>
                    <li>Monthly instalment should be paid regularly on or before 5 PM on the last day of every month.</li>
                    <li>Prepayment of instalments and advancement of the maturity date are not permitted.</li>
                    <li>Only one entry per month.</li>
                    <li>Membership card must be produced at the time of payment to enable the entry of the payment in the card for offline customers.</li>
                    <li>The chit amount can be paid by cash, at par cheques, demand drafts, online payments. Member’s name and membership number should be clearly written in all modes of payment.</li>
                    <li>The date of receipt of payment will be the date on which the gold rate will be applied.</li>
                    <li>Cheques/demand drafts should be drawn in favour of “Vummidi Bangaru Jewellers”.</li>
                    <li>In case the cheque is dishonoured, the date of the realization will be considered for fixing the gold rate.</li>
                    <li>Delay in payments will automatically extend the maturity date by the number of months delayed.</li>
                    <li>Members are entitled to redeem the total weight of the gold credited to their account on maturity.</li>
                    <li>The gold rate as announced by Madras Jewellers & Diamond Merchants Association for selling of 22 Kt (916) will be the rate applied for calculating redemption value, for gold jewellery, diamond jewellery and platinum jewellery.</li>
                    <li>Members are entitled to apply the rate of gold prevailing on the date of their purchase/ redemption.</li>
                    <li>Cash will not be refunded under any circumstance.</li>
                    <li>The stone charges, making charges and GST/ Tax will be borne by members as applicable at the time of purchase / redemption.</li>
                    <li>VBJ reserves the rights to alter, amend, modify, add or delete any of the terms and conditions from time to time.</li>
                    <li>The conduct of the scheme is subject to the terms and policies laid down by the Central and/or State Government from time to time.</li>
                    <li>All disputes are subject to the jurisdiction of the competent court in Chennai.</li>
                </ul>
            </div>

            <Footer />
        </>
    )
}

export default Chitfund
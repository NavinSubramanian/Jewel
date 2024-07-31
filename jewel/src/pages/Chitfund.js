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
                <h1>15-மாத நிலையான திட்டம்</h1>
                <table id="planMain">
                    <tr>
                        <th>Month</th>
                        <th>500 Chit</th>
                        <th>1000 Chit</th>
                        <th>1500 Chit</th>
                        <th>2000 Chit</th>
                        <th>2500 Chit</th>
                        <th>3000 Chit</th>
                        <th>5000 Chit</th>
                        <th>10000 Chit</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>500</td>
                        <td>1000</td>
                        <td>1500</td>
                        <td>2000</td>
                        <td>2500</td>
                        <td>3000</td>
                        <td>5000</td>
                        <td>10000</td>
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
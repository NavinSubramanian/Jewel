import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Price = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [goldPrice, setGoldPrice] = useState();
    const [silverPrice, setSilverPrice] = useState();
    const history = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleUpdatePrice = async () => {
        try {
            const response = await axios.post('https://www.geethajewellers.in/api/gr', {
                gold_rate: goldPrice,
                silver_rate: silverPrice
            });
            alert('Price updated successfully');
            history('/admin'); // Redirect to the admin page
        } catch (error) {
            alert('Error updating price');
        }
    };

    return (
        <div className='price-tab'>
            <h2 style={{ marginBottom: '40px' }}>Update up today jewel price...</h2>
            <p>Date: {currentDateTime.toLocaleDateString()} Time: {currentDateTime.toLocaleTimeString()}</p>

            <div className="form-container">
                <div className="form-item">
                    <label htmlFor="gold-price">Gold Price:</label>
                    <div className="input-group">
                        <input
                            id="gold-price"
                            className="form-field"
                            type="number"
                            value={goldPrice}
                            onChange={(e) => setGoldPrice(e.target.value)}
                        />
                        <span>/gram</span>
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="silver-price">Silver Price:</label>
                    <div className="input-group">
                        <input
                            id="silver-price"
                            className="form-field"
                            type="number"
                            value={silverPrice}
                            onChange={(e) => setSilverPrice(e.target.value)}
                        />
                        <span>/gram</span>
                    </div>
                </div>
            </div>
            <button onClick={handleUpdatePrice}>
                Update Price
            </button>
        </div>
    );
};

export default Price;

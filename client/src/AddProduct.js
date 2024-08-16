import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');

    // New states for Metal and Carat
    const [metal, setMetal] = useState('');
    const [carat, setCarat] = useState('');

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!productName) newErrors.productName = 'Product name is required';
        if (!productDesc) newErrors.productDesc = 'Product description is required';
        if (!category) newErrors.category = 'Product category is required';
        if (!type) newErrors.type = 'Product type is required';
        if (!price) newErrors.price = 'Product price is required';
        if (!weight) newErrors.weight = 'Product weight is required';
        if (!image1) newErrors.image1 = 'At least one image link is required';
        if (!metal) newErrors.metal = 'Metal selection is required';
        if ((metal === 'Gold' || metal === 'Diamond') && !carat) {
            newErrors.carat = 'Carat is required for Gold and Diamond';
        }
        return newErrors;
    };

    const handleSubmit = async (event, addAnother = false) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if(metal != 'Gold' || metal != 'Coins'){
            setCarat("22")  // Placeholder Value
        }

        const productData = {
            productName,
            productDesc,
            category,
            type,
            price,
            weight,
            image1,
            image2,
            image3,
            image4,
            metal,
            carat,
        };

        try {
            await axios.post('https://www.geethajewellers.in/api/addproduct', productData);
            setSuccessMessage('Product added successfully');
            alert("Product added");
            if (!addAnother) {
                resetForm();
            }
        } catch (error) {
            console.error('There was an error adding the product!', error);
            alert('There was an error adding the product!');
            setSuccessMessage('Failed to add product');
        }

        if (addAnother) {
            resetForm();
        }
    };

    const resetForm = () => {
        setProductName('');
        setProductDesc('');
        setCategory('');
        setType('');
        setPrice('');
        setWeight('');
        setImage1('');
        setImage2('');
        setImage3('');
        setImage4('');
        setMetal('');
        setCarat('');
        setErrors({});
    };

    return (
        <div className='prod-cont'>
            <h2 style={{ textAlign: 'center' }}>Add new products into the list</h2>
            {successMessage && <p>{successMessage}</p>}

            <form onSubmit={(e) => handleSubmit(e, false)}>
                {/* Existing fields */}
                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='prod_name'>Product name:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            {errors.productName && <p>{errors.productName}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='prod_desc'>Product desc:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={productDesc}
                                onChange={(e) => setProductDesc(e.target.value)}
                            />
                            {errors.productDesc && <p>{errors.productDesc}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='category'>Product category:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            {errors.category && <p>{errors.category}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='type'>Product type:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                            {errors.type && <p>{errors.type}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='prod_price'>Making price:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            {errors.price && <p>{errors.price}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='prod_weight'>Product Weight:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            {errors.weight && <p>{errors.weight}</p>}
                        </div>
                    </div>
                </div>

                {/* New Metal Field */}
                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='metal'>Metal:</label>
                        <div className="input-group">
                            <select
                                className="form-field"
                                value={metal}
                                onChange={(e) => setMetal(e.target.value)}
                            >
                                <option value="">Select Metal</option>
                                <option value="Gold">Gold</option>
                                <option value="Silver">Silver</option>
                                <option value="Platinum">Platinum</option>
                                <option value="Coins">Coins</option>
                            </select>
                            {errors.metal && <p>{errors.metal}</p>}
                        </div>
                    </div>
                </div>

                {/* New Carat Field (conditionally rendered) */}
                {(metal === 'Gold' || metal === 'Coins') && (
                    <div className="form-container">
                        <div className="form-item">
                            <label htmlFor='carat'>Carat:</label>
                            <div className="input-group">
                                <select
                                    className="form-field"
                                    value={carat}
                                    onChange={(e) => setCarat(e.target.value)}
                                >
                                    <option value="">Select Carat</option>
                                    <option value="18">18 Carat</option>
                                    <option value="22">22 Carat</option>
                                    <option value="24">24 Carat</option>
                                </select>
                                {errors.carat && <p>{errors.carat}</p>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Existing Image Fields */}
                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='image1'>Image link 1:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={image1}
                                onChange={(e) => setImage1(e.target.value)}
                            />
                            {errors.image1 && <p>{errors.image1}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='image2'>Image link 2:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={image2}
                                onChange={(e) => setImage2(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='image3'>Image link 3:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={image3}
                                onChange={(e) => setImage3(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <div className="form-item">
                        <label htmlFor='image4'>Image link 4:</label>
                        <div className="input-group">
                            <input
                                className="form-field"
                                type='text'
                                value={image4}
                                onChange={(e) => setImage4(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit">Save</button>
                <button type="button" onClick={(e) => handleSubmit(e, true)}>Save and Add Another</button>
            </form>
        </div>
    );
};

export default AddProduct;
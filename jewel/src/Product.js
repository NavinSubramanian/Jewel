// import React from 'react'

// const Product = () => {

//     //need to create various hook state
//     //also need to add new inputs for the tags of the items 

//     return (
//         <div className='prod-cont'>
//             <h2 style={{ textAlign: 'center' }}>Add up new products into the list</h2>

//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='prod_name'>Product name:</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>

//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='prod_desc'>Product desc:</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>
            
//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='category'>Product category:</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>
            
//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='type'>Product type:</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>

//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='prod_price'>Product price:</label>
//                     <div className="input-group">
//                         <input className="form-field" type='number' />
//                     </div>
//                 </div>
//             </div>

//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='prod_weight'>Product Weight:</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>

//             <div style={{ marginTop: '30px', textAlign: 'center' }}>
//                 <label htmlFor='metal'>Metal</label>
//                 <select>
//                     <option>Gold</option>
//                     <option>Silver</option>
//                     <option>Diamond</option>
//                     <option>Coins</option>
//                 </select>
//             </div>

            
//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='image1'>imagelink1:</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>
//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='image2'>imagelink2</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>
//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='image3'>imagelink3</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>
            
//             <div className="form-container">
//                 <div className="form-item">
//                     <label htmlFor='image4'>imagelink4</label>
//                     <div className="input-group">
//                         <input className="form-field" type='text' />
//                     </div>
//                 </div>
//             </div>
//         <button>Save</button>
//         <button>Save and Add another</button>
//         </div>
//     )
// }

// export default Product
import React, { useState } from 'react';
import axios from 'axios';

const Product = () => {
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
        return newErrors;
    };

    const handleSubmit = async (event, addAnother = false) => {
        event.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
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
        };

        try {
            await axios.post('http://localhost:5000/addproduct', productData);
            setSuccessMessage('Product added successfully');
            alert("procuct added")
            if (!addAnother) {
                resetForm();
            }
        } catch (error) {
            alert(error)
            console.error('There was an error adding the product!', error);
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
        setErrors({});
    };

    return (
        <div className='prod-cont'>
            <h2 style={{ textAlign: 'center' }}>Add new products into the list</h2>
            {successMessage && <p>{successMessage}</p>}

            <form onSubmit={(e) => handleSubmit(e, false)}>
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
                        <label htmlFor='prod_price'>making price:</label>
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
                <button type="button" onClick={(e) => handleSubmit(e, true)}>Save and Add another</button>
            </form>
        </div>
    );
}

export default Product;

import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';
import ImageGallery from './ImageGallery';
import { UserContext } from '../UserContext';

const SeperateItem = () => {
    let { id, metal } = useParams();
    const [details, setDetails] = useState({});
    const [rate, setRate] = useState();
    const [total, setTotal] = useState(0);
    const { user, addToFavourites, removeFromFavourites } = useContext(UserContext);

    useEffect(() => {
        async function fetchRates() {
            try {
                const today = new Date().toISOString().slice(0, 10);
                const response = await axios.get(`http://localhost:5000/gr/${today}/${metal}`);
                const response2 = await axios.get(`http://localhost:5000/gp/${id}`);
                setRate(response.data.rates);
                setDetails(response2.data[0]);
                setTotal((response2.data[0].weight * response.data.rates) + parseFloat(response2.data[0].making_charges));
            } catch (err) {
                alert("Please try again some time later");
            }
        }
        fetchRates();
    }, [id, metal]);

    const images = [details.imagelink1, details.imagelink2, details.imagelink3, details.imagelink4].filter(Boolean);
    let nav = useNavigate();

    const enquireForm = () => {
        nav(`/single/${id}/${metal}/enquire`);
    };

    const isFavourite = user?.favourites?.includes(id);

    const handleFavouriteToggle = () => {
        if (isFavourite) {
          console.log(id)
            removeFromFavourites(id);
        } else {
          console.log("id")
            addToFavourites(id);
        }
    };

    return (
        <>
            <NavBar />
            <div className='pageNavigation'>
                <Link to='/'>HOME</Link>
                <span>/</span>
                <Link to={`/pro/${metal}`}>GOLD</Link>
                <span>/</span>
                <h3 style={{ textTransform: 'uppercase' }}>{details.type}</h3>
                <span>/</span>
                <h3>{details.name}</h3>
            </div>
            <div className="gallery-container">
                {images.length > 0 && <ImageGallery images={images} />}
                <div className="product-info">
                    <div>
                        <h3>{details.name}</h3>
                    </div>
                    <h4 className="price"><span style={{ fontSize: '25px' }}>₹</span>{total}</h4>
                    <p>{details.description}</p>
                    <div className="actionsItem">
                        <button onClick={enquireForm}>Enquire</button>
                        <button onClick={handleFavouriteToggle}>
                            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                        </button>
                    </div>
                    <div className="details">
                        <h4>DETAILS</h4>
                        <p>Metal: </p>
                        <p>Purity: </p>
                        <p>Gram rate: {rate}</p>
                        <p>Sizes: {details.size}</p>
                        <p>Weight: {details.weight}</p>
                    </div>
                </div>
            </div>
            <div className='priceBreakup'>
                <h1 className="title">
                    Price Breakup
                </h1>
                <table className="object-table">
                    <tbody>
                        <tr>
                            <td data-cell="Name">Material</td>
                            <td data-cell="Attribute">
                                <div>
                                    <span>{details.metal}</span>
                                </div>
                            </td>
                            <td data-cell="Price">{rate} per gram</td>
                        </tr>
                        <tr>
                            <td data-cell="Name">Stone</td>
                            <td data-cell="Attribute">
                                <div>
                                    <span>Purity</span>
                                </div>
                            </td>
                            <td data-cell="Purity">{details.carat} carat</td>
                        </tr>
                        <tr>
                            <td data-cell="Name">Production</td>
                            <td data-cell="Attribute">
                                <div>
                                    <span>Making Cost</span>
                                </div>
                            </td>
                            <td data-cell="Making">{details.making_charges} Rs</td>
                        </tr>
                        <tr>
                            <td data-cell="Name">Others</td>
                            <td data-cell="Attribute">
                                <div>
                                    <span>Tax</span>
                                </div>
                            </td>
                            <td data-cell="Making">{(total * 0.03) + (details.carat * 0.01)} Rs</td>
                        </tr>
                        <tr>
                            <td data-cell="Name">Total</td>
                            <td data-cell="Attribute">
                                <div>
                                    <span>Total Price</span>
                                </div>
                            </td>
                            <td data-cell="Making">{total} Rs</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default SeperateItem;

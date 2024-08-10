import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

import NavBar from './NavBar';
import Footer from './Footer';
import ImageGallery from './ImageGallery';
import { UserContext } from '../UserContext';

const GalleryContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
`;

const Thumbnails = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 20px;
  margin-top: 10px;
`;

const Thumbnail = styled.img`
  width: 75px;
  height: 75px;
  margin: 0 5px;
  cursor: pointer;
  border: ${props => props.isActive ? '2px solid #000' : '2px solid transparent'};
  opacity: ${props => props.isActive ? '1' : '0.5'};
`;

const MainImage = styled.img`
  width: 400px;
  height: 450px;
  object-fit: cover;
`;

const SeperateItem = () => {
    let { id, metal } = useParams();
    const [details, setDetails] = useState({});
    const [rate, setRate] = useState();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true); // Added loading state
    const { user, addToFavourites, removeFromFavourites } = useContext(UserContext);

    useEffect(() => {
        async function fetchRates() {
            try {
                const today = new Date().toISOString().slice(0, 10);
                const response = await axios.get(`https://jewelbackend.vercel.app/gr/${today}/${metal}`);
                const response2 = await axios.get(`https://jewelbackend.vercel.app/gp/${id}`);
                setRate(response.data.rates);
                setDetails(response2.data[0]);
                setTotal((response2.data[0].weight * response.data.rates) + parseFloat(response2.data[0].making_charges));
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                alert("Please try again some time later");
                setLoading(false);
            }
        }
        fetchRates();
    }, [id, metal]);

    const images = [details.imagelink1, details.imagelink2, details.imagelink3, details.imagelink4].filter(Boolean);
    let nav = useNavigate();

    const enquireForm = () => {
        nav(`https://jewelbackend.vercel.app/single/${id}/${metal}/enquire`);
    };

    const isFavourite = user?.favourites?.includes(id);

    const handleFavouriteToggle = () => {
        if (isFavourite) {
            removeFromFavourites(id);
        } else {
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
                <Link to={`/pro/${metal}/${details.type}`} style={{ textTransform: 'uppercase' }}>{details.type || <Skeleton />}</Link>
                <span>/</span>
                <h3>{details.name || <Skeleton />}</h3>
            </div>
            <div className="gallery-container">
                {loading ? (
                    <GalleryContainer>
                        <Thumbnails>
                            <Skeleton height={75} width={75} count={4} style={{ margin: '10px 5px' }} />
                        </Thumbnails>
                        <Skeleton width={400} height={450} />
                    </GalleryContainer>
                ) : (
                    <ImageGallery images={images} />
                )}
                <div className="product-info">
                    <div>
                        <h3>{details.name || <Skeleton />}</h3>
                    </div>
                    <h4 className="price"><span style={{ fontSize: '25px' }}>₹</span>{total || <Skeleton />}</h4>
                    <p>{details.description || <Skeleton count={5} />}</p>
                    <div className="actionsItem">
                        <button onClick={enquireForm}>Enquire</button>
                        {user ? 
                            <button onClick={handleFavouriteToggle}>
                                {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                            </button>
                        : 
                            <button>Login to Save</button>
                        }
                    </div>
                    <div className="details">
                        <h4>DETAILS</h4>
                        <p>Metal: {details.metal}</p>
                        <p>Purity: {details.carat}</p>
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

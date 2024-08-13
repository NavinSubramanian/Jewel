import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
// import ItemList from '../components/ItemList';
import { useParams } from 'react-router-dom';

const ItemList = lazy(()=>import('../components/ItemList'))

const Product = () => {
    let { metal, type } = useParams();

    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showWeightPopup, setShowWeightPopup] = useState(false);
    const [showPricePopup, setShowPricePopup] = useState(false);
    const [goldPrice, setGoldPrice] = useState(0);
    const [silverPrice, setSilverPrice] = useState(0);
    const [error, setError] = useState(null);
    const [initialItems, setInitialItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [weightRangeOptions, setWeightRangeOptions] = useState([]);
    const [priceRangeOptions, setPriceRangeOptions] = useState([]);

    const [categories, setCategories] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedWeightRanges, setSelectedWeightRanges] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

    const pages = {
        'gold': {
            img: 'https://t4.ftcdn.net/jpg/05/27/71/81/360_F_527718147_x7XDK929xZnZqjgh0oPYz7xK0EvtnlIF.jpg',
            description: 'Discover the epitome of elegance with our Gold Jewelry Collection. Each piece in this collection is meticulously crafted from the finest gold, offering a timeless appeal and unmatched quality. From delicate necklaces and chic earrings to stunning rings and sophisticated bracelets, our collection embodies luxury and refinement. Perfect for those who appreciate classic beauty and contemporary design, these pieces are sure to become treasured staples in your jewelry wardrobe.'
        },
        'silver': {
            img: 'https://www.wallacebishop.com.au/cdn/shop/collections/sterling-silver-jewellery-wallace-bishop_2600x.jpg?v=1651048595',
            description: 'Explore the timeless beauty of our Silver Jewelry Collection. Each piece is designed with elegance and sophistication, perfect for any occasion. Our collection features a variety of styles, from classic to contemporary, ensuring there is something for everyone.'
        },
        'platinum': {
            img: 'https://blog.stuller.com/wp-content/uploads/2019/05/Platinum-Metals-Blog-Header.jpg',
            description: 'Experience the unparalleled luxury of our Platinum Jewelry Collection. Known for its durability and lustrous finish, platinum jewelry is a symbol of everlasting beauty. Discover our range of exquisite designs that are perfect for marking life’s special moments.'
        },
        'coins': {
            img: 'https://img.freepik.com/premium-photo/gold-coins-gold-jewellery-floor-background_181203-21906.jpg',
            description: 'Our Coins Collection offers a unique blend of artistry and value. From collectible coins to bullion, each piece is crafted with precision and attention to detail. Whether you are a seasoned collector or just starting, our collection has something to offer.'
        }
    };

    const pageContent = pages[metal];

    const toggleCategoryPopup = () => {
        setShowCategoryPopup(!showCategoryPopup);
        setShowWeightPopup(false);
        setShowPricePopup(false);
    };

    const toggleWeightPopup = () => {
        setShowWeightPopup(!showWeightPopup);
        setShowCategoryPopup(false);
        setShowPricePopup(false);
    };

    const togglePricePopup = () => {
        setShowPricePopup(!showPricePopup);
        setShowCategoryPopup(false);
        setShowWeightPopup(false);
    };

    const disablePopup = () => {
        setShowWeightPopup(false);
        setShowCategoryPopup(false);
        setShowPricePopup(false);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const today = new Date().toISOString().slice(0, 10);
                const [rateResponse, itemsResponse] = await Promise.all([
                    axios.get(`https://jewelbackend.vercel.app/gr/${today}/${metal}`),
                    axios.get(`https://jewelbackend.vercel.app/getproduct/${metal}`)
                ]);
                const { rates } = rateResponse.data;
                setGoldPrice(rates);
                const items = itemsResponse.data;
                setInitialItems(items);
                setFilteredItems(items);
                extractCategories(items);
                generateRangeOptions(items, rates);
                if (type) {
                    const matchedCategoryType = items.find(item => item.type === type);
                    if (matchedCategoryType) {
                        setSelectedCategories([`${matchedCategoryType.category}-${type}`]);
                    }
                }
            } catch (error) {
                console.error("There was an error fetching the data!", error);
                setError("Failed to fetch data. Please try again later.");
            }
        }
        fetchData();
    }, [metal, type]);

    const extractCategories = (items) => {
        const categories = {};
        items.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = new Set();
            }
            categories[item.category].add(item.type);
        });
        for (let category in categories) {
            categories[category] = Array.from(categories[category]);
        }
        setCategories(categories);
    };

    const generateRangeOptions = (items, goldPrice) => {
        if (items.length === 0) return;

        const weights = items.map(item => parseFloat(item.weight));
        const minWeight = Math.min(...weights);
        const maxWeight = Math.max(...weights);
        const weightOptions = generateRange(minWeight, maxWeight + 100, 100);
        const roundedWeightOptions = weightOptions.map(value => Math.round(value / 100) * 100);

        const prices = items.map(item => (parseFloat(item.weight) * goldPrice) + parseFloat(item.making_charges));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const roundedMaxPrice = Math.round(maxPrice / 1000) * 1000;
        const priceOptions = generateRange(minPrice, roundedMaxPrice + 20000, 10000);
        const roundedPriceOptions = priceOptions.map(value => Math.round(value / 10000) * 10000);

        setWeightRangeOptions(roundedWeightOptions);
        setPriceRangeOptions(roundedPriceOptions);
    };

    const generateRange = (min, max, step) => {
        const ranges = [];
        for (let i = min; i <= max; i += step) {
            ranges.push(i);
        }
        return ranges;
    };

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories((prevCategories) =>
            checked ? [...prevCategories, value] : prevCategories.filter((category) => category !== value)
        );
    };

    const handleWeightChange = (event) => {
        const { value, checked } = event.target;
        setSelectedWeightRanges((prevRanges) =>
            checked ? [...prevRanges, parseInt(value)] : prevRanges.filter((range) => range !== parseInt(value))
        );
    };

    const handlePriceChange = (event) => {
        const { value, checked } = event.target;
        setSelectedPriceRanges((prevRanges) =>
            checked ? [...prevRanges, parseInt(value)] : prevRanges.filter((range) => range !== parseInt(value))
        );
    };

    const filterItems = () => {
        let filtered = initialItems;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(item =>
                selectedCategories.includes(`${item.category}-${item.type}`)
            );
        }

        if (selectedWeightRanges.length > 0) {
            filtered = filtered.filter(item =>
                selectedWeightRanges.some(range => parseFloat(item.weight) <= range)
            );
        }

        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter(item =>
                selectedPriceRanges.some(range => ((parseFloat(item.weight) * goldPrice) + parseFloat(item.making_charges)) <= range)
            );
        }

        setFilteredItems(filtered);
    };

    const clearFilter = () => {
        setSelectedCategories([]);
        setSelectedWeightRanges([]);
        setSelectedPriceRanges([]);
        setFilteredItems(initialItems);
    };

    const closePopup = () => {
        setShowCategoryPopup(false);
        setShowPricePopup(false);
        setShowWeightPopup(false);
    };

    useEffect(() => {
        filterItems();
    }, [selectedCategories, selectedWeightRanges, selectedPriceRanges]);


    /* To display the filters */
    const removeCategoryFilter = (category) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.filter((cat) => cat !== category)
        );
    };

    const removeWeightFilter = (weight) => {
        setSelectedWeightRanges((prevRanges) =>
            prevRanges.filter((range) => range !== weight)
        );
    };

    const removePriceFilter = (price) => {
        setSelectedPriceRanges((prevRanges) =>
            prevRanges.filter((range) => range !== price)
        );
    };

    const renderSelectedFilters = () => {
        const categoryLabels = selectedCategories.map((category) => (
            <button
                key={category}
                className="filter-badge"
                onClick={() => removeCategoryFilter(category)}
            >
                {category} &times;
            </button>
        ));

        const weightLabels = selectedWeightRanges.map((weight) => (
            <button
                key={weight}
                className="filter-badge"
                onClick={() => removeWeightFilter(weight)}
            >
                {"Up to " + weight + "g"} &times;
            </button>
        ));

        const priceLabels = selectedPriceRanges.map((price) => (
            <button
                key={price}
                className="filter-badge"
                onClick={() => removePriceFilter(price)}
            >
                {"Up to ₹" + price} &times;
            </button>
        ));

        return (
            <div className="selected-filters">
                {categoryLabels}
                {weightLabels}
                {priceLabels}
            </div>
        );
    };
    

    return (
        <>
            <NavBar />

            <div className='jewelHeader'>
                <h1 style={{ textAlign: 'center', color: '#C18843' }}>{metal.toUpperCase()}</h1>
                <img src={pageContent.img} />
                <p style={{ textAlign: 'center', maxWidth: '1200px', marginTop: '20px' }}>
                    {pageContent.description}
                </p>

                <div className='prod_filter'>
                    <p style={{ color: 'grey' }}>SORT BY:</p>
                    <div style={{ position: 'relative' }}>
                        <p  onMouseEnter={toggleCategoryPopup} 
                            onFocus={toggleCategoryPopup}
                            // onBlur={disablePopup}
                            // onMouseLeave={disablePopup}
                            style={{ cursor: 'pointer' }}>
                                Category
                        </p>
                        {showCategoryPopup && (
                            <div className='filterPopups' onMouseLeave={closePopup}>
                                {Object.keys(categories).map(category => (
                                    <div key={category}>
                                        <p><strong>{category}</strong></p>
                                        <hr />
                                        {categories[category].map(type => (
                                            <div key={type}>
                                                <input
                                                    type="checkbox"
                                                    id={`${category}-${type}`}
                                                    value={`${category}-${type}`}
                                                    checked={selectedCategories.includes(`${category}-${type}`)}
                                                    onChange={handleCategoryChange}
                                                />
                                                <label htmlFor={`${category}-${type}`} style={{ cursor: 'pointer' }}>{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <p  onMouseEnter={toggleWeightPopup} 
                            onFocus={toggleWeightPopup}
                            // onMouseLeave={disablePopup}
                            // onBlur={disablePopup}
                            style={{ cursor: 'pointer' }}>
                                Weight Range
                        </p>
                        {showWeightPopup && (
                            <div className='filterWeightPopups' onMouseLeave={closePopup}>
                                {weightRangeOptions.map((range) => (
                                    <div key={range}>
                                        <input
                                            type="checkbox"
                                            id={`weight-${range}`}
                                            value={range}
                                            checked={selectedWeightRanges.includes(range)}
                                            onChange={handleWeightChange}
                                        />
                                        <label htmlFor={`weight-${range}`} style={{ cursor: 'pointer' }}>{`Up to ${range} grams`}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <p  onMouseEnter={togglePricePopup}
                            onFocus={togglePricePopup}
                            // onMouseLeave={disablePopup}
                            // onBlur={disablePopup}
                            style={{ cursor: 'pointer' }}>
                                Price
                        </p>
                        {showPricePopup && (
                            <div className='filterPricePopups' onMouseLeave={closePopup}>
                                {priceRangeOptions.map((range) => (
                                    <div key={range}>
                                        <input
                                            type="checkbox"
                                            id={`price-${range}`}
                                            value={range}
                                            checked={selectedPriceRanges.includes(range)}
                                            onChange={handlePriceChange}
                                        />
                                        <label htmlFor={`price-${range}`} style={{ cursor: 'pointer' }}>{`Up to ₹${range}`}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={clearFilter} className='clearBtn'>CLEAR</button>
                </div>
            </div>
            <hr style={{ maxWidth: 1000, marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }} />
            <div className='displayFilters'>
                <h3>Filters : </h3>
                <p>{renderSelectedFilters()}</p>
            </div>
            <hr style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto' }} />

            <div className='prod_display'>
                <Suspense fallback={<p>Loading...</p>}>
                    {filteredItems.map((item) => (
                        <ItemList key={item.id} item={item} rate={goldPrice} />
                    ))}
                </Suspense>
            </div>

            <Footer />
        </>
    );
};

export default Product;
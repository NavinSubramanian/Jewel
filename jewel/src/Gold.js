// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavBar from './components/NavBar';
// import Footer from './components/Footer';
// import ItemList from './components/ItemList';

// const Gold = () => {
//     const [showCategoryPopup, setShowCategoryPopup] = useState(false);
//     const [showWeightPopup, setShowWeightPopup] = useState(false);
//     const [showPricePopup, setShowPricePopup] = useState(false);
//     const [goldPrice, setGoldPrice] = useState(0);
//     const [silverPrice, setSilverPrice] = useState(0);
//     const [error, setError] = useState(null);
//     const [initialItems, setInitialItems] = useState([]);
//     const [filteredItems, setFilteredItems] = useState([]);
//     const [weightRangeOptions, setWeightRangeOptions] = useState([]);
//     const [priceRangeOptions, setPriceRangeOptions] = useState([]);

//     const [selectedWeightRanges, setSelectedWeightRanges] = useState([]);
//     const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

//     const toggleCategoryPopup = () => {
//         setShowCategoryPopup(!showCategoryPopup);
//         setShowWeightPopup(false);
//         setShowPricePopup(false);
//     };

//     const toggleWeightPopup = () => {
//         setShowWeightPopup(!showWeightPopup);
//         setShowCategoryPopup(false);
//         setShowPricePopup(false);
//     };

//     const togglePricePopup = () => {
//         setShowPricePopup(!showPricePopup);
//         setShowCategoryPopup(false);
//         setShowWeightPopup(false);
//     };

//     useEffect(() => {
//         async function fetchRates() {
//             try {
//                 const today = new Date().toISOString().slice(0, 10);
//                 const response = await axios.get(`http://localhost:5000/gr/${today}`);
//                 const response2 = await axios.get('http://localhost:5000/getproduct/');
//                 const { gold_rate, silver_rate } = response.data;
//                 setGoldPrice(gold_rate);
//                 setSilverPrice(silver_rate);
//                 setInitialItems(response2.data);
//                 setFilteredItems(response2.data);
//                 generateRangeOptions(response2.data, gold_rate);
//             } catch (error) {
//                 console.error("There was an error fetching the rates!", error);
//                 setError("Failed to fetch rates. Please try again later.");
//             }
//         }
//         fetchRates();
//     }, []);

//     const generateRangeOptions = (items, goldPrice) => {
//         if (items.length === 0) return;

//         const weights = items.map(item => parseFloat(item.weight));
//         const minWeight = Math.min(...weights);
//         const maxWeight = Math.max(...weights);
//         const weightOptions = generateRange(minWeight, maxWeight + 100, 100);
//         const roundedWeightOptions = weightOptions.map(value => Math.round(value / 100) * 100);

//         const prices = items.map(item => (parseFloat(item.weight) * goldPrice) + parseFloat(item.making_charges));
//         const minPrice = Math.min(...prices);
//         const maxPrice = Math.max(...prices);
//         const roundedMaxPrice = Math.round(maxPrice / 1000) * 1000;
//         const priceOptions = generateRange(minPrice, roundedMaxPrice + 20000, 10000);
//         const roundedPriceOptions = priceOptions.map(value => Math.round(value / 10000) * 10000);

//         setWeightRangeOptions(roundedWeightOptions);
//         setPriceRangeOptions(roundedPriceOptions);
//     };

//     const generateRange = (min, max, step) => {
//         const ranges = [];
//         for (let i = min; i <= max; i += step) {
//             ranges.push(i);
//         }
//         return ranges;
//     };

//     const handleWeightChange = (event) => {
//         const { value, checked } = event.target;
//         setSelectedWeightRanges((prevRanges) =>
//             checked ? [...prevRanges, parseInt(value)] : prevRanges.filter((range) => range !== parseInt(value))
//         );
//     };

//     const handlePriceChange = (event) => {
//         const { value, checked } = event.target;
//         setSelectedPriceRanges((prevRanges) =>
//             checked ? [...prevRanges, parseInt(value)] : prevRanges.filter((range) => range !== parseInt(value))
//         );
//     };

//     const filterItems = () => {
//         let filtered = initialItems;

//         if (selectedWeightRanges.length > 0) {
//             filtered = filtered.filter(item =>
//                 selectedWeightRanges.some(range => parseFloat(item.weight) <= range)
//             );
//         }

//         if (selectedPriceRanges.length > 0) {
//             filtered = filtered.filter(item =>
//                 selectedPriceRanges.some(range => ((parseFloat(item.weight) * goldPrice) + parseFloat(item.making_charges)) <= range)
//             );
//         }

//         setFilteredItems(filtered);
//     };

//     useEffect(() => {
//         filterItems();
//     }, [selectedWeightRanges, selectedPriceRanges]);

//     return (
//         <>
//             <NavBar />

//             <div className='jewelHeader'>
//                 <h1 style={{ textAlign: 'center', color: '#C18843' }}>GOLD</h1>
//                 <img src='https://t4.ftcdn.net/jpg/05/27/71/81/360_F_527718147_x7XDK929xZnZqjgh0oPYz7xK0EvtnlIF.jpg' />
//                 <p style={{ textAlign: 'center', maxWidth: '1200px', marginTop: '20px' }}>
//                     Discover the epitome of elegance with our Gold Jewelry Collection.
//                     Each piece in this collection is meticulously crafted from the finest gold, offering a timeless appeal and unmatched quality.
//                     From delicate necklaces and chic earrings to stunning rings and sophisticated bracelets, our collection embodies luxury
//                     and refinement. Perfect for those who appreciate classic beauty and contemporary design,
//                     these pieces are sure to become treasured staples in your jewelry wardrobe.
//                 </p>

//                 <div className='prod_filter'>
//                     <p style={{ color: 'grey' }}>SORT BY:</p>
//                     <div style={{ position: 'relative' }}>
//                         <p onClick={toggleCategoryPopup} style={{ cursor: 'pointer' }}>Category</p>
//                         {showCategoryPopup && (
//                             <div className='filterPopups'>
//                                 {/* Category Filter Options */}
//                                 <div>
//                                     <p><strong>Men</strong></p>
//                                     <hr />
//                                     <p>Chains</p>
//                                     <p>Bracelets</p>
//                                     <p>Rings</p>
//                                     <p>Kappu</p>
//                                     <p>Watch</p>
//                                     <p>Pendant</p>
//                                 </div>
//                                 <div>
//                                     <p><strong>Women</strong></p>
//                                     <hr />
//                                     <p>Chains</p>
//                                     <p>Bracelets</p>
//                                     <p>Rings</p>
//                                     <p>Necklace</p>
//                                     <p>Mangalsutra</p>
//                                     <p>Pendant</p>
//                                     <p>Mattal</p>
//                                     <p>Nosepin</p>
//                                     <p>Neethichutti</p>
//                                     <p>Earings</p>
//                                 </div>
//                                 <div>
//                                     <p><strong>Kids</strong></p>
//                                     <hr />
//                                     <p>Mattal</p>
//                                     <p>Nosepin</p>
//                                     <p>Nethichutti</p>
//                                     <p>Earings</p>
//                                     <p>Chains</p>
//                                     <p>Bracelets</p>
//                                 </div>
//                                 <div>
//                                     <p><strong>Others</strong></p>
//                                     <hr />
//                                     <p>Collections</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <div style={{ position: 'relative' }}>
//                         <p onClick={toggleWeightPopup} style={{ cursor: 'pointer' }}>Weight Range</p>
//                         {showWeightPopup && (
//                             <div className='filterWeightPopups'>
//                                 {weightRangeOptions.map((range) => (
//                                     <div key={range}>
//                                         <input
//                                             type="checkbox"
//                                             id={`weight-${range}`}
//                                             value={range}
//                                             checked={selectedWeightRanges.includes(range)}
//                                             onChange={handleWeightChange}
//                                         />
//                                         <label htmlFor={`weight-${range}`} style={{ cursor: 'pointer' }}>{`Up to ${range} grams`}</label>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     <div style={{ position: 'relative' }}>
//                         <p onClick={togglePricePopup} style={{ cursor: 'pointer' }}>Price</p>
//                         {showPricePopup && (
//                             <div className='filterPricePopups'>
//                                 {priceRangeOptions.map((range) => (
//                                     <div key={range}>
//                                         <input
//                                             type="checkbox"
//                                             id={`price-${range}`}
//                                             value={range}
//                                             checked={selectedPriceRanges.includes(range)}
//                                             onChange={handlePriceChange}
//                                         />
//                                         <label htmlFor={`price-${range}`} style={{ cursor: 'pointer' }}>{`Up to ₹${range}`}</label>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     <button onClick={filterItems}>FILTER</button>
//                 </div>
//             </div>
//             <hr style={{ maxWidth: 1000, marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }} />

//             <div className='prod_display'>
//                 {filteredItems.map((item) => (
//                     <ItemList key={item.id} item={item} rate={goldPrice} />
//                 ))}
//             </div>

//             <Footer />
//         </>
//     );
// }

// export default Gold;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ItemList from './components/ItemList';

const Gold = () => {
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

    useEffect(() => {
        async function fetchData() {
            try {
                const today = new Date().toISOString().slice(0, 10);
                const [rateResponse, itemsResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/gr/${today}`),
                    axios.get('http://localhost:5000/getproduct/')
                ]);
                const { gold_rate, silver_rate } = rateResponse.data;
                setGoldPrice(gold_rate);
                setSilverPrice(silver_rate);
                const items = itemsResponse.data;
                setInitialItems(items);
                setFilteredItems(items);
                extractCategories(items);
                generateRangeOptions(items, gold_rate);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
                setError("Failed to fetch data. Please try again later.");
            }
        }
        fetchData();
    }, []);

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

    useEffect(() => {
        filterItems();
    }, [selectedCategories, selectedWeightRanges, selectedPriceRanges]);

    return (
        <>
            <NavBar />

            <div className='jewelHeader'>
                <h1 style={{ textAlign: 'center', color: '#C18843' }}>GOLD</h1>
                <img src='https://t4.ftcdn.net/jpg/05/27/71/81/360_F_527718147_x7XDK929xZnZqjgh0oPYz7xK0EvtnlIF.jpg' />
                <p style={{ textAlign: 'center', maxWidth: '1200px', marginTop: '20px' }}>
                    Discover the epitome of elegance with our Gold Jewelry Collection.
                    Each piece in this collection is meticulously crafted from the finest gold, offering a timeless appeal and unmatched quality.
                    From delicate necklaces and chic earrings to stunning rings and sophisticated bracelets, our collection embodies luxury
                    and refinement. Perfect for those who appreciate classic beauty and contemporary design,
                    these pieces are sure to become treasured staples in your jewelry wardrobe.
                </p>

                <div className='prod_filter'>
                    <p style={{ color: 'grey' }}>SORT BY:</p>
                    <div style={{ position: 'relative' }}>
                        <p onClick={toggleCategoryPopup} style={{ cursor: 'pointer' }}>Category</p>
                        {showCategoryPopup && (
                            <div className='filterPopups'>
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
                        <p onClick={toggleWeightPopup} style={{ cursor: 'pointer' }}>Weight Range</p>
                        {showWeightPopup && (
                            <div className='filterWeightPopups'>
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
                        <p onClick={togglePricePopup} style={{ cursor: 'pointer' }}>Price</p>
                        {showPricePopup && (
                            <div className='filterPricePopups'>
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
                    <button onClick={filterItems}>FILTER</button>
                </div>
            </div>
            <hr style={{ maxWidth: 1000, marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }} />

            <div className='prod_display'>
                {filteredItems.map((item) => (
                    <ItemList key={item.id} item={item} rate={goldPrice} />
                ))}
            </div>

            <Footer />
        </>
    );
}

export default Gold;

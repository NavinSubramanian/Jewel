import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(() => {
        // Load user from cookies if available
        if (cookies.user) {
            setUser(cookies.user);
        }
    }, [cookies.user]);

    const loginUser = async (userData) => {
        setUser(userData);
        setCookie('user', userData, { path: '/' });

        // Fetch user details from the backend to get favourites
        const response = await axios.get(`https://www.geethajewellers.in/api/user/${userData.email}`);
        setUser(response.data);
        setCookie('user', response.data, { path: '/' });
    };

    const logoutUser = () => {
        setUser(null);
        removeCookie('user', { path: '/' });
    };

    const addToFavourites = async (productId) => {
        console.log(user)
        if (user) {
            await axios.post('https://www.geethajewellers.in/api/add-favourite', { email: user.email, productId });
            const updatedUser = { ...user, favourites: [...user.favourites, productId] };
            setUser(updatedUser);
            setCookie('user', updatedUser, { path: '/' });
        }
    };

    const removeFromFavourites = async (productId) => {
        if (user) {
            await axios.post('https://www.geethajewellers.in/api/remove-favourite', { email: user.email, productId });
            const updatedUser = { ...user, favourites: user.favourites.filter(id => id !== productId) };
            setUser(updatedUser);
            setCookie('user', updatedUser, { path: '/' });
        }
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, addToFavourites, removeFromFavourites }}>
            {children}
        </UserContext.Provider>
    );
};

import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/auth/validate-token`;

export const validateToken = async (token) => {
    try {
        const response = await axios.post(
        API,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data; 
    } catch (error) {
        return null; 
    }
};
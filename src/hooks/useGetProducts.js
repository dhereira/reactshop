import React, { useEffect, useState } from "react";
import axios from 'axios';

const useGetProducts = (API) => {
    const [products, setProducts] = useState([]);

	React.useEffect(() => {
        async function fetchData() {
		const response = await axios(API);
		setProducts(response.data);
		} 
		fetchData();
	},[] );
    return products;
};

export default useGetProducts;
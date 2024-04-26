import React, { useState, useEffect } from 'react';

import PlaceholderImage from './../images/placeholder.svg';
// Components
import SearchBar from '../components/SearchBar';
import StockChart from '../components/StockChart';

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);

    const fetchStock = () => {
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchInput}&outputsize=compact&apikey=undefined`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                for (var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                }
                setStockChartXValues(stockChartXValuesFunction);
                setStockChartYValues(stockChartYValuesFunction);
            });
    };

    useEffect(() => {
        fetchStock();
    }, [searchInput, fetchStock]);

    

    const handleSearchStock = (e) => {
        setSearchInput(document.getElementById('searchInput').value);
        e.preventDefault();
    }

    return (
        <main style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', height: '100vh' }}>
            <SearchBar
                searchInput={searchInput}
                handleSearchStock={handleSearchStock}
                fetchStock={fetchStock}
            />
            {!searchInput ? (
                <img id="placeholder" src={PlaceholderImage} alt="placeholder" />
            ) : <StockChart searchInput={searchInput} stockChartXValues={stockChartXValues} stockChartYValues={stockChartYValues} />} 
        </main>
    );

};

export default Home;
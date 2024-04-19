import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { useSearchInputContext } from '../SearchInputProvider';

import SearchLogo from '../images/search.svg';
import { Content } from '../components/SearchBar/SearchBar.styles';

// const proxyUrl = "https://fast-dawn-89938.herokuapp.com/";
// const stonksUrl = `https://api.codetabs.com/v1/proxy?quest=https://query1.finance.yahoo.com/v8/finance/chart/GME`; //SBIN.NS
// const stonksUrl = `${proxyUrl}/https://query1.finance.yahoo.com/v8/finance/chart/GME`; //SBIN.NS

async function fetchStockData(searchInput) {
  try {
    const stonksUrl = `https://api.codetabs.com/v1/proxy?quest=https://query1.finance.yahoo.com/v8/finance/chart/${searchInput}`; //SBIN.NS
    const response = await fetch(stonksUrl, {
      headers: {
        'User-Agent': 'curl/7.68.0\r\n'
      }
    });
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
}

const directionEmojis = {
  up: '🚀',
  down: '💩',
  '': '',
};

const chart = {
  options: {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: false
      }
    }
  },
};

const round = (number) => {
  return number ? +(number.toFixed(2)) : null;
};


function LiveStock() {
  const [stockInfo, setStockInfo] = useState({ price: -1, prevPrice: -1, priceTime: null });
  const [series, setSeries] = useState([{
    data: []
  }]);
  const { searchInput, setSearchInput } = useSearchInputContext();


  useEffect(() => {
    let timeoutId;
    const getLatestPrice = async () => {
      try {
        const data = await fetchStockData(searchInput);
        const gme = data.chart.result[0];
        console.log(gme)
        if (gme) {
          setStockInfo(prevInfo => ({
            prevPrice: prevInfo.price,
            price: gme.meta.regularMarketPrice.toFixed(2),
            priceTime: new Date(gme.meta.regularMarketTime * 1000)
          }));
          const quote = gme.indicators.quote[0];
        const prices = gme.timestamp.map((timestamp, index) => ({
          x: new Date(timestamp * 1000),
          y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)
        }));
          setSeries([{
            data: prices,
          }]);
          
        } else {
          console.error("No data available for GME");
        }
      } catch (error) {
        console.error("Error getting latest price:", error);
      }
      timeoutId = setTimeout(getLatestPrice, 10000); // Fetch data every 10 seconds
    };
    console.log(stockInfo.price);
    getLatestPrice();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [stockInfo.price,searchInput]);

  // useEffect(() => {
  //   getLatestPrice;
  // }, [searchInput]);



  const handleSearchStock = (e) => {
    setSearchInput(document.getElementById('searchInput').value);
    e.preventDefault();
  }



  const { price, prevPrice, priceTime } = stockInfo;
  const direction = useMemo(() => prevPrice < price ? 'up' : prevPrice > price ? 'down' : '', [prevPrice, price]);
  return (
    <div>
      <div className="ticker">
      
            <Content>
            <form onSubmit={(e) => handleSearchStock(e)}>
                <input id='searchInput' type="text" placeholder="Enter a symbol" />
                <button id='search-button' type="submit">
                    <img id='search-logo' src={SearchLogo} alt="search-icon" />
                </button>
            </form>
        </Content>
      </div>
      <div className={['price', direction].join(' ')}>
        ${price} {directionEmojis[direction]}
      </div>
      <br />
      
      <div className="price-time">
        {priceTime && priceTime.toLocaleTimeString()}
      </div>
      <Chart options={chart.options} series={series} type="candlestick" width="100%" height={320} />
    </div>
  );
}

export default LiveStock;

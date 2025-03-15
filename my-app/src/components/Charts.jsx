import { useState ,useEffect} from "react";
import React from "react";
function Charts() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        .then((response) => response.json())
        .then((data) => setData(data));
    }, []);
    return (
        <div>
        <h1>Charts</h1>
        <ul>
            {data.map((item) => (
            <li key={item.id}>
                {item.name} {item.current_price}
            </li>
            ))}
        </ul>
        </div>
    );
    }
    export default Charts;
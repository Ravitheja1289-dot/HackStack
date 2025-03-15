import React, { useEffect, useRef } from "react";
import "./Charts.css"; // Import Dark Mode CSS

const Charts = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Clear previous script
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "700",
        symbol: "NASDAQ:AAPL",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark", // Set to dark mode
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_top_toolbar: false,
        save_image: false,
        allow_symbol_change: true,
      });
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
      <div ref={containerRef} className="tradingview-widget-container"></div>
  );
};

export default Charts;

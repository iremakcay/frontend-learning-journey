import React, { Component } from "react";
import upward from "./upward-trend-flat.png";
import downward from "./downward-trend-flat.png";
import "./App.css";
import CompanyStats from "./CompanyStats/CompanyStats.js";
import ChartComponent from "./Chart/Chart.js";

export default class App extends Component {
  state = {
    stocks: [],
    chartData: {
      prices: [],
      labels: []
    }
  };
  componentDidMount = () => {
    const weatherURL = `https://www.worldtradingdata.com/api/v1/stock?symbol=BIMAS.IS,CRFSA.IS,SOKM.IS,MGROS.IS&api_token=PERSONAL-KEY`;
    //PERSONAL-KEY needs to be changed with personal key
    //Keys can be found from
    //https://www.worldtradingdata.com/documentation#introduction

    fetch(weatherURL)
      .then(res => res.json())
      .then(response => {
        const stocksArray = response.data;
        const prices = [];
        const labels = [];
        const stocks = [];
        for (var i = 0; i < stocksArray.length; i++) {
          const currentStock = stocksArray[i];

          stocks.push({
            name: currentStock.name,
            price: {
              amount: currentStock.price,
              currency: currentStock.currency
            },
            change: {
              isDecreased: currentStock.day_change.includes("-"),
              value: currentStock.day_change,
              pct: currentStock.change_pct
            },
            image: {
              src: currentStock.day_change.includes("-") ? downward : upward,
              color: currentStock.day_change.includes("-") ? "red" : "green"
            }
          });
          prices.push(currentStock.price);
          labels.push(currentStock.name);
        }

        this.setState(
          {
            stocks,
            chartData: {
              labels,
              prices
            }
          },
          () => {
            console.log(this.state);
          }
        );
      });
  };
  render() {
    const { stocks, chartData } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {stocks.map((stock, index) => (
            <CompanyStats key={index} stock={stock} />
          ))}
          <ChartComponent labels={chartData.labels} prices={chartData.prices} />
        </header>
      </div>
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CompanyStats.css";

const CompanyStats = ({ stock }) => (
  <div className="company-stats-container__item" key={stock.price.currency}>
    <ul className="company-stats">
      <li className="company-stats__name">{stock.name}</li>
      <li className="company-stats__price">{stock.price.amount}</li>
      <div className="company-stats_pct">
        <img src={stock.image.src} className="company-stats__icon" />
        <li
          className="company-stats__change"
          style={{ color: stock.image.color }}
        >
          {`${stock.change.value} ${stock.price.currency} ${stock.change.pct}%`}
        </li>
      </div>
    </ul>
  </div>
);

CompanyStats.propTypes = {
  stock: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  handleQuoteChange: PropTypes.func.isRequired
};
export default CompanyStats;

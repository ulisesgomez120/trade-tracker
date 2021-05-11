// import { useEffect } from "react";
// import styled from "styled-components";
// import { Button, TextField } from "@material-ui/core";

import axios from "axios";
const GoodTrade = ({ tradeData, setTradeData }) => {
  const createTrade = async () => {
    axios
      .post("/.netlify/functions/createTrade", tradeData)
      .then(({ data }) => {
        console.log("success");
      })
      .catch((error) => {
        console.error("Error: catch", error);
      });
  };
  const updateTradeData = (event) => {
    if (
      event.target.id === "shares_bought" ||
      event.target.id === "shares_sold"
    ) {
      setTradeData((s) => {
        return {
          ...s,
          ...{ [event.target.id]: parseFloat(event.target.value) },
        };
      });
    } else {
      setTradeData((s) => {
        return {
          ...s,
          ...{ [event.target.id]: event.target.value },
        };
      });
    }
  };
  return (
    <article>
      <h2>if good then ... 8.5+</h2>
      <p>Ticker</p>
      <input
        id='ticker'
        type='text'
        style={{ textTransform: "uppercase" }}
        onChange={updateTradeData}
        value={tradeData.ticker}
      />
      <p>asset name</p>
      <input
        id='name'
        type='text'
        style={{ textTransform: "capitalize" }}
        onChange={updateTradeData}
        value={tradeData.name}
      />
      <p>platform</p>
      <input
        id='platform'
        type='text'
        onChange={updateTradeData}
        value={tradeData.platform}
      />
      <p>asset type</p>
      <input
        id='asset_type'
        type='text'
        onChange={updateTradeData}
        value={tradeData.asset_type}
      />
      <p>Shares to open</p>
      {tradeData.action === "Short" ? (
        <input
          id='shares_sold'
          type='number'
          onChange={updateTradeData}
          value={tradeData.shares_sold}
        />
      ) : (
        <input
          id='shares_bought'
          type='number'
          onChange={updateTradeData}
          value={tradeData.shares_bought}
        />
      )}

      <p>Notes</p>
      <input
        id='notes'
        type='text'
        onChange={updateTradeData}
        value={tradeData.notes}
      />
      <button
        onClick={() => {
          setTradeData((s) => {
            return { ...s, ...{ date_purchased: new Date().toISOString() } };
          });
        }}>
        date{" "}
      </button>
      <button
        onClick={() => {
          createTrade();
        }}>
        create trade
      </button>
    </article>
  );
};

export default GoodTrade;

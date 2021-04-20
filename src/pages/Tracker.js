import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { addRow } from "../util/sheets";
import styled from "styled-components";
import { Button } from "@material-ui/core";
const Tracker = () => {
  const [calcData, setCalcData] = useState({
    htfDistalSupply: 0,
    htfDistalDemand: 0,
    ltfDistal: 0,
    ltfProximal: 0,
    price: 0,
  });
  const [curveLocation, setCurveLocation] = useState("");
  const [risk, setRisk] = useState(0);
  const [tradeData, setTradeData] = useState({
    action: "Long",
    basis: "",
    ticker: "",
    date_purchased: "",
    name: "",
    platform: "",
    asset_type: "",
    status: "Open",
    trend: "Up",
    atr: 0,
    stop_loss: 0,
    oe_score: 0,
    shares: 0,
    notes: "",
  });
  const [oddEnhancer, setOddEnhancer] = useState({
    strength: 0,
    time: 0,
    fresh: 0,
    curve: 0,
    profit: 0,
    trend: 0,
  });
  const [accountDetails, setAccountDetails] = useState({});
  // const calcInitialOE = () => {
  //   if (tradeData.action === "Long") {
  //     curveLocation === "Low"
  //       ? setOddEnhancer((s) => {
  //           return { ...s, ...{ curve: 2 } };
  //         })
  //       : curveLocation === "Middle"
  //       ? setOddEnhancer((s) => {
  //           return { ...s, ...{ curve: 1 } };
  //         })
  //       : setOddEnhancer((s) => {
  //           return { ...s, ...{ curve: 0 } };
  //         });
  //     tradeData.trend === "Up"
  //       ? setOddEnhancer((s) => {
  //           return { ...s, ...{ trend: 1 } };
  //         })
  //       : tradeData.trend === "Side"
  //       ? setOddEnhancer((s) => {
  //           return { ...s, ...{ trend: 0.5 } };
  //         })
  //       : setOddEnhancer((s) => {
  //           return { ...s, ...{ trend: 0 } };
  //         });
  //   } else {
  //     curveLocation === "Low"
  //       ? setOddEnhancer((s) => {
  //           return { ...s, ...{ curve: 0 } };
  //         })
  //       : curveLocation === "Middle"
  //       ? setOddEnhancer((s) => {
  //           return { ...s, ...{ curve: 1 } };
  //         })
  //       : setOddEnhancer((s) => {
  //           return { ...s, ...{ curve: 2 } };
  //         });
  //     tradeData.trend === "Up"
  //       ? setOddEnhancer((s) => {
  //           return { ...s, ...{ trend: 0 } };
  //         })
  //       : tradeData.trend === "Side"
  //       ? setOddEnhancer((s) => {
  //           return { ...s, ...{ trend: 0.5 } };
  //         })
  //       : setOddEnhancer((s) => {
  //           return { ...s, ...{ trend: 1 } };
  //         });
  //   }
  // };
  const getCurveDivisions = useCallback(() => {
    let iterator = parseFloat(
      parseFloat(
        (calcData.htfDistalSupply - calcData.htfDistalDemand) / 3
      ).toFixed(2)
    );
    let tempDevisions = [];
    tempDevisions.push(
      parseFloat(parseFloat(calcData.htfDistalDemand).toFixed(2)) + iterator
    );
    tempDevisions.push(tempDevisions[0] + iterator);
    return tempDevisions;
  }, [calcData.htfDistalDemand, calcData.htfDistalSupply]);
  const createTrade = async () => {
    axios
      .post("/.netlify/functions/createTrade", tradeData)
      .then(({ data }) => {
        console.log(data);
        addRow(data.createTrade);
        // window.localStorage.setItem(
        //   "",
        //   JSON.stringify(data.userByEmail.accountDetails)
        // );
      })
      .catch((error) => {
        console.error("Error: catch", error);
      });
  };
  const updateHTF = (event) => {
    switch (event.currentTarget.id) {
      case "distal-htf-supply":
        setCalcData({
          ...calcData,
          ...{ htfDistalSupply: event.currentTarget.valueAsNumber },
        });
        break;
      case "distal-htf-demand":
        setCalcData({
          ...calcData,
          ...{ htfDistalDemand: event.currentTarget.valueAsNumber },
        });
        break;
      case "price":
        setCalcData({
          ...calcData,
          ...{ price: event.currentTarget.valueAsNumber },
        });
        break;
      default:
        console.log("default htf");
    }
  };
  const updateTrend = (event) => {
    setTradeData({
      ...tradeData,
      ...{ trend: event.currentTarget.value },
    });
  };

  const updateAction = (event) => {
    setTradeData({
      ...tradeData,
      ...{ action: event.currentTarget.value },
    });
  };
  const updateAtr = (event) => {
    setTradeData({
      ...tradeData,
      ...{
        atr: parseFloat(
          parseFloat(event.currentTarget.valueAsNumber).toFixed(2)
        ),
      },
    });
  };
  const updateLTF = (event) => {
    switch (event.currentTarget.id) {
      case "proximal-ltf-entry":
        setCalcData({
          ...calcData,
          ...{ ltfProximal: event.currentTarget.valueAsNumber },
        });
        setTradeData({
          ...tradeData,
          ...{ basis: parseFloat(event.currentTarget.valueAsNumber) },
        });
        break;
      case "distal-ltf-entry":
        setCalcData({
          ...calcData,
          ...{ ltfDistal: event.currentTarget.valueAsNumber },
        });
        break;
      default:
        console.log("default ltf");
    }
  };
  const updateOddEnhancer = (event) => {
    switch (event.currentTarget.id) {
      case "oe-strength":
        setOddEnhancer({
          ...oddEnhancer,
          ...{ strength: event.currentTarget.valueAsNumber },
        });
        break;
      case "oe-time":
        setOddEnhancer({
          ...oddEnhancer,
          ...{ time: event.currentTarget.valueAsNumber },
        });
        break;
      case "oe-fresh":
        setOddEnhancer({
          ...oddEnhancer,
          ...{ fresh: event.currentTarget.valueAsNumber },
        });
        break;
      case "oe-curve":
        setOddEnhancer({
          ...oddEnhancer,
          ...{ curve: event.currentTarget.valueAsNumber },
        });
        break;
      case "oe-trend":
        setOddEnhancer({
          ...oddEnhancer,
          ...{ trend: event.currentTarget.valueAsNumber },
        });
        break;
      case "oe-profit":
        setOddEnhancer({
          ...oddEnhancer,
          ...{ profit: event.currentTarget.valueAsNumber },
        });
        break;
      default:
        console.log("default oe");
    }
  };
  const updateTradeData = (event) => {
    switch (event.currentTarget.id) {
      case "ticker":
        setTradeData({
          ...tradeData,
          ...{ ticker: event.currentTarget.value },
        });
        break;
      case "asset-type":
        setTradeData({
          ...tradeData,
          ...{ asset_type: event.currentTarget.value },
        });
        break;
      case "asset-name":
        setTradeData({
          ...tradeData,
          ...{ name: event.currentTarget.value },
        });
        break;
      case "platform":
        setTradeData({
          ...tradeData,
          ...{ platform: event.currentTarget.value },
        });
        break;
      case "notes":
        setTradeData({
          ...tradeData,
          ...{ notes: event.currentTarget.value },
        });
        break;
      default:
        console.log("default updateTrade");
    }
  };
  const createExits = () => {
    if (tradeData.action === "Long") {
      let exit5x = parseFloat(
        (risk * 5 + calcData.ltfProximal).toFixed(2)
      ).toFixed(2);
      let exit3x = parseFloat(
        (risk * 3 + calcData.ltfProximal).toFixed(2)
      ).toFixed(2);

      return (
        <ExitContainer>
          <div className='exitCard'>
            <h4>5:1</h4>
            <h2>{exit5x}</h2>
            <h4>Stop Loss</h4>
            <h2>{tradeData.stop_loss.toFixed(2)}</h2>
            <h4>Shares</h4>
            <h2>{Math.floor(tradeData.shares).toFixed(0)}</h2>
          </div>
          <div className='exitCard'>
            <h4>3:1</h4>
            <h2>{exit3x}</h2>
            <h4>Stop Loss</h4>
            <h2>{tradeData.stop_loss.toFixed(2)}</h2>
            <h4>Shares</h4>
            <h2>{Math.floor(tradeData.shares).toFixed(0)}</h2>
          </div>
        </ExitContainer>
      );
    } else {
      let exit5x = parseFloat(
        (risk * 5 - calcData.ltfProximal).toFixed(2)
      ).toFixed(2);
      let exit3x = parseFloat(
        (risk * 3 - calcData.ltfProximal).toFixed(2)
      ).toFixed(2);

      return (
        <ExitContainer>
          <div className='exitCard'>
            <h4>5:1</h4>
            <h2>{exit5x}</h2>
            <h4>Stop Loss</h4>
            <h2>{tradeData.stop_loss.toFixed(2)}</h2>
            <h4>Shares</h4>
            <h2>{Math.floor(tradeData.shares).toFixed(0)}</h2>
          </div>
          <div className='exitCard'>
            <h4>3:1</h4>
            <h2>{exit3x}</h2>
            <h4>Stop Loss</h4>
            <h2>{tradeData.stop_loss.toFixed(2)}</h2>
            <h4>Shares</h4>
            <h2>{Math.floor(tradeData.shares).toFixed(0)}</h2>
          </div>
        </ExitContainer>
      );
    }
  };
  useEffect(() => {
    let account = window.localStorage.getItem("accountDetails");
    if (account) {
      setAccountDetails(JSON.parse(account));
    } else {
      axios
        .post("/.netlify/functions/getAccount")
        .then(({ data }) => {
          console.log(data);
          window.localStorage.setItem(
            "accountDetails",
            JSON.stringify(data.userByEmail.accountDetails)
          );
        })
        .catch((error) => {
          console.error("Error: catch", error);
        });
    }
  }, []);
  useEffect(() => {
    let score = 0;
    for (var key in oddEnhancer) {
      score += parseFloat(oddEnhancer[key]);
    }
    setTradeData((t) => {
      return { ...t, ...{ oe_score: score } };
    });
  }, [oddEnhancer]);
  useEffect(() => {
    if (calcData.ltfDistal <= 0 && calcData.ltfProximal <= 0) {
      return;
    }
    if (tradeData.action === "Long") {
      let localRisk =
        parseFloat(calcData.ltfProximal.toFixed(2)) -
        (calcData.ltfDistal - parseFloat((tradeData.atr * 0.02).toFixed(2)));

      setTradeData((s) => {
        let stop =
          calcData.ltfDistal - parseFloat((tradeData.atr * 0.02).toFixed(2));
        let shares = (accountDetails.capital * accountDetails.risk) / localRisk;
        return { ...s, ...{ stop_loss: stop, shares: shares } };
      });
      setRisk(localRisk);
    } else {
      let localRisk = parseFloat(
        calcData.ltfDistal +
          parseFloat((tradeData.atr * 0.02).toFixed(2)) -
          calcData.ltfProximal
      );
      setTradeData((s) => {
        let stop =
          calcData.ltfDistal + parseFloat((tradeData.atr * 0.02).toFixed(2));
        let shares = (accountDetails.capital * accountDetails.risk) / localRisk;
        return { ...s, ...{ stop_loss: stop, shares: shares } };
      });
      setRisk(() => localRisk);
    }
  }, [
    calcData,
    accountDetails,
    tradeData.action,
    tradeData.atr,
    getCurveDivisions,
  ]);
  useEffect(() => {
    const price = calcData.price;
    const [a, b] = getCurveDivisions();
    if (price < a) {
      setCurveLocation("Low");
    } else if (price < b) {
      setCurveLocation("Middle");
    } else {
      setCurveLocation("High");
    }
  }, [calcData.price]);
  return (
    <>
      <button
        onClick={() => {
          createTrade();
          // axios
          //   .post("/.netlify/functions/getAccount")
          //   .then(({ data }) => {
          //     console.log(data);
          //     window.localStorage.setItem(
          //       "accountDetails",
          //       JSON.stringify(data.userByEmail.accountDetails)
          //     );
          //   })
          //   .catch((error) => {
          //     console.error("Error: catch", error);
          //   });
        }}>
        user
      </button>
      <Link to='/trades'>Trades</Link>
      <h2>Step 1 & 2</h2>
      <label htmlFor='distal-htf-supply'>Supply</label>
      <input
        id='distal-htf-supply'
        type='number'
        onChange={updateHTF}
        value={calcData.htfDistalSupply}
      />
      <label htmlFor='distal-htf-demand'>Demand</label>
      <input
        id='distal-htf-demand'
        type='number'
        onChange={updateHTF}
        value={calcData.htfDistalDemand}
      />
      <label htmlFor='price'>Current Price</label>
      <input
        id='price'
        type='number'
        onChange={updateHTF}
        value={calcData.price}
      />
      {curveLocation}
      <p>ITF trend radio buttons</p>
      <RadioContainer>
        <div className='card'>
          <label htmlFor='up'>
            <input
              id='up'
              className='radio'
              type='radio'
              value='Up'
              onChange={updateTrend}
              checked={tradeData.trend === "Up"}
              name='trend'
            />
            <p>Up</p>
          </label>
        </div>

        <div className='card'>
          <label htmlFor='side'>
            <input
              id='side'
              className='radio'
              type='radio'
              value='Side'
              onChange={updateTrend}
              checked={tradeData.trend === "Side"}
              name='trend'
            />
            <p>Side</p>
          </label>
        </div>
        <div className='card'>
          <label htmlFor='down'>
            <input
              id='down'
              className='radio'
              type='radio'
              value='Down'
              onChange={updateTrend}
              checked={tradeData.trend === "Down"}
              name='trend'
            />
            <p>Down</p>
          </label>
        </div>
      </RadioContainer>
      <Link to='/update-account' className='nav-btn'>
        Edit Defaults
      </Link>
      <article>
        <h2>LTF zones</h2>
        <p>Action buy/sell</p>
        <RadioContainer>
          <div className='card'>
            <label htmlFor='long'>
              <input
                id='long'
                type='radio'
                className='radio'
                onChange={updateAction}
                value='Long'
                checked={tradeData.action === "Long"}
                name='action'
              />
              <p>Long</p>
            </label>
          </div>
          <div className='card'>
            <label htmlFor='short'>
              <input
                id='short'
                type='radio'
                className='radio'
                value='Short'
                checked={tradeData.action === "Short"}
                onChange={updateAction}
                name='action'
              />
              <p>Short</p>
            </label>
          </div>
        </RadioContainer>
        <label htmlFor='atr-daily'>ATR Daily</label>
        <input
          id='atr-daily'
          type='number'
          onChange={updateAtr}
          value={calcData.atr}
        />
        <p>
          Entry distal/ proximal, produces two exit points with 5/1 and 3/1
          reward/risk *calcs distal +/- 2% of daily atr
        </p>
        <label htmlFor='proximal-ltf-entry'>Proximal</label>
        <input
          id='proximal-ltf-entry'
          type='number'
          onChange={updateLTF}
          value={calcData.ltfProximal}></input>
        <label htmlFor='distal-ltf-entry'>Distal</label>
        <input
          id='distal-ltf-entry'
          type='number'
          onChange={updateLTF}
          value={calcData.ltfDistal}></input>

        {tradeData.stop_loss > 0 ? createExits() : null}
      </article>

      <article>
        <h2>Odd enhancers</h2>

        {tradeData.oe_score}
        <p>Strength 2</p>
        <input
          id='oe-strength'
          type='number'
          max='2'
          onChange={updateOddEnhancer}
          min='0'
          value={oddEnhancer.strength}
        />
        <p>time 1</p>
        <input
          id='oe-time'
          type='number'
          max='1'
          min='0'
          onChange={updateOddEnhancer}
          value={oddEnhancer.time}
        />
        <p>fresh 2</p>
        <input
          id='oe-fresh'
          type='number'
          max='2'
          min='0'
          onChange={updateOddEnhancer}
          value={oddEnhancer.fresh}
        />
        <p>curve 2</p>
        <input
          id='oe-curve'
          type='number'
          max='2'
          min='0'
          onChange={updateOddEnhancer}
          value={oddEnhancer.curve}
        />
        <p>profit zone 2</p>
        <input
          id='oe-profit'
          type='number'
          max='2'
          min='0'
          onChange={updateOddEnhancer}
          value={oddEnhancer.profit}
        />
        <p>trend 1</p>
        <input
          id='oe-trend'
          type='number'
          max='1'
          min='0'
          onChange={updateOddEnhancer}
          value={oddEnhancer.trend}
        />
        <h2>if good then ... 8.5+</h2>
        <p>Ticker</p>
        <input
          id='ticker'
          type='text'
          onChange={updateTradeData}
          value={tradeData.ticker}
        />
        <p>asset name</p>
        <input
          id='asset-name'
          type='text'
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
          id='asset-type'
          type='text'
          onChange={updateTradeData}
          value={tradeData.asset_type}
        />
        <p>Notes</p>
        <input
          id='notes'
          type='text'
          onChange={updateTradeData}
          value={tradeData.notes}
        />
        <button
          onClick={() =>
            setTradeData({
              ...tradeData,
              ...{ date_purchased: new Date().toISOString() },
            })
          }>
          date{" "}
        </button>
      </article>
    </>
  );
};

export default Tracker;

const RadioContainer = styled.div`
  display: flex;
  max-width: 666px;
  .card {
    background-color: steelblue;
    .radio {
      display: none;
    }
    p {
      padding: 30px;
    }
    .radio:checked + p {
      border: 2px solid red;
    }
  }
`;
const ExitContainer = styled.div`
  .exitCard {
  }
`;

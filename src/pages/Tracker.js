import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CurveTrend from "../components/CurveTrend";
import LtfZones from "../components/LtfZones";
import OddEnhancer from "../components/OddEnhancers";
import GoodTrade from "../components/GoodTrade";
import MultiStepForm from "../components/MultiStepForm";
const Tracker = () => {
  const [calcData, setCalcData] = useState({
    htfDistalSupply: "",
    htfDistalDemand: "",
    ltfDistal: "",
    ltfProximal: "",
    price: "",
    shares: "",
    costOfMaxShares: "",
  });
  const [curveLocation, setCurveLocation] = useState("");
  const [risk, setRisk] = useState(0);
  const [step, setStep] = useState(0);
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
    atr: "",
    stop_loss: "",
    oe_score: 0,
    shares_bought: 0,
    shares_sold: 0,
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

  useEffect(() => {
    let account = window.localStorage.getItem("accountDetails");
    if (account) {
      setAccountDetails(JSON.parse(account));
    } else {
      window.localStorage.setItem(
        "accountDetails",
        JSON.stringify({
          capital: 2100,
          risk: 0.005,
          leverage: 1,
          open_positions: 5,
        })
      );
      setAccountDetails({
        capital: 2100,
        risk: 0.005,
        leverage: 1,
        open_positions: 5,
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
      let distalMinusAtr =
        calcData.ltfDistal - parseFloat((tradeData.atr * 0.02).toFixed(2));
      let localRisk =
        parseFloat(calcData.ltfProximal.toFixed(2)) - distalMinusAtr;

      setTradeData((s) => {
        let stop = distalMinusAtr;
        return { ...s, ...{ stop_loss: parseFloat(stop) } };
      });
      setCalcData((s) => {
        let shares = (accountDetails.capital * accountDetails.risk) / localRisk;
        let cost = shares * s.ltfProximal;
        return { ...s, ...{ shares: shares, costOfMaxShares: cost } };
      });
      setRisk(localRisk);
    } else {
      let distalPlusAtr = parseFloat(
        calcData.ltfDistal + parseFloat((tradeData.atr * 0.02).toFixed(2))
      );
      let localRisk = distalPlusAtr - calcData.ltfProximal;

      setTradeData((s) => {
        let stop = distalPlusAtr;
        return { ...s, ...{ stop_loss: parseFloat(stop) } };
      });
      setCalcData((s) => {
        let shares = (accountDetails.capital * accountDetails.risk) / localRisk;
        let cost = shares * s.ltfProximal;
        return { ...s, ...{ shares: shares, costOfMaxShares: cost } };
      });
      setRisk(() => localRisk);
    }
  }, [
    calcData.ltfDistal,
    calcData.ltfProximal,
    accountDetails,
    tradeData.action,
    tradeData.atr,
  ]);
  useEffect(() => {
    const price = calcData.ltfProximal;
    const [a, b] = getCurveDivisions();
    if (price < a) {
      setCurveLocation("Low");
    } else if (price < b) {
      setCurveLocation("Middle");
    } else {
      setCurveLocation("High");
    }
  }, [calcData.ltfProximal, getCurveDivisions]);
  return (
    <Main>
      <Header>
        <Link to='/trades'>Trades</Link>
        {/* <Link to='/update-account' className='nav-btn'>
          Edit Defaults
        </Link> */}
      </Header>
      <MultiStepForm step={step} setStep={setStep}>
        <CurveTrend
          tradeData={tradeData}
          calcData={calcData}
          setTradeData={setTradeData}
          setCalcData={setCalcData}
        />
        <LtfZones
          tradeData={tradeData}
          calcData={calcData}
          setTradeData={setTradeData}
          setCalcData={setCalcData}
          risk={risk}
        />
        <OddEnhancer
          tradeData={tradeData}
          calcData={calcData}
          risk={risk}
          oddEnhancer={oddEnhancer}
          setOddEnhancer={setOddEnhancer}
          curveLocation={curveLocation}
        />
        <GoodTrade tradeData={tradeData} setTradeData={setTradeData} />
      </MultiStepForm>
    </Main>
  );
};

export default Tracker;
const Main = styled.main`
  background-color: #222222;
  height: 100vh;
  color: white;
  .MuiFormControl-root {
    margin: 12px;
  }
  .MuiInputLabel-root {
    color: white;
  }
  .MuiInput-underline:before {
    border-bottom: 1px solid whitesmoke;
  }
  .MuiInputBase-input {
    color: white;
  }
`;
const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 16px 23px;
  a {
    margin-right: 10px;
    text-decoration: none;
    color: #3f51b5;
  }
  a:visited {
    color: #3f51b5;
  }
`;

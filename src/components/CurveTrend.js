import styled from "styled-components";
import { TextField } from "@material-ui/core";
const CurveTrend = ({ tradeData, calcData, setTradeData, setCalcData }) => {
  const updateTrend = (event) => {
    setTradeData((s) => {
      return { ...s, ...{ trend: event.target.value } };
    });
  };
  const updateHTF = (event) => {
    switch (event.target.id) {
      case "distal-htf-supply":
        setCalcData((s) => {
          return {
            ...s,
            ...{ htfDistalSupply: event.target.valueAsNumber },
          };
        });
        break;
      case "distal-htf-demand":
        setCalcData((s) => {
          return {
            ...s,
            ...{ htfDistalDemand: event.target.valueAsNumber },
          };
        });
        break;
      default:
        console.log("default htf");
    }
  };
  return (
    <Article
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 28px",
      }}>
      <div>
        <h4>High Time Frame Zones</h4>
        <TextField
          id='distal-htf-supply'
          InputLabelProps={{ shrink: true }}
          label='Supply Zone'
          type='number'
          placeholder='Supply'
          onChange={updateHTF}
          value={calcData.htfDistalSupply}
        />
        <TextField
          id='distal-htf-demand'
          InputLabelProps={{ shrink: true }}
          label='Demand Zone'
          type='number'
          placeholder='Demand'
          onChange={updateHTF}
          value={calcData.htfDistalDemand}
        />
      </div>
      <div>
        <h4>ITF Trend</h4>
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
      </div>
    </Article>
  );
};
export default CurveTrend;
const Article = styled.article`
  h4 {
    margin-bottom: 12px;
  }
`;
const RadioContainer = styled.div`
  display: flex;
  max-width: 666px;
  .card {
    background-color: #90caf9;
    color: #185486;
    margin: 8px 14px;
    .radio {
      display: none;
    }
    p {
      cursor: pointer;
      padding: 30px;
      width: 110px;
      text-align: center;
    }
    .radio:checked + p {
      background-color: #9348cc;
      color: white;
      font-weight: bold;
    }
  }
`;

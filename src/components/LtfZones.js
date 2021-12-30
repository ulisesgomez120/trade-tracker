import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";

const LtfZones = ({ tradeData, setTradeData, setCalcData, calcData, risk }) => {
  const updateAction = (event) => {
    setTradeData((s) => {
      return {
        ...s,
        ...{ action: event.target.value },
      };
    });
  };
  const updateAtr = (event) => {
    setTradeData((s) => {
      return {
        ...s,
        ...{
          atr: parseFloat(parseFloat(event.target.valueAsNumber).toFixed(2)),
        },
      };
    });
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
            <h3>5:1</h3>
            <div className='grid-cell'>
              <h4>Shares</h4>
              <h2>{Math.floor(calcData.shares).toFixed(0)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Entry</h4>
              <h2>{tradeData.basis}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Exit</h4>
              <h2>{exit5x}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Stop Loss</h4>
              <h2>{tradeData.stop_loss.toFixed(2)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Cost to Enter</h4>
              <h2>{calcData.costOfMaxShares.toFixed(2)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Potential Gain</h4>
              <h2>
                {((exit5x - calcData.ltfProximal) * calcData.shares).toFixed(2)}
              </h2>
            </div>
          </div>
          <div className='exitCard'>
            <h3>3:1</h3>
            <div className='grid-cell'>
              <h4>Shares</h4>
              <h2>{Math.floor(calcData.shares).toFixed(0)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Entry</h4>
              <h2>{tradeData.basis}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Exit</h4>
              <h2>{exit3x}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Stop Loss</h4>
              <h2>{tradeData.stop_loss.toFixed(2)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Cost to Enter</h4>
              <h2>{calcData.costOfMaxShares.toFixed(2)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Potential Gain</h4>
              <h2>
                {((exit3x - calcData.ltfProximal) * calcData.shares).toFixed(2)}
              </h2>
            </div>
          </div>
        </ExitContainer>
      );
    } else {
      let exit5x = parseFloat(
        (calcData.ltfProximal - risk * 5).toFixed(2)
      ).toFixed(2);
      let exit3x = parseFloat(
        (calcData.ltfProximal - risk * 3).toFixed(2)
      ).toFixed(2);

      return (
        <ExitContainer>
          <div className='exitCard'>
            <h3>5:1</h3>
            <div className='grid-cell'>
              <h4>Shares</h4>
              <h2>{Math.floor(calcData.shares).toFixed(0)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Entry</h4>
              <h2>{tradeData.basis}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Exit</h4>
              <h2>{exit5x}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Stop Loss</h4>
              <h2>{tradeData.stop_loss.toFixed(2)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Cost to Enter</h4>
              <h2>{calcData.costOfMaxShares.toFixed(2)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Potential Gain</h4>
              <h2>
                {((calcData.ltfProximal - exit5x) * calcData.shares).toFixed(2)}
              </h2>
            </div>
          </div>
          <div className='exitCard'>
            <h3>3:1</h3>
            <div className='grid-cell'>
              <h4>Shares</h4>
              <h2>{Math.floor(calcData.shares).toFixed(0)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Entry</h4>
              <h2>{tradeData.basis}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Exit</h4>
              <h2>{exit3x}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Stop Loss</h4>
              <h2>{tradeData.stop_loss.toFixed(2)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Cost to Enter</h4>
              <h2>{calcData.costOfMaxShares.toFixed(2)}</h2>
            </div>
            <div className='grid-cell'>
              <h4>Potential Gain</h4>
              <h2>
                {((calcData.ltfProximal - exit3x) * calcData.shares).toFixed(2)}
              </h2>
            </div>
          </div>
        </ExitContainer>
      );
    }
  };
  const updateLTF = (event) => {
    switch (event.target.id) {
      case "proximal-ltf-entry":
        setCalcData({
          ...calcData,
          ...{ ltfProximal: parseFloat(event.target.value) },
        });
        setTradeData({
          ...tradeData,
          ...{ basis: parseFloat(event.target.value) },
        });
        break;
      case "distal-ltf-entry":
        setCalcData({
          ...calcData,
          ...{ ltfDistal: parseFloat(event.target.value) },
        });
        break;
      default:
        console.log("default ltf");
    }
  };
  return (
    <Article>
      <div>
        <h4>Choose Action</h4>
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
        <h4 htmlFor='atr-daily'>ATR Daily</h4>

        <TextField
          id='atr-daily'
          InputLabelProps={{ shrink: true }}
          label='Daily ATR'
          type='number'
          placeholder='ATR'
          onChange={updateAtr}
          value={calcData.atr}
        />

        <h4>LTF Zones</h4>
        <TextField
          id='proximal-ltf-entry'
          InputLabelProps={{ shrink: true }}
          label='Proximal'
          type='number'
          placeholder='Proximal'
          onChange={updateLTF}
          value={calcData.ltfProximal}
        />
        <TextField
          id='distal-ltf-entry'
          InputLabelProps={{ shrink: true }}
          label='Distal'
          type='number'
          placeholder='Distal'
          onChange={updateLTF}
          value={calcData.ltfDistal}
        />
      </div>
      {tradeData.stop_loss > 0 ? createExits() : null}
    </Article>
  );
};
export default LtfZones;
//delete, make component
const RadioContainer = styled.div`
  display: flex;
  max-width: 666px;
  @media (max-width: 480px) {
    flex-direction: column;
  }
  .card {
    background-color: #90caf9;
    color: #185486;
    flex: 1 1 0;
    margin: 8px 14px;
    .radio {
      display: none;
    }
    p {
      cursor: pointer;
      padding: 30px;
      text-align: center;
    }
    .radio:checked + p {
      background-color: #9348cc;
      color: white;
      font-weight: bold;
    }
  }
`;
const Article = styled.article`
  display: flex;
  justify-content: space-between;
  padding: 12px 28px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  h4 {
    margin-bottom: 12px;
    margin-top: 22px;
  }
  h4:nth-of-type(1) {
    margin-top: 0;
  }
`;
const ExitContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 23px;
  .exitCard {
    margin-left: 26px;
    margin-top: 22px;
    padding: 22px 18px;
    ${"" /* box-shadow: 1px 2px 5px 2px rgb(0 0 0 / 10%); */}
    box-shadow: 6px 6px 12px #333333,-6px -6px 12px #111111;
    border-radius: 6px;
    width: 330px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 768px) {
      margin: 18px 0;
    }
  }
  .grid-cell {
    margin: 12px 0;
  }
  h2 {
    margin-left: 5px;
  }
  h3 {
    text-align: center;
    border-bottom: 1px solid #989898;
    padding-bottom: 10px;
    grid-column: 1 / span 2;
  }
  h4 {
    color: #989898;
    margin-top: 17px;
    font-weight: 500;
  }
`;

import { useEffect, useCallback } from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";

const OddEnhancer = ({
  tradeData,
  calcData,
  oddEnhancer,
  setOddEnhancer,
  curveLocation,
  risk,
}) => {
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
  const calcInitialOE = useCallback(() => {
    if (tradeData.action === "Long") {
      curveLocation === "Low"
        ? setOddEnhancer((s) => {
            return { ...s, ...{ curve: 1 } };
          })
        : curveLocation === "Middle"
        ? setOddEnhancer((s) => {
            return { ...s, ...{ curve: 0.5 } };
          })
        : setOddEnhancer((s) => {
            return { ...s, ...{ curve: 0 } };
          });
      tradeData.trend === "Up"
        ? setOddEnhancer((s) => {
            return { ...s, ...{ trend: 2 } };
          })
        : tradeData.trend === "Side"
        ? setOddEnhancer((s) => {
            return { ...s, ...{ trend: 1 } };
          })
        : setOddEnhancer((s) => {
            return { ...s, ...{ trend: 0 } };
          });
    } else {
      curveLocation === "Low"
        ? setOddEnhancer((s) => {
            return { ...s, ...{ curve: 0 } };
          })
        : curveLocation === "Middle"
        ? setOddEnhancer((s) => {
            return { ...s, ...{ curve: 0.5 } };
          })
        : setOddEnhancer((s) => {
            return { ...s, ...{ curve: 1 } };
          });
      tradeData.trend === "Up"
        ? setOddEnhancer((s) => {
            return { ...s, ...{ trend: 0 } };
          })
        : tradeData.trend === "Side"
        ? setOddEnhancer((s) => {
            return { ...s, ...{ trend: 1 } };
          })
        : setOddEnhancer((s) => {
            return { ...s, ...{ trend: 2 } };
          });
    }
  }, [curveLocation, setOddEnhancer, tradeData.action, tradeData.trend]);
  useEffect(() => {
    calcInitialOE();
  }, [calcInitialOE]);
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
  return (
    <Article>
      <div>
        <h4>Odd enhancers</h4>
        <h2>
          SCORE:{" "}
          <span
            style={
              tradeData.oe_score >= 8.5
                ? { color: "mediumspringgreen", fontSize: "1.3em" }
                : tradeData.oe_score >= 7.5 && tradeData.oe_score < 8.5
                ? { color: "yellow", fontSize: "1.3em" }
                : { color: "orangered", fontSize: "1.3em" }
            }>
            {tradeData.oe_score}
          </span>
        </h2>
        <TextField
          id='oe-strength'
          InputLabelProps={{ shrink: true }}
          label='Strength: Max 2'
          type='number'
          fullWidth={true}
          InputProps={{ inputProps: { min: 0, max: 2 } }}
          placeholder='Strength'
          onChange={updateOddEnhancer}
          value={oddEnhancer.strength}
        />
        <TextField
          id='oe-time'
          InputLabelProps={{ shrink: true }}
          label='Time: Max 1'
          fullWidth={true}
          type='number'
          InputProps={{ inputProps: { min: 0, max: 1, step: 0.5 } }}
          placeholder='Time'
          onChange={updateOddEnhancer}
          value={oddEnhancer.time}
        />
        <TextField
          id='oe-fresh'
          InputLabelProps={{ shrink: true }}
          label='Fresh: Max 2'
          fullWidth={true}
          type='number'
          InputProps={{ inputProps: { min: 0, max: 2 } }}
          placeholder='Fresh'
          onChange={updateOddEnhancer}
          value={oddEnhancer.fresh}
        />
        <TextField
          id='oe-profit'
          fullWidth={true}
          InputLabelProps={{ shrink: true }}
          label='Profit: Max 2'
          InputProps={{ inputProps: { min: 0, max: 2 } }}
          type='number'
          placeholder='Profit'
          onChange={updateOddEnhancer}
          value={oddEnhancer.profit}
        />
        <p>Curve: Max 1</p>
        <p>{oddEnhancer.curve}</p>
        {/* <input
        step='.5'
        id='oe-curve'
        type='number'
        max='1'
        min='0'
        onChange={updateOddEnhancer}
        value={oddEnhancer.curve}
      /> */}
        <p>Trend: Max 2</p>
        <p>{oddEnhancer.trend}</p>
        {/* <input
        id='oe-trend'
        type='number'
        max='2'
        min='0'
        onChange={updateOddEnhancer}
        value={oddEnhancer.trend}
      /> */}
      </div>
      <div>{createExits()}</div>
    </Article>
  );
};
export default OddEnhancer;
const Article = styled.article`
  display: flex;
  justify-content: space-between;
  padding: 12px 28px;
  h4 {
    margin-bottom: 12px;
  }
`;
const ExitContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 23px;
  .exitCard {
    margin-left: 26px;
    padding: 22px 18px;
    box-shadow: 1px 2px 5px 2px rgb(0 0 0 / 10%);
    border-radius: 6px;
    width: 330px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .grid-cell {
  }
  h2 {
    margin-left: 5px;
  }
  h3 {
    text-align: center;
    border-bottom: 1px solid #989898;
    padding-bottom: 3px;
    grid-column: 1 / span 2;
  }
  h4 {
    color: #989898;
    margin-top: 17px;
    font-weight: 500;
  }
`;

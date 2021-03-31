import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>Header</div>
      <Switch>
        <Route path='/'>
          <h2>onboard/update</h2>
          <section>
            {/* how to make multi step form  */}
            <article className='form-container'>
              <p>Capital</p>
              <p>Max Risk (.5% of capital default)</p>
              <p>Leverage</p>
              <p># of Open positions</p>
              <button>Submit</button>
            </article>
            <article>
              <h2>Step 1 & 2</h2>
              <p>Current Price</p>
              <p>
                HTF distal lines - psudo: iterator = (supply - demand =range)/
                3, loop log demand += iterator iterator =( 200 - 110 )= 90 / 3 =
                30 demand = (110 + 30) log 140 demand = (140 + 30) log 170
              </p>
              <p>ITF trend radio buttons</p>
              <p>Action buy/sell</p>
              <button>next goes to step 3 ltf zone</button>
            </article>
            <article>
              <h2>LTF zones</h2>
              <p>Ticker</p>
              <p>asset name</p>
              <p>atr daily</p>
              <p>platform</p>
              <p>asset type</p>
              <p>
                Entry distal/ proximal, produces two exit points with 5/1 and
                3/1 reward/risk *calcs distal +/- 2% of daily atr
              </p>
              <button>Submit goes to odd enhancers</button>
            </article>
            <article>
              <h2>Odd enhancers</h2>
              <p>Strength 2</p>
              <p>time 1</p>
              <p>fresh 2</p>
              <p>curve 2</p>
              <p>profit zone 2</p>
              <p>trend 1</p>
              <button>submit returns back to step 1 </button>
            </article>
          </section>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import OnboardingDefaults from "./pages/OnboardingDefaults";
const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const login = async () => {
    const res = await fetch("/api/getUser");
    const data = await res.json();
    console.log(data);
    // window.localStorage.setItem("user", JSON.stringify(data._id));
  };
  return (
    <div>
      <input
        type='email'
        value={loginData.email}
        onChange={(text) => setLoginData((cur) => (cur.email = text))}
      />
      <input
        type='password'
        value={loginData.password}
        onChange={(text) => setLoginData((cur) => (cur.password = text))}
      />
      <button onClick={() => login}>submit</button>
    </div>
  );
};
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/onboarding' component={OnboardingDefaults} />

        <Route path='/tracker'>
          <h2>Step 1 & 2</h2>
          <p>
            HTF distal lines - psudo: iterator = (supply - demand =range)/ 3,
            loop log demand += iterator iterator =( 200 - 110 )= 90 / 3 = 30
            demand = (110 + 30) log 140 demand = (140 + 30) log 170
          </p>
          <label htmlFor='distal-htf-supply'>Supply</label>
          <input id='distal-htf-supply' type='number' value='' />
          <label htmlFor='distal-htf-demand'>Demand</label>
          <input id='distal-htf-demand' type='number' value='' />
          <p>ITF trend radio buttons</p>
          <label htmlFor='up'>Up</label>
          <input id='up' type='radio' value='up' checked name='trend'></input>
          <label htmlFor='side'>Side</label>
          <input id='side' type='radio' value='side' name='trend'></input>
          <label htmlFor='down'>Down</label>
          <input id='down' type='radio' value='down' name='trend'></input>
          <Link to='/' className='nav-btn'>
            Edit Defaults
          </Link>
          <article>
            <h2>LTF zones</h2>
            <p>Action buy/sell</p>
            <label htmlFor='buy'>Buy</label>
            <input
              id='buy'
              type='radio'
              checked
              value='buy'
              name='action'></input>
            <label htmlFor='sell'>Sell</label>
            <input id='sell' type='radio' value='sell' name='action'></input>
            <p>
              Entry distal/ proximal, produces two exit points with 5/1 and 3/1
              reward/risk *calcs distal +/- 2% of daily atr
            </p>
            <label htmlFor='proximal-ltf-entry'>Proximal</label>
            <input id='proximal-ltf-entry' type='number' value=''></input>
            <label htmlFor='distal-ltf-entry'>Distal</label>
            <input id='distal-ltf-entry' type='number' value=''></input>
            <label htmlFor='atr-daily'>ATR Daily</label>
            <input id='atr-daily' type='number' value=''></input>
          </article>

          <article>
            <h2>Odd enhancers</h2>
            <p>Strength 2</p>
            <input id='oe-strength' type='number' max='2' min='0' value='' />
            <p>time 1</p>
            <input id='oe-time' type='number' max='1' min='0' value='' />
            <p>fresh 2</p>
            <input id='oe-fresh' type='number' max='2' min='0' value='' />
            <p>curve 2</p>
            <input id='oe-curve' type='number' max='2' min='0' value='' />
            <p>profit zone 2</p>
            <input id='oe-profit' type='number' max='2' min='0' value='' />
            <p>trend 1</p>
            <input id='oe-trend' type='number' max='1' min='0' value='' />
            <h2>if good then ... 8.5+</h2>
            <p>Ticker</p>
            <input id='ticker' type='text' value='' />
            <p>asset name</p>
            <input id='asset-name' type='text' value='' />
            <p>platform</p>
            <input id='platform' type='text' value='' />
            <p>asset type</p>
            <input id='asset-type' type='text' value='' />
            <button>submit returns back to step 1 </button>
          </article>
        </Route>
        <Route path='/all'></Route>
        <Route path='/trade/:trade_id'></Route>
      </Switch>
    </Router>
  );
}

export default App;

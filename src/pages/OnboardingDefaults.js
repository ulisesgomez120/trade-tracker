import React from "react";
import { Link } from "react-router-dom";

const OnboardingDefaults = () => {
  return (
    <section>
      <input type='text' />
      <input type='email' /> <input type='password' />
      <button onClick={() => console.log("log")}>register</button>
      <h2>onboard/update</h2>
      {/* how to make multi step form  */}
      <form>
        <label htmlFor='capital'>Capital</label>
        <input id='capital' type='number' value='' />
        <label htmlFor='max-risk'>Max Risk (.5% of capital default)</label>
        <input id='max-risk' type='number' value='' />

        <label htmlFor='leverage'>Leverage</label>
        <input id='leverage' type='number' value='' />
        <label htmlFor='positions-open'># of Open positions</label>
        <input id='positions-open' type='number' value='' />
        <input type='submit' title='submit' />
      </form>
      <Link to='/tracker' className='nav-btn'>
        Next
      </Link>
    </section>
  );
};

export default OnboardingDefaults;

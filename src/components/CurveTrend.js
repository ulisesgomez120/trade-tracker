// import React from "react";
// import styled from "styled-components";

// const CurveTrend = ({ state }) => {
//   return (
//     <>
//       <h2>Step 1 & 2</h2>
//       <label htmlFor='distal-htf-supply'>Supply</label>
//       <input
//         id='distal-htf-supply'
//         type='number'
//         onChange={updateHTF}
//         value={calcData.htfDistalSupply}
//       />
//       <label htmlFor='distal-htf-demand'>Demand</label>
//       <input
//         id='distal-htf-demand'
//         type='number'
//         onChange={updateHTF}
//         value={calcData.htfDistalDemand}
//       />
//       <label htmlFor='price'>Current Price</label>
//       <input
//         id='price'
//         type='number'
//         onChange={updateHTF}
//         value={calcData.price}
//       />
//       {curveLocation}
//       <p>ITF trend radio buttons</p>
//       <RadioContainer>
//         <div className='card'>
//           <label htmlFor='up'>
//             <input
//               id='up'
//               className='radio'
//               type='radio'
//               value='Up'
//               onChange={updateTrend}
//               checked={tradeData.trend === "Up"}
//               name='trend'
//             />
//             <p>Up</p>
//           </label>
//         </div>

//         <div className='card'>
//           <label htmlFor='side'>
//             <input
//               id='side'
//               className='radio'
//               type='radio'
//               value='Side'
//               onChange={updateTrend}
//               checked={tradeData.trend === "Side"}
//               name='trend'
//             />
//             <p>Side</p>
//           </label>
//         </div>
//         <div className='card'>
//           <label htmlFor='down'>
//             <input
//               id='down'
//               className='radio'
//               type='radio'
//               value='Down'
//               onChange={updateTrend}
//               checked={tradeData.trend === "Down"}
//               name='trend'
//             />
//             <p>Down</p>
//           </label>
//         </div>
//       </RadioContainer>
//     </>
//   );
// };
// export default CurveTrend;

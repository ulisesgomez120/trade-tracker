const query = require("./utils/query");
const CREATE_ACCOUNT = `
mutation($capital: Float!, $risk: Float!,$leverage: Float!,$open_positions: Int!) {
  createAccountDetails(data: {
      capital: $capital,
      risk: $risk,
      leverage: $leverage,
      open_positions: $open_positions,
    user: {connect: "295141954559148548"}
  }){
      capital
      risk
      leverage
      open_positions
      _id
  }
}
  `;
exports.handler = async (event, context) => {
  console.log("handler");
  const { capital, risk, leverage, open_positions } = JSON.parse(event.body);
  const { data, errors } = await query(GET_USER, {
    capital,
    risk,
    leverage,
    open_positions,
  });
  if (errors) {
    console.log("QUERY");
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

const query = require("./utils/query");
const GET_USER = `
query {
  userByEmail(email:"ulisesgomez120@gmail.com"){
    trades {
      data {
        _id
        ticker
        name
        basis
        sale_price
        date_purchased
        date_sold
        gain_loss
        action
        asset_type
        platform
        status
        atr
        stop_loss
        oe_score
        trend
        notes
        shares_bought
        shares_sold
      }
    }
  }
}
  `;
exports.handler = async (event, context) => {
  const { data, errors } = await query(GET_USER);
  if (errors) {
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

const query = require("./utils/query");
const GET_USER = `
query {
  userByEmail(email:"ulisesgomez120@gmail.com"){
    accountDetails {
      capital
      risk
      leverage
      open_positions
      _id
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

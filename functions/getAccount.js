const query = require("./utils/query");
const GET_ACCOUNT = `
query {
  userByEmail(email:"ulisesgomez120@gmail.com"){
    accountDetails {
      capital
      risk
      open_positions
      leverage
    }
  }
}
  `;
exports.handler = async (event, context) => {
  const { data, errors } = await query(GET_ACCOUNT);
  if (errors) {
    console.log(errors);
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

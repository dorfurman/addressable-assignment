const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY || "",
        },
      }
    );

    // Return the actual data
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (ex) {
    console.error(ex);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
};

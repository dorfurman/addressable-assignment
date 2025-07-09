const { z } = require("zod");
const axios = require("axios");

const API_LATEST_LISTINGS_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const API_CRYPTO_LOGOS_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?aux=logo";

const CryptoParamsSchema = z.object({
  minMarketCap: z.coerce.number().int().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  sortBy: z.enum(["price", "market_cap", "name"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().min(1).optional(),
});

exports.handler = async (event, context) => {
  try {
    const { minMarketCap, maxPrice, sortBy, order, page } = CryptoParamsSchema.parse(event.queryStringParameters || {});
    const cmcParams = transformToCmcParams({ minMarketCap, maxPrice, sortBy, order, page });
    console.log(cmcParams);

    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        params: cmcParams,
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY || "",
        },
      }
    );
    
    const cryptoIds = response.data.data.map(crypto => crypto.id);
    const cryptoLogos = await axios.get(API_CRYPTO_LOGOS_URL, {
      params: {
        id: cryptoIds.join(","),
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY || "",
      },
    });

    const formattedData = response.data.data.map(crypto => ({
      ...crypto,
      logo: cryptoLogos.data.data[crypto.id]?.logo,
    }));

    // Return the actual data
    return {
      statusCode: 200,
      body: JSON.stringify(formattedData),
    };
  } catch (ex) {
    console.error(ex);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
};

function transformToCmcParams(valid) {
  const params = {};
  if (valid.minMarketCap) params.market_cap_min = valid.minMarketCap;
  if (valid.maxPrice) params.price_max = valid.maxPrice;
  if (valid.sortBy) params.sort = valid.sortBy;
  if (valid.order) params.sort_dir = valid.order;
  if (valid.page) params.start = (valid.page - 1) * 10 + 1;

  params.limit = 10;
  return params;
}
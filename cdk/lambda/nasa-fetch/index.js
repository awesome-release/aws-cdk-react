const axios = require("axios");

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

async function main(event) {
  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(err.stack),
    };
  }
}

module.exports = { main };

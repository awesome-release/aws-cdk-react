const axios = require("axios");

const NASA_API_KEY = process.env.NASA_API_KEY;

function getRandomDate(startDate, endDate) {
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  )
    .toISOString()
    .split("T")[0];
}

async function main() {
  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${getRandomDate(
        new Date(2012, 0, 1),
        new Date()
      )}`
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(err.stack),
    };
  }
}

module.exports = { main };

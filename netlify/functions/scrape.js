const axios = require('axios');  // If you're using axios for requests

exports.handler = async function(event, context) {
  const contractAddress = event.queryStringParameters.contractAddress;  // Get the contract address from the query string
  const url = `https://gmgn.ai/sol/token/${contractAddress}`;

  try {
    const response = await axios.get(url);  // Make the HTTP request to fetch the page
    const pageContent = response.data;

    // Extract the data you need (e.g., using regex or DOM parsing)
    const regex = /<div class="css-ljy8g2v">(.*?)<\/div>/gs;
    const match = regex.exec(pageContent);

    const extractedContent = match ? match[1].trim() : 'No additional info found';

    return {
      statusCode: 200,
      body: JSON.stringify({ info: extractedContent }),  // Return the extracted info as JSON
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching or parsing the page.' }),
    };
  }
};

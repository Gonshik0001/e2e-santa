const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const credentials = require('./jira-credentials.json');

const importResultsToJira = async () => {
  const xmlFilePath = path.resolve(__dirname, 'results', 'test-results.xml');
  const xmlData = fs.readFileSync(xmlFilePath, 'utf8');

  const response = await fetch(`${credentials.base_url}/rest/raven/2.0/import/execution`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${credentials.username}:${credentials.api_token}`).toString('base64')}`,
      'Content-Type': 'application/xml',
    },
    body: xmlData,
  });

  if (!response.ok) {
    throw new Error(`Error importing results: ${response.statusText}`);
  }

  const result = await response.json();
  console.log(result);
};

importResultsToJira().catch(console.error);

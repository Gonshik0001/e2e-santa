const JiraClient = require('jira-client');
const fs = require('fs');
const path = require('path');

// Load Jira credentials
const credentials = require('./jira-credentials.json');

const jira = new JiraClient({
  protocol: 'https',
  host: credentials.base_url,
  username: credentials.username,
  password: credentials.api_token,
  apiVersion: '2',
  strictSSL: true
});

const xmlFilePath = path.join(__dirname, 'results', 'test-results.xml');
const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

async function createTestExecution() {
  try {
    const issue = await jira.addNewIssue({
      fields: {
        project: {
          key: 'YOUR_PROJECT_KEY'
        },
        summary: 'Test Execution',
        description: 'Test Execution results',
        issuetype: {
          name: 'Test Execution'
        }
      }
    });
    console.log('Test Execution created: ', issue.key);

    // Attach the XML report
    const attachment = await jira.addAttachmentOnIssue(issue.key, {
      filename: 'test-results.xml',
      mimeType: 'text/xml',
      body: xmlData
    });
    console.log('Attachment added: ', attachment);

  } catch (error) {
    console.error('Error creating Test Execution: ', error);
  }
}

createTestExecution();

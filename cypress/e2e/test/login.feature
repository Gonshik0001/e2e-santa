Feature: User login on santa website

Scenario: User logs in successfully

Given User is on secret santa login page
When user logs in
Then user is on dasboard page
Feature: User login on santa website

Scenario: User logs in as "kulshaev@gmail.com" and "Tester1!" in successfully

Given User is on secret santa login page
When user logs in as "kulshaev@gmail.com" and "Tester1!"
Then user is on dasboard page

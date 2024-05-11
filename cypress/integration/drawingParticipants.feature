Feature: Drawing participants in Secret Santa

  Scenario: Add participants to the Secret Santa draw
    Given I have a box named "Office Secret Santa"
    When I add the following participants:
      | name         | email                 |
      | John Doe     | john@example.com      |
      | Jane Smith   | jane@example.com      |
    Then I should see "2 participants added to the box"

  Scenario: Start the draw
    Given I have added participants
    When I initiate the draw
    Then the draw should start and participants are notified
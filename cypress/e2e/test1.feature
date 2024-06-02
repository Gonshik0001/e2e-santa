Feature: User management

  Scenario: User creates a new box
    Given the user is logged in
    When the user creates a new box
    Then the box should be created successfully
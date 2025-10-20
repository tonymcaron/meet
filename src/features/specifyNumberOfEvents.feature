Feature: Specify Number of Events
  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given the user is viewing the main page
    When the user has not specified the number of events to display
    Then 32 events will be displayed by default

  Scenario: User can change the number of events displayed
    Given the user wants to see a specific number of events
    When the user specifies a number of events to display
    Then only that number of events should be shown

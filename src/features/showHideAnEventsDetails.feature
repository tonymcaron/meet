Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default
    Given the user is viewing an event or event list
    When the user has not clicked on any specific event or button
    Then the detailed info is collapsed

  Scenario: User can expand an event to see its details
    Given the user would like to see more details about an event
    When the user clicks on the event or a button on event element
    Then it will expand to show more details

  Scenario: User can collapse an event to hide details
    Given the user would like to collapse to see fewer details about an event
    When the user clicks on the event or a button on the event element
    Then it will collapse to hide details
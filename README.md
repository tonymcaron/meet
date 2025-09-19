# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Features & Scenarios
For Achievement 4 - Task 1

### Feature 2: Show/Hide Event Details
User story: As a user, I should be able to click on an event or button so that I can expand to see more details or collapse to see fewer details

Scenario 1: An event element is collapsed by default
-GIVEN the user is viewing an event or event list
-WHEN the user has not clicked on any specific event or button
-THEN the detailed info is collapsed

Scenario 2: User can expand an event to see details
-GIVEN the user would like to see more details about an event
-WHEN the user clicks on the event or a button on event element
-THEN it will expand to show more details

Scenario 3: User can collapse an event to hide details
-GIVEN the user would like to collapse to see fewer details about an event
-WHENthe user clicks on the event or a button on the event element
-THEN it will collapse to hide details

### Feature 3: Specify Number of Events

Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
-GIVEN the user is viewing the main page
-WHEN they have not specified the number of events they'd like to see
-THEN 32 events will be displayed

Scenario 2: User can change the number of events displayed.
-GIVEN the user would like to see a specific number of events
-WHEN they specify a number
-THEN only that number of events will be shown



Scenario xxx: 
-GIVEN
-WHEN
-THEN
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Meet App
A serverless React PWA (progressive web application) app, written using a TDD (test driven development) approach.  It uses the Google API Calendar to display upcoming events, and gives the user the ability to search by city and also display a specified number of results (events).  The app also displays visual aids to show upcoming events in their city of choosing and to show popularity of event genres.  OAuth is used for authorization flow.

## Tech Stack
- React (front-end framework)
- Node.js & npm (runtime and package manager)
- AWS Lambda (serverless functions for backend)
- Google Calendar API (event data retrieval)
- OAuth2 (authentication flow)
- Jest/Cucumber (testing frameworks for TDD)
- Git & GitHub (version control and hosting)
- Vercel (deployment)
- Service Workers (offline capabilities)
- Recharts (data visualization library)

## Project Features & Scenarios

### Feature 1: Filter Events By City
User story: As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.

#### Scenario 1: When user hasn’t searched for a specific city, show upcoming events from all cities
-GIVEN user hasn’t searched for any city;  
-WHEN the user opens the app;  
-THEN the user should see a list of upcoming events.

#### Scenario 2: User should see a list of suggestions when they search for a city
-GIVEN the main page is open;  
-WHEN user starts typing in the city textbox;  
-THEN the user should receive a list of cities (suggestions) that match what they’ve typed.

#### Scenario 3: User can select a city from the suggested list
-GIVEN user was typing “Berlin” in the city textbox;
-AND the list of suggested cities is showing;  
-WHEN the user selects a city (e.g., “Berlin, Germany”) from the list;  
-THEN their city should be changed to that city (i.e., “Berlin, Germany”;
AND the user should receive a list of upcoming events in that city.

### Feature 2: Show/Hide Event Details
User story: As a user, I should be able to click on an event or button so that I can expand to see more details or collapse to see fewer details.

#### Scenario 1: An event element is collapsed by default
-GIVEN the user is viewing an event or event list;  
-WHEN the user has not clicked on any specific event or button;  
-THEN the detailed info is collapsed.

#### Scenario 2: User can expand an event to see its details
-GIVEN the user would like to see more details about an event;  
-WHEN the user clicks on the event or a button on event element;  
-THEN it will expand to show more details.

#### Scenario 3: User can collapse an event to hide details
-GIVEN the user would like to collapse to see fewer details about an event;  
-WHEN the user clicks on the event or a button on the event element;  
-THEN it will collapse to hide details.

### Feature 3: Specify Number of Events
User story: As a user, I should be able to select the number so I can see a specific number of events.

#### Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
-GIVEN the user is viewing the main page;  
-WHEN they have not specified the number of events they'd like to see;  
-THEN 32 events will be displayed.

#### Scenario 2: User can change the number of events displayed.
-GIVEN the user would like to see a specific number of events;  
-WHEN they specify a number;  
-THEN only that number of events will be shown.

### Feature 4: Use the App When Offline
User story: As a user, I should be able to view events offline so that I may continue to use the app.

#### Scenario 1: Show cached data when there’s no internet connection.
-GIVEN the user successfully opened and was viewing the app;  
-WHEN user loses connection or is otherwise offline;  
-THEN it will display cached data.

#### Scenario 2: Show error when user changes search settings (city, number of events).
-GIVEN the user had selected search criteria (city, number of events) and then lost their connection;  
-WHEN the user attemps to change search criteria;  
-THEN they will receive an error informing them that they will have to wait until back online.

### Feature 5: Add an App Shortcut to the Home
User story: As a user, I should be able to add a shortcut to my home screen so that I can quickly open the app.

#### Scenario 1: User can install the meet app as a shortcut on their device home screen.
-GIVEN a user would like quick access to the app;  
-WHEN they install a shortcut;  
-THEN they will have easy access to opening the app.
*** This handled by the user's OS and is not testable ***

### Feature 6: Display Charts Visualizing Event Details
User story: As a user, I should be able to see a chart or other graphic displaying upcoming events in each city so that I can quickly see that info.

#### Scenario 1: Show a chart with the number of upcoming events in each city.
-GIVEN the user has selected a city;  
-WHEN they land on the main screen;  
-THEN the app should display a chart with upcoming events.
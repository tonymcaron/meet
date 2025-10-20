import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppComponent;
  let AppDOM;
  let NumberOfEventsDOM;
  let EventListDOM;

  beforeEach(() => {
    AppComponent = render(<App />);
    AppDOM = AppComponent.container.firstChild;
    NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    EventListDOM = AppDOM.querySelector('#event-list');
  });

  test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
    given('the user is viewing the main page', () => {
      // AppComponent already rendered in beforeEach
    });

    when('the user has not specified the number of events to display', () => {
      // Default state, no user input yet
    });

    then('32 events will be displayed by default', async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    let numberInput;

    given('the user wants to see a specific number of events', () => {
      numberInput = within(NumberOfEventsDOM).getByRole('spinbutton');
      expect(numberInput).toBeInTheDocument();
    });

    when('the user specifies a number of events to display', async () => {
      const user = userEvent.setup();
      await user.clear(numberInput);
      await user.type(numberInput, '10');
      expect(numberInput.value).toBe('10');
    });

    then('only that number of events should be shown', async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(10);
      });
    });
  });
});

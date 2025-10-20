import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let EventComponent;
  let EventDOM;
  const mockEvent = mockData[0];

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user is viewing an event or event list', () => {
      EventComponent = render(<Event event={mockEvent} />);
      EventDOM = EventComponent.container.firstChild;
    });

    when('the user has not clicked on any specific event or button', () => {
    });

    then('the detailed info is collapsed', () => {
      const details = within(EventDOM).queryByText(mockEvent.description);
      expect(details).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user would like to see more details about an event', () => {
      EventComponent = render(<Event event={mockEvent} />);
      EventDOM = EventComponent.container.firstChild;
    });

    when('the user clicks on the event or a button on event element', async () => {
      const user = userEvent.setup();
      const detailsBtn = within(EventDOM).getByRole('button', { name: /show details/i });
      await user.click(detailsBtn);
    });

    then('it will expand to show more details', () => {
      const details = within(EventDOM).getByTestId('event-details');
      expect(details).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    given('the user would like to collapse to see fewer details about an event', async () => {
      EventComponent = render(<Event event={mockEvent} />);
      EventDOM = EventComponent.container.firstChild;

      // Expand first
      const user = userEvent.setup();
      const showButton = within(EventDOM).getByRole('button', { name: /show details/i });
      await user.click(showButton);
      const details = within(EventDOM).getByTestId('event-details');
      expect(details).toBeInTheDocument();
    });

    when('the user clicks on the event or a button on the event element', async () => {
      const user = userEvent.setup();
      const hideButton = within(EventDOM).getByRole('button', { name: /hide details/i });
      await user.click(hideButton);
    });

    then('it will collapse to hide details', () => {
      const details = within(EventDOM).queryByTestId(mockEvent.description);
      expect(details).not.toBeInTheDocument();
    });
  });
});
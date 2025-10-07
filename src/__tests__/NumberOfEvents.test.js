import React from 'react';
import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  let setCurrentNOE;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents
      currentNOE={32}
      setCurrentNOE={setCurrentNOE}
    />);
  });

  test('renders number of events text input', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('default number of events is 32', async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
    expect(numberTextBox).toHaveValue(32);
  });

  test('input value changes when user types', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
    await user.type(numberTextBox, '{backspace}{backspace}10');
    expect(numberTextBox).toHaveValue(10);
  });
});
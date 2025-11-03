import React from 'react';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import Event from "../components/Event";

describe("<Event /> component", () => {
  let EventComponent;
  let allEvents;
  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("renders event title", () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test("renders 'show details' button", () => {
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });

  test("by default, event's details section is hidden", () => {
    expect(EventComponent.container.querySelector(".details")).not.toBeInTheDocument();
  });

  test("shows event's details section when show details button is clicked", async () => {
    const user = userEvent.setup();

    await user.click(EventComponent.queryByText("Show Details"));
    expect(EventComponent.container.querySelector(".details")).toBeInTheDocument();
    expect(EventComponent.queryByText("Hide Details")).toBeInTheDocument();
    expect(EventComponent.queryByText("Show Details")).not.toBeInTheDocument();

    await user.click(EventComponent.queryByText("Dide Details"));
    expect(EventComponent.container.querySelector(".details")).not.toBeInTheDocument();
    expect(EventComponent.queryByText("Hide Details")).not.toBeInTheDocument();
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });

})
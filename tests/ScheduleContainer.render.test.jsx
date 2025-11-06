import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ScheduleContainer from "../src/components/ScheduleContainer";

test("render del calendario", () => {
  render(<ScheduleContainer events={[]} />);
  expect(screen.getByText(/Calendario/i)).toBeInTheDocument();
});

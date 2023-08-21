import React from "react";
import QuestionForm from "../Features/ExpandAndAdd/QuestionForm";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const currProductId = 37324;
const currProductName = "Jaylen Backpack";

test("check text", () => {
  const { getByTestId } = render(
    <QuestionForm
      currProductId={currProductId}
      currProductName={currProductName}
    />
  );

  fireEvent.click(getByTestId("add-questions-btn"));

  const nameWarning = screen.getByText(
    /For privacy reasons, do not use your full name or email address/i
  );
  expect(nameWarning).toBeInTheDocument();

  const emailWarning = screen.getByText(
    /For authentication reasons, you will not be emailed/i
  );
  expect(emailWarning).toBeInTheDocument();
});

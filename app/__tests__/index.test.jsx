import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "../layout";

// Mocking the spaceMono font
jest.mock("next/font/google", () => ({
  Space_Mono: jest.fn(() => ({
    className: "mocked-class",
  })),
}));

describe("RootLayout", () => {
  it("renders without craching", () => {
    render(<RootLayout />);
  });
});

import { render } from "@testing-library/react-native";

import Login from "@//index";

describe("<Login />", () => {
  test("Login renders correctly", () => {
    const { getByText } = render(<Login />);

    getByText("Welcome Back!");
  });
});

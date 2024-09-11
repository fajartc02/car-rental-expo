import * as React from "react";
import renderer from "react-test-renderer";
import FooterPayment1 from "../FooterPayment1";

it(`FooterPa renders correctly`, () => {
  const submitOrder = () => {
    console.log("submitOrder");
  };
  const tree = renderer
    .create(
      <FooterPayment1
        data={{
          price: 1000000,
        }}
        paymentIdSelected={1}
        onChangeStep={() => jest.fn()}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

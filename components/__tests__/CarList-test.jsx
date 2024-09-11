import * as React from "react";
import renderer from "react-test-renderer";

import CarList from "../CarList";

it(`GeoLocation renders correctly`, () => {
  const tree = renderer
    .create(
      <CarList
        image={{
          uri: "https://firebasestorage.googleapis.com/v0/b/km-sib-2---secondhand.appspot.com/o/orders%2F1725855113022-9d222482-af8c-44a9-ab3b-ae780f03b36b.jpeg?alt=media",
        }}
        carName={"Innova"}
        passengers={10}
        baggage={2}
        price={500000}
        onPress={() => router.navigate("(list-car)/details/" + car.id)}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

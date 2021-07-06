import React from "react";
import { Text } from "ink";

const Hello = ({ name = "stranger" }) => <Text>Hello, {name}</Text>;

export default Hello;

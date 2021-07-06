import React from "react";
import { Text } from "ink";

/// Hello world command
const Hello = ({ name = "stranger" }) => <Text>Hello, {name}</Text>;

export default Hello;

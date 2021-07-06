import React, { FC } from "react";
import { Text } from "ink";

const Hello: FC<{ name?: string }> = ({ name = "Stranger" }) => (
	<Text>Hello, {name}</Text>
);

export default Hello;

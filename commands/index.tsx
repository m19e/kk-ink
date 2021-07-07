import React, { FC } from "react";
import PropTypes from "prop-types";
import { Text } from "ink";

/// Hello world command
const Hello: FC<{
	name?: string;
}> = ({ name = "Stranger" }) => <Text>Hello, {name}</Text>;

Hello.propTypes = {
	/// Name of the person to greet
	name: PropTypes.string,
};

export default Hello;

import React, { FC } from "react";
import PropTypes from "prop-types";
import { Text } from "ink";

/// component desc test
const Hello: FC<{
	name?: string;
}> = ({ name = "Stranger" }) => <Text>Hello, {name}</Text>;

Hello.propTypes = {
	/// props desc test
	name: PropTypes.string,
};

export default Hello;

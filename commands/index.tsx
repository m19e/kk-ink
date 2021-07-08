import React, { FC } from "react";
import PropTypes from "prop-types";
import { Box, Text, Newline, Spacer } from "ink";
import Spinner from "ink-spinner";

/// Hello world command
const Hello: FC<{
	name?: string;
}> = ({ name = "Stranger" }) => (
	<Box>
		<Text>Hello, {name}</Text>
		<Spacer />
		<Text color="green">
			<Spinner type="dots" />
		</Text>
		<Text> Loading</Text>
	</Box>
);

Hello.propTypes = {
	/// Name of the person to greet
	name: PropTypes.string,
};

export default Hello;

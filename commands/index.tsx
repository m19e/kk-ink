import React, { FC } from "react";
import PropTypes from "prop-types";
import { Text, Newline } from "ink";
import Spinner from "ink-spinner";

/// Hello world command
const Hello: FC<{
	name?: string;
}> = ({ name = "Stranger" }) => (
	<Text>
		Hello, {name}
		<Newline />
		<Text color="green">
			<Spinner type="dots" />
		</Text>
		{" Loading"}
	</Text>
);

Hello.propTypes = {
	/// Name of the person to greet
	name: PropTypes.string,
};

export default Hello;

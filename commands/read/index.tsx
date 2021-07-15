import React, { useState } from "react";
import PropTypes from "prop-types";
import { useApp, useInput, Box, Text } from "ink";
import ReadCmd from "../../src/components/templates/Read";

type Props = {
	file: string;
};

/// Read file command
const Read = ({ file }: Props) => {
	return <ReadCmd file={file} />;
};

const Robot = () => {
	const { exit } = useApp();
	const [isActive, setIsActive] = useState(true);
	const [x, setX] = useState(1);
	const [y, setY] = useState(1);

	useInput(
		(input, key) => {
			if (input === "q" || key.return || key.escape) {
				exit();
			}

			if (input === "t") {
				setIsActive((prev) => !prev);
			}

			if (key.leftArrow) {
				setX(Math.max(1, x - 1));
			}

			if (key.rightArrow) {
				setX(Math.min(20, x + 1));
			}

			if (key.upArrow) {
				setY(Math.max(1, y - 1));
			}

			if (key.downArrow) {
				setY(Math.min(10, y + 1));
			}
		},
		{ isActive }
	);

	return (
		<Box flexDirection="column">
			<Text>Use arrow keys to move the face. Press “q” to exit.</Text>
			<Box height={12} paddingLeft={x} paddingTop={y}>
				<Text>✔️</Text>
			</Box>
		</Box>
	);
};

Read.propTypes = {
	/// Name of target file name
	file: PropTypes.string,
};

Read.positionalArgs = ["file"];

export default Read;

import React from "react";
import PropTypes from "prop-types";
import { useApp, useInput, Box, Text, Newline } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import { extname } from "path";
import { existsSync, readFileSync } from "fs";

type Props = {
	file: string;
};

/// Read file command
const Read = ({ file }: Props) => {
	if (
		typeof file !== "string" ||
		(extname(file) !== ".txt" && extname(file) !== ".md")
	) {
		return <Text color="red">ファイルを指定してくださいっ</Text>;
	}

	const exist = existsSync(file);
	if (!exist) {
		return <Text>見つかりませんでした……</Text>;
	}

	const buf = readFileSync(file, "utf-8");

	return (
		<>
			<Box paddingX={2} alignItems="center">
				<Box marginRight={2}>
					<Gradient name="fruit">
						<BigText text="kk" />
					</Gradient>
				</Box>
				<Box paddingBottom={1}>
					<Box borderStyle="singleDouble" paddingX={2}>
						<Text bold>CLI tool for Kanji check</Text>
					</Box>
				</Box>
			</Box>
			<Text>「{file}」を読み込みます！</Text>
			<Newline />
			<Text>{buf}</Text>
			<Robot />
		</>
	);
};

const Robot = () => {
	const { exit } = useApp();
	const [x, setX] = React.useState(1);
	const [y, setY] = React.useState(1);

	useInput((input, key) => {
		if (input === "q") {
			exit();
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
	});

	return (
		<Box flexDirection="column">
			<Text>Use arrow keys to move the face. Press “q” to exit.</Text>
			<Box height={12} paddingLeft={x} paddingTop={y}>
				<Text>^_^</Text>
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

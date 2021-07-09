import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "ink";
import { extname } from "path";
import { existsSync } from "fs";

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

	return (
		<>
			<Text>「{file}」を読み込みます！</Text>
			<Box flexDirection="column" padding={2}>
				<Box>
					<Box borderStyle="single" marginRight={2}>
						<Text>single</Text>
					</Box>

					<Box borderStyle="double" marginRight={2}>
						<Text>double</Text>
					</Box>

					<Box borderStyle="round" marginRight={2}>
						<Text>round</Text>
					</Box>

					<Box borderStyle="bold">
						<Text>bold</Text>
					</Box>
				</Box>

				<Box marginTop={1}>
					<Box borderStyle="singleDouble" marginRight={2}>
						<Text>singleDouble</Text>
					</Box>

					<Box borderStyle="doubleSingle" marginRight={2}>
						<Text>doubleSingle</Text>
					</Box>

					<Box borderStyle="classic">
						<Text>classic</Text>
					</Box>
				</Box>
			</Box>
		</>
	);
};

Read.propTypes = {
	/// Name of target file name
	file: PropTypes.string,
};

Read.positionalArgs = ["file"];

export default Read;

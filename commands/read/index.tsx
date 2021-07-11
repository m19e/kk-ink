import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "ink";
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
		</>
	);
};

Read.propTypes = {
	/// Name of target file name
	file: PropTypes.string,
};

Read.positionalArgs = ["file"];

export default Read;

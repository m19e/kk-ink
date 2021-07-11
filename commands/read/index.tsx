import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
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
			<Gradient name="morning">
				<BigText text="kk" />
			</Gradient>
			<Gradient name="fruit">
				<BigText text="kk" />
			</Gradient>
			<Gradient name="summer">
				<BigText text="kk" />
			</Gradient>
			<Gradient name="fruit">
				<Text>Kanji check for Kaho Komiya</Text>
			</Gradient>
			<Text>「{file}」を読み込みます！</Text>
			<Box flexDirection="column" padding={2}>
				<Box>
					<Box borderStyle="singleDouble" marginRight={2} paddingX={2}>
						<Text>singleDouble</Text>
					</Box>

					<Box borderStyle="bold" paddingX={2}>
						<Text>bold</Text>
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

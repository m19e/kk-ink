import React from "react";
import PropTypes from "prop-types";
import { Text } from "ink";
import { extname } from "path";

type Props = {
	file: string;
};

/// Read file command
const Read = ({ file }: Props) => {
	if (
		typeof file !== "string" ||
		extname(file) !== ".txt" ||
		extname(file) !== ".md"
	) {
		return <Text color="red">テキストファイルを指定してくださいっ</Text>;
	}

	return <Text>「{file}」を読み込みますっ</Text>;
};

Read.propTypes = {
	/// Name of target file name
	file: PropTypes.string,
};

Read.positionalArgs = ["file"];

export default Read;

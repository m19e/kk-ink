import React from "react";
import PropTypes from "prop-types";
import { Text } from "ink";
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

	return <Text>「{file}」を読み込みます！</Text>;
};

Read.propTypes = {
	/// Name of target file name
	file: PropTypes.string,
};

Read.positionalArgs = ["file"];

export default Read;

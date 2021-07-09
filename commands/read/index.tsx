import React from "react";
import PropTypes from "prop-types";
import { Text } from "ink";

type Props = {
	file: string;
};

/// Read file command
const Read = ({ file }: Props) => {
	if (typeof file !== "string") {
		return <Text color="red">ファイルを指定してくださいっ</Text>;
	}

	return <Text>「{file}」を読み込みますっ</Text>;
};

Read.propTypes = {
	/// Name of target file name
	file: PropTypes.string,
};

Read.positionalArgs = ["file"];

export default Read;

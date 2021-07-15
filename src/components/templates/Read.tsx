import React from "react";
import { Text, Newline } from "ink";
import { extname } from "path";
import { existsSync, readFileSync } from "fs";

import Logo from "../atoms/Logo";

type Props = {
	file: string;
};

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
			<Logo />
			<Text>「{file}」を読み込みます！</Text>
			<Newline />
			<Text>{buf}</Text>
		</>
	);
};
export default Read;

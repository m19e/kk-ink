import React, { useState, useEffect } from "react";
import { Text, Newline } from "ink";
import Spinner from "ink-spinner";
import { extname } from "path";
import { existsSync, readFileSync } from "fs";
import Logo from "../atoms/Logo";

type Props = {
	file: string;
};

const Read = ({ file }: Props) => {
	const [loading, setLoading] = useState(true);
	const [lines, setLines] = useState<string[]>([]);

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

	useEffect(() => {
		const buf = readFileSync(file, "utf-8");
		const ls = buf.split("\n");
		setLines(ls);

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<>
			{loading ? (
				<Text>
					<Text color="green">
						<Spinner type="dots" />
					</Text>
					<Text> Loading</Text>
				</Text>
			) : (
				<>
					<Logo />
					<Text>「{file}」を読み込みます！</Text>
					<Newline />
					{lines.map((l) => (
						<Text>{l}</Text>
					))}
				</>
			)}
		</>
	);
};

export default Read;

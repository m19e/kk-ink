import React, { useState, useEffect } from "react";
import { Text, Newline } from "ink";
import Spinner from "ink-spinner";
import { extname } from "path";
import { existsSync, readFileSync } from "fs";
import { COMPULSORY } from "../../consts";
import Logo from "../atoms/Logo";

type Props = {
	file: string;
};

const isKanji = (c: string): boolean =>
	/[\u2E80-\u2FDF々〇〻\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2FFFF]/.test(
		c
	);

const isCompulsory = (c: string): boolean => COMPULSORY.includes(c);

const convert = (lines: string[]): string[] => {
	const res = lines.map((line) => {
		let text = "";
		for (const c of [...line]) {
			if (isKanji(c)) text += "k";
			text += c;
		}
		return text;
	});

	return res;
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
		const ced = convert(ls);
		setLines(ced);

		setLoading(false);
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

import React, { useState, useEffect } from "react";
import { Text, Newline } from "ink";
import Spinner from "ink-spinner";
import { extname } from "path";
import { existsSync, readFileSync } from "fs";
import { COMPULSORY } from "../../consts";
import Form from "../molecules/Form";
import Logo from "../atoms/Logo";

type Props = {
	file: string;
};

const isKanji = (c: string): boolean =>
	/[\u2E80-\u2FDF々〇〻\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2FFFF]/.test(
		c
	);

const isCompulsory = (c: string): boolean => COMPULSORY.includes(c);

const isHiraKata = (c: string): boolean =>
	/[\u3041-\u3096\u30A1-\u30FA]/.test(c);

const isOK = (c: string): boolean => isHiraKata(c) || isCompulsory(c);

type LineData = {
	id: number;
	text: string;
	targets: string[];
};

const findTargets = (line: string): string[] =>
	[...line].filter((c) => isKanji(c) && !isCompulsory(c));

const convertArrayToLineDatas = (lines: string[]): LineData[] =>
	lines.map((text, id) => ({
		id,
		text,
		targets: findTargets(text),
	}));

const Read = ({ file }: Props) => {
	const [buffer, setBuffer] = useState("");
	const [lines, setLines] = useState<string[]>([]);
	const [lineDatas, setLineDatas] = useState<LineData[]>([]);
	const [loading, setLoading] = useState(true);

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
		setBuffer(buf);
		const ls = buf.split("\n");
		const datas = convertArrayToLineDatas(ls);
		setLineDatas(datas);
		// setLines(ls);

		setLoading(false);
	}, []);

	const updateLineDatas = (submit: { [k: string]: string }) => {
		let buf = "" + buffer;
		Object.keys(submit).forEach((k) => (buf = buf.split(k).join(submit.k)));
		setLineDatas(() => convertArrayToLineDatas(buf.split("\n")));
		setBuffer(buf);
	};

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
					<Form datas={lineDatas} />
				</>
			)}
		</>
	);
};

export default Read;

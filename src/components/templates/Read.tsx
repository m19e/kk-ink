import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import Spinner from "ink-spinner";
import { extname, parse } from "path";
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
	const [lineDatas, setLineDatas] = useState<LineData[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = useState(false);

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
		const datas = convertArrayToLineDatas(buf.split("\n"));
		setLineDatas(datas);

		setLoading(false);
	}, []);

	const updateLineDatas = (submit: { [k: string]: string }) => {
		let buf = "" + buffer;
		Object.entries(submit).forEach(([k, v]) => {
			if (buf.includes(k)) buf = buf.split(k).join(v);
		});
		setLineDatas(() => convertArrayToLineDatas(buf.split("\n")));
		setBuffer(buf);
		setSubmitted(true);
	};

	return (
		<>
			<Logo />
			{loading ? (
				<Text>
					<Text color="green">
						<Spinner type="dots" />
					</Text>
					<Text>「{file}」を読み込んでますっ</Text>
				</Text>
			) : (
				<>
					<Text>✔「{file}」を読み込みました！</Text>
					{submitted ? (
						<Box paddingBottom={1} flexDirection="column">
							<Box paddingX={2} paddingY={1}>
								<Text>{buffer}</Text>
							</Box>
							<Text>
								「{`${parse(file).name}_kk${extname(file)}`}」に書き出しました！
							</Text>
						</Box>
					) : (
						<Form datas={lineDatas} update={updateLineDatas} />
					)}
				</>
			)}
		</>
	);
};

export default Read;

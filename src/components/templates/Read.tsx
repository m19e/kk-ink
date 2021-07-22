import React, { FC, useState, useEffect } from "react";
import { Text, Box } from "ink";
import { FormSection } from "../../ink/form";
import Spinner from "ink-spinner";
import { extname, parse } from "path";
import { existsSync, readFileSync } from "fs";
import { COMPULSORY } from "../../consts";
import { LineData, CustomField } from "../../types";
import Form from "../molecules/Form";
import Logo from "../atoms/Logo";

const isKanji = (c: string): boolean =>
	/[\u2E80-\u2FDF々〇〻\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2FFFF]/.test(
		c
	);

const isCompulsory = (c: string): boolean => COMPULSORY.includes(c);

const isHiraKata = (c: string): boolean =>
	/[\u3041-\u3096\u30A1-\u30FA]/.test(c);

const isOK = (c: string): boolean => isHiraKata(c) || isCompulsory(c);

const findTargets = (line: string): string[] =>
	[...line].filter((c) => isKanji(c) && !isCompulsory(c));

const convertArrayToLineDatas = (lines: string[]): LineData[] =>
	lines.map((text, id) => ({
		id,
		text,
		targets: findTargets(text),
	}));

const convertBufferToFormSections = (buf: string): FormSection[] =>
	buf
		.split("\n")
		.map((text, id) => ({
			id,
			text,
			targets: findTargets(text),
		}))
		.filter((d) => d.targets.length)
		.map((d) => ({
			title: "" + d.id,
			description: d.text,
			fields: d.targets.map(
				(t) =>
					({
						type: "custom",
						name: t,
						description: "Hiragana or Katakana",
						regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						required: true,
					} as CustomField)
			),
		}));

const Read: FC<{ file: string }> = ({ file }) => {
	const [buffer, setBuffer] = useState("");
	const [formSections, setFormSections] = useState<FormSection[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = useState(false);

	const outputFile = `${parse(file).name}_kk${extname(file)}`;

	if (
		typeof file !== "string" ||
		(extname(file) !== ".txt" && extname(file) !== ".md")
	) {
		return <Text color="redBright">ファイルを指定してくださいっ</Text>;
	}

	const exist = existsSync(file);
	if (!exist) {
		return <Text color="redBright">見つかりませんでした……</Text>;
	}

	useEffect(() => {
		const buf = readFileSync(file, "utf-8");
		setBuffer(buf);
		setFormSections(() => convertBufferToFormSections(buf));

		setLoading(false);
	}, []);

	const updateLineDatas = (submit: object) => {
		let buf = "" + buffer;
		Object.entries(submit).forEach(([k, v]) => {
			if (buf.includes(k)) buf = buf.split(k).join(v);
		});
		setFormSections(() => convertBufferToFormSections(buf));
		setBuffer(buf);
		setSubmitted(true);
		// writeResultToFile(filename)
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
							<Text>「{outputFile}」に書き出しました！</Text>
						</Box>
					) : (
						<Form formData={formSections} update={updateLineDatas} />
					)}
				</>
			)}
		</>
	);
};

export default Read;

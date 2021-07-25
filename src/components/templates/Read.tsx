import React, { FC, useState, useEffect } from "react";
import { Text, Box } from "ink";
import { FormSection } from "../../ink/form";
import Spinner from "ink-spinner";
import Divider from "ink-divider";
import { parse, join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { COMPULSORY } from "../../consts";
import { CustomField } from "../../types";
import Form from "../molecules/Form";
import Logo from "../atoms/Logo";

const isKanji = (c: string): boolean =>
	/[\u2E80-\u2FDF々〇〻\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u20000-\u2FFFF]/.test(
		c
	);

const isCompulsory = (c: string): boolean => COMPULSORY.includes(c);

const isHiraKata = (c: string): boolean =>
	/[\u3041-\u3096\u30A1-\u30FA]/.test(c);

const findTargets = (line: string): string[] =>
	[...line].filter((c) => isKanji(c) && !isCompulsory(c));

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
					} as CustomField)
			),
		}));

const Read: FC<{ file: string }> = ({ file }) => {
	const [buffer, setBuffer] = useState("");
	const [formSections, setFormSections] = useState<FormSection[]>([]);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState<"load" | "edit" | "confirm" | "submit">(
		"load"
	);

	const { dir, ext, name } = parse(file);
	const outputFile = join(dir, `${name}_kk${ext}`);

	if (typeof file !== "string" || (ext !== ".txt" && ext !== ".md")) {
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

		setTimeout(() => {
			setLoading(false);
			setTimeout(() => {
				setStatus("edit");
			}, 1500);
		}, 2000);
	}, []);

	const update = (submit: object) => {
		let buf = "" + buffer;
		Object.entries(submit).forEach(([k, v]) => {
			if (buf.includes(k)) buf = buf.split(k).join(v);
		});
		const sections = convertBufferToFormSections(buf);

		if (sections.length) {
			setFormSections(sections);
			setBuffer(buf);
		} else {
			writeFileSync(outputFile, buf);
			setStatus("submit");
		}
	};

	return (
		<>
			{status === "load" && (
				<>
					<Logo />
					<Text>
						{loading ? (
							<>
								<Text color="green">
									<Spinner type="dots" />
								</Text>
								<Text>「{file}」を読み込んでますっ</Text>
							</>
						) : (
							<Text> ✔「{file}」を読み込みました！</Text>
						)}
					</Text>
				</>
			)}
			{status === "edit" && <Form formData={formSections} update={update} />}
			{status === "confirm" && null}
			{status === "submit" && (
				<Box flexDirection="column">
					<Box paddingX={3} paddingY={1} borderStyle="bold">
						<Text>{buffer}</Text>
					</Box>
					<Text>「{outputFile}」に書き出しました！</Text>
				</Box>
			)}
		</>
	);
};

export default Read;

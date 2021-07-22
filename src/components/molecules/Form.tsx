import React, { FC } from "react";
import { Box, Text } from "ink";
import {
	Form,
	AbstractFormField,
	FormFieldString,
	FormFieldValueRendererProps,
	SpecificFormFieldRendererProps,
	FormSection,
} from "../../ink/form";
import TextInput from "ink-text-input";
import { LineData } from "../../types";

const FormDemoCustom: FC<{
	datas: LineData[];
	update: (obj: object) => void;
}> = ({ datas, update }) => {
	const formData: FormSection[] = datas
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

	if (!formData.length) return null;

	return (
		<Form
			onSubmit={(value) => update(value)}
			customManagers={[
				{
					type: "custom",
					renderValue: ({
						value,
					}: FormFieldValueRendererProps<FormFieldString>) => <>{value}</>,
					renderField: ({
						value,
						field: { regex, placeholder },
						onChange,
						onError,
						onClearError,
					}: SpecificFormFieldRendererProps<FormFieldString>) => (
						<Box padding={1}>
							<TextInput
								value={value ?? ""}
								onChange={(value) => {
									onChange(value);

									if (!value.match(regex)) {
										onError(`Invaid value, should be Hiragana or Katakana`);
									} else {
										onClearError();
									}
								}}
								placeholder={placeholder}
							/>
						</Box>
					),
				},
			]}
			form={{
				title: "Teach me Kanji reading!",
				sections: formData,
			}}
		/>
	);
};

export default FormDemoCustom;

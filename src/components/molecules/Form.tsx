import React from "react";
import { Box } from "ink";
import {
	Form,
	AbstractFormField,
	FormFieldString,
	FormFieldValueRendererProps,
	SpecificFormFieldRendererProps,
} from "../../ink/form";
import TextInput from "ink-text-input";

type CustomField = AbstractFormField<"custom", string> & { regex: RegExp };

const FormDemoCustom = () => (
	<Form
		onSubmit={(value) => console.log(`Submitted: `, value)}
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
			title: "Custom Form Field Manager",
			sections: [
				{
					title: "Main",
					description:
						"Demonstration of how custom field implementations can be used.",
					fields: [
						{
							type: "custom",
							name: "読めない漢字1",
							description: "Hiragana or Katakana",
							regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						},
						{
							type: "custom",
							name: "読めない漢字2",
							description: "Hiragana or Katakana",
							regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						},
						{
							type: "custom",
							name: "読めない漢字3",
							description: "Hiragana or Katakana",
							regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						},
					] as CustomField[],
				},
				{
					title: "Sub",
					description:
						"Demonstration of how custom field implementations can be used.",
					fields: [
						{
							type: "custom",
							name: "読めない漢字4",
							description: "Hiragana or Katakana",
							regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						},
						{
							type: "custom",
							name: "読めない漢字5",
							description: "Hiragana or Katakana",
							regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						},
						{
							type: "custom",
							name: "読めない漢字6",
							description: "Hiragana or Katakana",
							regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						},
					] as CustomField[],
				},
			],
		}}
	/>
);

export default FormDemoCustom;

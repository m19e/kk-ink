import React from "react";
import { Box } from "ink";
import { Form, AbstractFormField } from "../../ink/form";
import TextInput from "ink-text-input";

type CustomField = AbstractFormField<"custom", string>;

const FormDemoCustom = () => (
	<Form
		onSubmit={(value) => console.log(`Submitted: `, value)}
		customManagers={[
			{
				type: "custom",
				renderValue: ({ value, field }) => <>{value}</>,
				renderField: (props) => (
					<Box padding={1}>
						<TextInput
							value={props.value ?? ""}
							onChange={(value) => {
								props.onChange(value);

								if (!value.match(props.field.regex)) {
									props.onError(`Invaid value, should be Hiragana or Katakana`);
								} else {
									props.onClearError();
								}
							}}
							placeholder={props.field.placeholder}
						/>
					</Box>
				),
			} as any,
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
						} as CustomField as any,
						{
							type: "custom",
							name: "読めない漢字2",
							description: "Hiragana or Katakana",
							regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						} as CustomField as any,
						{
							type: "custom",
							name: "読めない漢字3",
							description: "Hiragana or Katakana",
							regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
						} as CustomField as any,
					],
				},
			],
		}}
	/>
);

export default FormDemoCustom;

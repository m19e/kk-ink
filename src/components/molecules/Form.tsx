import React from "react";
import { Box } from "ink";
import { Form, AbstractFormField } from "ink-form";
import TextInput from "ink-text-input";

const options = [
	{ label: "Millenium Falcon", value: "falcon" },
	{ label: "TIE Advanced X1", value: "tieadv" },
	{ label: "X-Wing", value: "xwing" },
	{ label: "Raizorcrest", value: "mando" },
];

const FormDemoOverview = () => (
	<Form
		onSubmit={(value) => console.log(`Submitted: `, value)}
		form={{
			title: "Form title",
			sections: [
				{
					title: "Text fields",
					fields: [
						{
							type: "string",
							name: "field1",
							label: "Input with initial value",
							initialValue: "Initial value",
						},
						{
							type: "string",
							name: "field2",
							label: "Masked input",
							mask: "*",
						},
						{
							type: "string",
							name: "field3",
							label: "Input with placeholder, description and required flag",
							placeholder: "Placeholder",
							required: true,
							description: "Hello I am a description",
						},
						{ type: "string", name: "field4-nolabel" },
						{
							type: "string",
							name: "field5",
							label: "Regex, must be an url",
							regex:
								/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
						},
					],
				},
				{
					title: "Numerical fields",
					fields: [
						{ type: "integer", name: "field10", label: "Integer" },
						{
							type: "integer",
							name: "field11",
							label: "Integer between -5 and 8, stepsize 2",
							min: -5,
							max: 8,
							step: 2,
						},
						{ type: "float", name: "field12", label: "Float" },
						{
							type: "float",
							name: "field13",
							label: "Float between 0 and 5, stepsize 0.1",
							min: 0,
							max: 5,
							step: 0.1,
						},
					],
				},
				{
					title: "Selection fields",
					fields: [
						{ type: "select", name: "field20", label: "Select", options },
						{
							type: "multiselect",
							name: "field21",
							label: "Multi Select",
							options,
						},
					],
				},
				{
					title: "Help Section",
					description: [
						"You can use a section without any fields and just a description attribute for additional documentation sections.",
						"This section for example can help as a help page.",
						'You could also add a "About", "Readme" or different pages.',
					],
					fields: [],
				},
			],
		}}
	/>
);

type CustomField = AbstractFormField<"custom", string> & { length: number };

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
							name: "Custom field",
							length: 10,
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

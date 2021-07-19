import React, { FC } from "react";
import { Box } from "ink";
import {
	Form,
	AbstractFormField,
	FormFieldString,
	FormFieldValueRendererProps,
	SpecificFormFieldRendererProps,
	FormField,
	FormSection,
} from "../../ink/form";
import TextInput from "ink-text-input";

type CustomField = AbstractFormField<"custom", string> & { regex: RegExp };

const FormDemoCustom: FC<{
	datas: {
		id: number;
		text: string;
		targets: string[];
	}[];
}> = ({ datas }) => {
	const formData: FormSection[] = datas
		.filter((d) => d.targets.length)
		.map((d) => {
			return {
				title: "" + d.id,
				fields: d.targets.map((t) => {
					return {
						type: "custom",
						name: t,
						description: "Hiragana or Katakana",
						regex: /^[\u3041-\u3096\u30A1-\u30FA]*$/,
					};
				}),
			};
		});

	return (
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
				sections: formData,
			}}
		/>
	);
};

export default FormDemoCustom;

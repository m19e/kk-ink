import React, { FC } from "react";
import { Box } from "ink";
import {
	Form,
	FormFieldString,
	FormFieldValueRendererProps,
	SpecificFormFieldRendererProps,
	FormSection,
} from "../../ink/form";
import TextInput from "ink-text-input";

const FormProvider: FC<{
	formData: FormSection[];
	update: (obj: object) => void;
}> = ({ formData, update }) => {
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

export default FormProvider;

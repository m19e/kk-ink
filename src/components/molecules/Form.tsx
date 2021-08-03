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
}> = ({ formData, update }) => (
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
					<Box borderStyle="round" borderColor="white" width="100%">
						<TextInput
							value={value ?? ""}
							onChange={(value) => {
								onChange(value);

								if (regex && !value.match(regex)) {
									onError(`ひらがなかカタカナでお願いします！`);
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
			title: "漢字の読み方、教えてください！",
			sections: formData,
		}}
	/>
);

export default FormProvider;

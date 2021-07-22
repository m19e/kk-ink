import { AbstractFormField } from "../ink/form";

export type LineData = {
	id: number;
	text: string;
	targets: string[];
};

export type CustomField = AbstractFormField<"custom", string> & {
	regex: RegExp;
};

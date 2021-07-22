import { AbstractFormField } from "../ink/form";

export type CustomField = AbstractFormField<"custom", string> & {
	regex: RegExp;
};

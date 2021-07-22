import { AbstractFormField } from "../ink/form";

type CustomField = AbstractFormField<"custom", string> & { regex: RegExp };

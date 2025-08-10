export interface FormType {
  id: string;
  name: string | "Untitled Form";
  formFields: FormFieldType[];
}

export type FieldType =
  | "checkbox"
  | "radio"
  | "textarea"
  | "text"
  | "number"
  | "date"
  | "select";

export interface BaseField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  error?: string | null;
}

// ---------------------------
// Field Variants
// ---------------------------

export interface TextFieldType extends BaseField {
  type: "text";
  placeholder: string;
  minLength: number;
  maxLength: number;
  isEmail: boolean;
  isPassword: boolean;
  includeNumber: boolean;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeSpecialChar: boolean;
}

export interface CheckBoxFieldType extends BaseField {
  type: "checkbox";
  options: (string | number)[]; // multiple values allowed
}

export interface RadioFieldType extends BaseField {
  type: "radio";
  options: (string | number)[]; // single selection
}

export interface SelectFieldType extends BaseField {
  type: "select";
  options: (string | number)[];
  isMultipleSelectAllowed: boolean;
}

export interface TextAreaFieldType extends BaseField {
  type: "textarea";
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

export interface NumberFieldType extends BaseField {
  type: "number";
  minValue?: number;
  maxValue?: number;
  placeholder?: string;
  isDecimalAllowed: boolean;
}

export interface DateFieldType extends BaseField {
  type: "date";
  minDate?: string; // YYYY-MM-DD
  maxDate?: string; // YYYY-MM-DD
}

// ---------------------------
// Union Type for Form Fields
// ---------------------------

export type FormFieldType =
  | CheckBoxFieldType
  | RadioFieldType
  | SelectFieldType
  | TextAreaFieldType
  | TextFieldType
  | NumberFieldType
  | DateFieldType;

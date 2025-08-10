import type {
  TextFieldType,
  CheckBoxFieldType,
  RadioFieldType,
  SelectFieldType,
  TextAreaFieldType,
  NumberFieldType,
  DateFieldType,
} from "../../lib/types/form";
import { z } from "zod";
import type { FormType } from "../../lib/types/form";

function getTextFieldSchema(
  field: TextFieldType
): z.ZodString | z.ZodOptional<z.ZodString> {
  const label = field.label?.trim() || "Enter here";
  let schema: unknown = z.string();
  if (field.isEmail) {
    schema = (schema as z.ZodString).email({
      message: "Invalid email address",
    });
  }
  if (field.minLength) {
    schema = (schema as z.ZodString).min(field.minLength, {
      message: `Must be at least ${field.minLength} characters`,
    });
  }
  if (field.maxLength) {
    schema = (schema as z.ZodString).max(field.maxLength, {
      message: `Must be at most ${field.maxLength} characters`,
    });
  }
  if (field.isPassword) {
    if (field.includeNumber)
      schema = (schema as z.ZodString).regex(/\d/, {
        message: "Must include a number",
      });
    if (field.includeLowercase)
      schema = (schema as z.ZodString).regex(/[a-z]/, {
        message: "Must include a lowercase letter",
      });
    if (field.includeUppercase)
      schema = (schema as z.ZodString).regex(/[A-Z]/, {
        message: "Must include an uppercase letter",
      });
    if (field.includeSpecialChar)
      schema = (schema as z.ZodString).regex(/[^a-zA-Z0-9]/, {
        message: "Must include a special character",
      });
  }
  if (field.required) {
    schema = (schema as z.ZodString).min(1, {
      message: `${label} is required`,
    });
  } else {
    schema = (schema as z.ZodString).optional();
  }
  return schema as z.ZodString | z.ZodOptional<z.ZodString>;
}

function getCheckBoxFieldSchema(field: CheckBoxFieldType) {
  const optionSchema = z.string();
  return z.preprocess(
    (val) => {
      if (val === undefined || val === false) return [];
      return val;
    },
    field.required
      ? z
          .array(optionSchema)
          .min(1, { message: `At least one answer is required` })
      : z.array(optionSchema).optional()
  );
}

function getRadioFieldSchema(field: RadioFieldType) {
  const optionSchema = z.union([z.string(), z.number()]).optional();

  if (field.required) {
    return z.preprocess(
      (val) =>
        val === "" || val === undefined || val === null ? undefined : val,
      optionSchema.refine(
        (val) => val !== undefined && field.options.includes(val),
        { message: `${field.label} is required` }
      )
    );
  } else {
    return z.preprocess(
      (val) =>
        val === "" || val === undefined || val === null ? undefined : val,
      optionSchema
    );
  }
}

function getSelectFieldSchema(field: SelectFieldType) {
  const optionSchema = z.union([z.string(), z.number()]).optional();

  if (field.required) {
    return z
      .preprocess(
        (val) =>
          val === "" || val === undefined || val === null ? undefined : val,
        optionSchema
      )
      .refine((val) => val !== undefined, {
        message: `${field.label} is required`,
      })
      .refine((val) => val === undefined || field.options.includes(val), {
        message: `Must select a valid option`,
      });
  } else {
    return z.preprocess(
      (val) =>
        val === "" || val === undefined || val === null ? undefined : val,
      optionSchema
    );
  }
}

function getTextAreaFieldSchema(field: TextAreaFieldType) {
  let schema: unknown = z.string();

  if (field.minLength != null) {
    schema = (schema as z.ZodString).min(field.minLength, {
      message: `Must be at least ${field.minLength} characters`,
    });
  }
  if (field.maxLength != null) {
    schema = (schema as z.ZodString).max(field.maxLength, {
      message: `Must be at most ${field.maxLength} characters`,
    });
  }
  if (field.required) {
    schema = (schema as z.ZodString).min(1, {
      message: `${field.label} is required`,
    });
  } else {
    schema = (schema as z.ZodString).optional();
  }
  return schema as z.ZodString | z.ZodOptional<z.ZodString>;
}

function getNumberFieldSchema(field: NumberFieldType) {
  let schema: unknown = field.isDecimalAllowed
    ? z.number()
    : z.number().refine((val) => Number.isInteger(val), {
        message: "Must be an integer",
      });

  if (field.minValue != null) {
    schema = (schema as z.ZodNumber).min(field.minValue, {
      message: `Minimum value is ${field.minValue}`,
    });
  }
  if (field.maxValue != null) {
    schema = (schema as z.ZodNumber).max(field.maxValue, {
      message: `Maximum value is ${field.maxValue}`,
    });
  }
  if (!field.required) {
    schema = (schema as z.ZodNumber).optional();
  }
  return schema as z.ZodNumber | z.ZodOptional<z.ZodNumber>;
}

function getDateFieldSchema(field: DateFieldType) {
  let schema: unknown = z
    .string()
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Date must be in YYYY-MM-DD format",
    });

  if (field.minDate) {
    schema = (schema as z.ZodString).refine((val) => val >= field.minDate!, {
      message: `Minimum date is ${field.minDate}`,
    });
  }
  if (field.maxDate) {
    schema = (schema as z.ZodString).refine((val) => val <= field.maxDate!, {
      message: `Maximum date is ${field.maxDate}`,
    });
  }
  if (field.required) {
    schema = (schema as z.ZodString).min(1, {
      message: `${field.label || "Enter here"} is required`,
    });
  } else {
    schema = (schema as z.ZodString).optional();
  }
  return schema as z.ZodString | z.ZodOptional<z.ZodString>;
}

export function buildFormSchema(form: FormType) {
  const shape: Record<string, any> = {};

  form.formFields.forEach((field) => {
    switch (field.type) {
      case "text":
        shape[field.id] = getTextFieldSchema(field as TextFieldType);
        break;
      case "checkbox":
        shape[field.id] = getCheckBoxFieldSchema(field as CheckBoxFieldType);
        break;
      case "radio":
        shape[field.id] = getRadioFieldSchema(field as RadioFieldType);
        break;
      case "select":
        shape[field.id] = getSelectFieldSchema(field as SelectFieldType);
        break;
      case "textarea":
        shape[field.id] = getTextAreaFieldSchema(field as TextAreaFieldType);
        break;
      case "number":
        shape[field.id] = getNumberFieldSchema(field as NumberFieldType);
        break;
      case "date":
        shape[field.id] = getDateFieldSchema(field as DateFieldType);
        break;
      default:
        break;
    }
  });

  return z.object(shape);
}

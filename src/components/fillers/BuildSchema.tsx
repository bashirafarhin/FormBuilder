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
// import type { ZodTypeAny } from "zod/v3";
import type { FormType } from "../../lib/types/form";

function getTextFieldSchema(field: TextFieldType) {
  let schema: z.ZodString | z.ZodOptional<z.ZodString> = z.string();

  // Email
  if (field.isEmail) {
    schema = schema.email({ message: "Invalid email address" });
  }

  // Min/Max length
  if (field.minLength) {
    schema = schema.min(field.minLength, {
      message: `Must be at least ${field.minLength} characters`,
    });
  }
  if (field.maxLength) {
    schema = schema.max(field.maxLength, {
      message: `Must be at most ${field.maxLength} characters`,
    });
  }

  if (field.isPassword) {
    if (field.includeNumber)
      schema = schema.regex(/\d/, { message: "Must include a number" });
    if (field.includeLowercase)
      schema = schema.regex(/[a-z]/, {
        message: "Must include a lowercase letter",
      });
    if (field.includeUppercase)
      schema = schema.regex(/[A-Z]/, {
        message: "Must include an uppercase letter",
      });
    if (field.includeSpecialChar)
      schema = schema.regex(/[^a-zA-Z0-9]/, {
        message: "Must include a special character",
      });
  }
  if (field.required) {
    schema = schema.min(1, { message: `${field.label} is required` });
  } else {
    schema = schema.optional();
  }
  return schema;
}

function getCheckBoxFieldSchema(field: CheckBoxFieldType) {
  const optionSchema = z.string();
  return z.preprocess(
    (val) => {
      if (val === undefined || val === false) return []; // normalize first submit
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
  let schema = z.string();
  if (field.minLength != null) {
    schema = schema.min(field.minLength, {
      message: `Must be at least ${field.minLength} characters`,
    });
  }
  if (field.maxLength != null) {
    schema = schema.max(field.maxLength, {
      message: `Must be at most ${field.maxLength} characters`,
    });
  }
  if (field.required) {
    schema = schema.min(1, { message: `${field.label} is required` });
  } else {
    schema = schema.optional();
  }
  return schema;
}

function getNumberFieldSchema(field: NumberFieldType) {
  let schema = field.isDecimalAllowed
    ? z.number()
    : z.number().refine((val) => Number.isInteger(val), {
        message: "Must be an integer",
      });
  if (field.minValue != null) {
    schema = schema.min(field.minValue, {
      message: `Minimum value is ${field.minValue}`,
    });
  }
  if (field.maxValue != null) {
    schema = schema.max(field.maxValue, {
      message: `Maximum value is ${field.maxValue}`,
    });
  }
  if (!field.required) {
    schema = schema.optional();
  }
  return schema;
}

export function getDateFieldSchema(field: DateFieldType) {
  let schema = z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Date must be in YYYY-MM-DD format",
  });
  if (field.minDate) {
    schema = schema.refine((val) => val >= field.minDate!, {
      message: `Minimum date is ${field.minDate}`,
    });
  }
  if (field.maxDate) {
    schema = schema.refine((val) => val <= field.maxDate!, {
      message: `Maximum date is ${field.maxDate}`,
    });
  }
  if (field.required) {
    schema = schema.min(1, { message: `${field.label} is required` });
  } else {
    schema = schema.optional();
  }
  return schema;
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

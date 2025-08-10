import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ZodTypeAny } from "zod/v3";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/Button";

import type {
  FormType,
  TextFieldType,
  CheckBoxFieldType,
  RadioFieldType,
  SelectFieldType,
  TextAreaFieldType,
  NumberFieldType,
  DateFieldType,
} from "../../lib/types/form";

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

  // Password rules
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

  // if (!field.required) {
  //   schema = schema.optional();
  // }
  if (field.required) {
    schema = schema.min(1, { message: `${field.label} is required` });
  } else {
    schema = schema.optional();
  }

  // else {
  //   schema=schema.required();
  // }
  // no annotation: let TypeScript infer the correct schema type
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

// Select: single selection
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

// Textarea: similar to text, usually no email/password rules
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

// Number
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

// Date
function getDateFieldSchema(field: DateFieldType) {
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

function buildFormSchema(form: FormType) {
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

const UserForm: React.FC<{
  form: FormType;
}> = ({ form }) => {
  const formSchema = useMemo(() => buildFormSchema(form), [form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto"
    >
      {form.formFields.map((field) => {
        switch (field.type) {
          case "text": {
            const f = field as TextFieldType;
            return (
              <div key={f.id} className="flex flex-col space-y-1">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  type={
                    f.isPassword ? "password" : f.isEmail ? "email" : "text"
                  }
                  placeholder={f.placeholder}
                  {...register(f.id)}
                  className={errors[f.id] ? "border-red-500" : ""}
                />
                {errors[f.id] && (
                  <p className="text-red-600 text-sm">
                    {errors[f.id]?.message?.toString()}
                  </p>
                )}
              </div>
            );
          }
          case "checkbox": {
            const f = field as CheckBoxFieldType;
            return (
              <div key={f.id} className="flex flex-col space-y-1">
                <Label>{f.label}</Label>
                <div className="flex flex-wrap gap-2">
                  {f.options.map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-1">
                      <input type="checkbox" value={opt} {...register(f.id)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                {errors[f.id] && (
                  <p className="text-red-600 text-sm">
                    {errors[f.id]?.message?.toString()}
                  </p>
                )}
              </div>
            );
          }
          case "radio": {
            const f = field as RadioFieldType;
            return (
              <div key={f.id} className="flex flex-col space-y-1">
                <Label>{f.label}</Label>
                <div className="flex gap-3">
                  {f.options.map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-1">
                      <input
                        type="radio"
                        value={opt}
                        {...register(f.id)}
                        name={f.id}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                {errors[f.id] && (
                  <p className="text-red-600 text-sm">
                    {errors[f.id]?.message?.toString()}
                  </p>
                )}
              </div>
            );
          }
          case "select": {
            const f = field as SelectFieldType;
            return (
              <div key={f.id} className="flex flex-col space-y-1">
                <Label htmlFor={f.id}>{f.label}</Label>
                <select
                  id={f.id}
                  {...register(f.id)}
                  className={errors[f.id] ? "border-red-500" : ""}
                >
                  <option value="">-- Select --</option>{" "}
                  {/* placeholder option */}
                  {f.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {/* <select
                  id={f.id}
                  {...register(f.id)}
                  className={errors[f.id] ? "border-red-500" : ""}
                >
                  {f.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select> */}
                {errors[f.id] && (
                  <p className="text-red-600 text-sm">
                    {errors[f.id]?.message?.toString()}
                  </p>
                )}
              </div>
            );
          }
          case "textarea": {
            const f = field as TextAreaFieldType;
            return (
              <div key={f.id} className="flex flex-col space-y-1">
                <Label htmlFor={f.id}>{f.label}</Label>
                <textarea
                  id={f.id}
                  placeholder={f.placeholder}
                  {...register(f.id)}
                  className={errors[f.id] ? "border-red-500" : ""}
                />
                {errors[f.id] && (
                  <p className="text-red-600 text-sm">
                    {errors[f.id]?.message?.toString()}
                  </p>
                )}
              </div>
            );
          }
          case "number": {
            const f = field as NumberFieldType;
            return (
              <div key={f.id} className="flex flex-col space-y-1">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  type="number"
                  placeholder={f.placeholder}
                  step={f.isDecimalAllowed ? "any" : "1"}
                  {...register(f.id)}
                  className={errors[f.id] ? "border-red-500" : ""}
                />
                {errors[f.id] && (
                  <p className="text-red-600 text-sm">
                    {errors[f.id]?.message?.toString()}
                  </p>
                )}
              </div>
            );
          }
          case "date": {
            const f = field as DateFieldType;
            return (
              <div key={f.id} className="flex flex-col space-y-1">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  type="date"
                  {...register(f.id)}
                  min={f.minDate}
                  max={f.maxDate}
                  className={errors[f.id] ? "border-red-500" : ""}
                />
                {errors[f.id] && (
                  <p className="text-red-600 text-sm">
                    {errors[f.id]?.message?.toString()}
                  </p>
                )}
              </div>
            );
          }
          default:
            return null;
        }
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UserForm;

// import { useMemo } from "react";
// import type { FormType } from "../lib/types/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "./ui/Button";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import type { TextFieldType } from "../lib/types/form";

// interface UserFormProps {
//   form: FormType;
// }

// const UserForm: React.FC<UserFormProps> = ({ form }) => {
//   const formSchema = useMemo(() => buildFormSchema(form), [form]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = (data: any) => {
//     console.log("Submitted data:", data);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6 max-w-lg mx-auto"
//     >
//       {form.formFields.map((field) => {
//         if (field.type === "text") {
//           const textField = field as TextFieldType;
//           return (
//             <div key={field.id} className="flex flex-col space-y-1">
//               <Label htmlFor={field.id}>{field.label}</Label>
//               <Input
//                 id={field.id}
//                 type={textField.isPassword ? "password" : "text"}
//                 placeholder={textField.placeholder}
//                 {...register(field.id)}
//                 className={errors[field.id] ? "border-red-500" : ""}
//               />
//               {errors[field.id] && (
//                 <p className="text-red-600 text-sm">
//                   {errors[field.id]?.message?.toString()}
//                 </p>
//               )}
//             </div>
//           );
//         }

//         return null; // Implement other field types later
//       })}
//       <Button type="submit">Submit</Button>
//     </form>
//   );
// };

// export default UserForm;
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ZodTypeAny } from "zod/v3";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Select } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/Button";

import type {
  FormType,
  FormFieldType,
  TextFieldType,
  CheckBoxFieldType,
  RadioFieldType,
  SelectFieldType,
  TextAreaFieldType,
  NumberFieldType,
  DateFieldType,
} from "../lib/types/form";

function getTextFieldSchema(field: TextFieldType): ZodTypeAny {
  const baseSchema = z.string();

  const validatedSchema = field.isEmail ? baseSchema.email() : baseSchema;

  // Add other validations here...

  const finalSchema = field.required
    ? validatedSchema
    : validatedSchema.optional();

  return finalSchema as z.ZodTypeAny;

  //   let schema = z.string();

  //   if (field.minLength) {
  //     schema = schema.min(field.minLength, {
  //       message: `${field.label} must be at least ${field.minLength} characters`,
  //     });
  //   }
  //   if (field.maxLength) {
  //     schema = schema.max(field.maxLength, {
  //       message: `${field.label} must be at most ${field.maxLength} characters`,
  //     });
  //   }
  //   if (field.isEmail) {
  //     schema = schema.email({ message: "Invalid email address" });
  //   }
  //   if (field.isPassword) {
  //     // Example password validation: at least 1 uppercase, 1 number, 1 special char
  //     schema = schema.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/, {
  //       message: "Password must include uppercase, number, and special character",
  //     });
  //   }
  //   if (field.required) {
  //     schema = schema.min(1, { message: `${field.label} is required` });
  //   } else {
  //     schema = schema.optional();
  //   }

  //   return schema;
}

function getCheckboxFieldSchema(field: CheckBoxFieldType): ZodTypeAny {
  let schema = z.array(z.union([z.string(), z.number()]));
  if (field.required) {
    schema = schema.min(1, {
      message: `${field.label} requires at least one selection`,
    });
  } else {
    schema = schema.optional();
  }
  return schema;
}

function getRadioFieldSchema(field: RadioFieldType): ZodTypeAny {
  let schema = z.union([z.string(), z.number()]);
  if (field.required) {
    schema = schema.refine(
      (val) => val !== undefined && val !== null && val !== "",
      {
        message: `${field.label} is required`,
      }
    );
  } else {
    schema = schema.optional();
  }
  return schema;
}

function getSelectFieldSchema(field: SelectFieldType): ZodTypeAny {
  let schema;
  if (field.multiple) {
    schema = z.array(z.union([z.string(), z.number()]));
    if (field.required) {
      schema = schema.min(1, {
        message: `${field.label} requires at least one selection`,
      });
    } else {
      schema = schema.optional();
    }
  } else {
    schema = z.union([z.string(), z.number()]);
    if (field.required) {
      schema = schema.refine(
        (val) => val !== undefined && val !== null && val !== "",
        {
          message: `${field.label} is required`,
        }
      );
    } else {
      schema = schema.optional();
    }
  }
  return schema;
}

function getTextAreaFieldSchema(field: TextAreaFieldType): ZodTypeAny {
  let schema = z.string();

  if (field.required) {
    schema = schema.min(1, { message: `${field.label} is required` });
  } else {
    schema = schema.optional();
  }

  if (field.minLength) {
    schema = schema.min(field.minLength, {
      message: `${field.label} must be at least ${field.minLength} characters`,
    });
  }
  if (field.maxLength) {
    schema = schema.max(field.maxLength, {
      message: `${field.label} must be at most ${field.maxLength} characters`,
    });
  }

  return schema;
}

function getNumberFieldSchema(field: NumberFieldType): ZodTypeAny {
  let schema = field.decimal ? z.number() : z.number().int();

  if (field.required) {
    schema = schema.refine((val) => val !== null && val !== undefined, {
      message: `${field.label} is required`,
    });
  } else {
    schema = schema.optional();
  }

  schema = schema.min(field.min, {
    message: `${field.label} minimum is ${field.min}`,
  });
  schema = schema.max(field.max, {
    message: `${field.label} maximum is ${field.max}`,
  });

  return schema;
}

function getDateFieldSchema(field: DateFieldType): ZodTypeAny {
  let schema = z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: `${field.label} must be a valid date`,
  });

  if (field.required) {
    schema = schema.min(1, { message: `${field.label} is required` });
  } else {
    schema = schema.optional();
  }

  if (field.minDate) {
    schema = schema.refine(
      (val) => !val || new Date(val) >= new Date(field.minDate!),
      {
        message: `${field.label} must be on or after ${field.minDate}`,
      }
    );
  }
  if (field.maxDate) {
    schema = schema.refine(
      (val) => !val || new Date(val) <= new Date(field.maxDate!),
      {
        message: `${field.label} must be on or before ${field.maxDate}`,
      }
    );
  }

  return schema;
}

function buildFormSchema(form: FormType) {
  const shape: Record<string, ZodTypeAny> = {};

  form.formFields.forEach((field) => {
    switch (field.type) {
      case "text":
        shape[field.id] = getTextFieldSchema(field as TextFieldType);
        break;
      case "checkbox":
        shape[field.id] = getCheckboxFieldSchema(field as CheckBoxFieldType);
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
        shape[field.id] = z.any().optional();
        break;
    }
  });

  return z.object(shape);
}

interface UserFormProps {
  form: FormType;
}

const UserForm: React.FC<UserFormProps> = ({ form }) => {
  const formSchema = useMemo(() => buildFormSchema(form), [form]);

  const {
    register,
    handleSubmit,
    control,
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
                <Controller
                  control={control}
                  name={f.id}
                  render={({ field: { value = [], onChange } }) => (
                    <div className="space-y-1">
                      {f.options.map((opt, idx) => (
                        <label key={idx} className="flex items-center gap-2">
                          <Checkbox
                            checked={value.includes(opt)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                onChange([...value, opt]);
                              } else {
                                onChange(value.filter((v: any) => v !== opt));
                              }
                            }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
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
                <Controller
                  control={control}
                  name={f.id}
                  render={({ field: { value, onChange } }) => (
                    <div className="space-y-1">
                      {f.options.map((opt, idx) => (
                        <label key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={value === opt}
                            onChange={() => onChange(opt)}
                            name={f.id}
                            value={opt}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
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
                <Controller
                  control={control}
                  name={f.id}
                  render={({ field }) => (
                    <Select
                      multiple={f.multiple}
                      {...field}
                      onChange={(e) => {
                        if (f.multiple) {
                          const selectedOptions = Array.from(
                            e.target.selectedOptions
                          ).map((opt) => opt.value);
                          field.onChange(selectedOptions);
                        } else {
                          field.onChange(e.target.value);
                        }
                      }}
                    >
                      <option value="">Select an option</option>
                      {f.options.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Select>
                  )}
                />
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
                <Textarea
                  id={f.id}
                  placeholder={f.placeholder || ""}
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
                  step={f.decimal ? "any" : "1"}
                  placeholder={f.placeholder || ""}
                  {...register(f.id, { valueAsNumber: true })}
                  className={errors[f.id] ? "border-red-500" : ""}
                  min={f.min}
                  max={f.max}
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
                  className={errors[f.id] ? "border-red-500" : ""}
                  min={f.minDate}
                  max={f.maxDate}
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

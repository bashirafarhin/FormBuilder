import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { buildFormSchema } from "./BuildSchema";

const UserForm: React.FC<{ form: FormType }> = ({ form }) => {
  const formSchema = useMemo(() => buildFormSchema(form), [form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {
    alert("Your Form has been successfully submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-zinc-700 flex flex-col rounded-lg shadow-lg space-y-6 p-6 bg-black"
      >
        <h1 className="text-[6vw] text-center font-semibold text-white">
          <i>{form.name}</i>
        </h1>
        {form.formFields.map((field) => {
          switch (field.type) {
            case "text": {
              const f = field as TextFieldType;
              return (
                <div key={f.id} className="flex flex-col space-y-1">
                  <Label htmlFor={f.id} className="text-zinc-200">
                    {f.label}
                  </Label>
                  <Input
                    id={f.id}
                    type={
                      f.isPassword ? "password" : f.isEmail ? "email" : "text"
                    }
                    placeholder={f.placeholder}
                    {...register(f.id)}
                    className={`bg-zinc-800 text-white border ${
                      errors[f.id] ? "border-red-600" : "border-zinc-700"
                    } focus:ring-zinc-600`}
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
                <div
                  key={f.id}
                  className="flex flex-col space-y-1 text-zinc-200"
                >
                  <Label>{f.label}</Label>
                  <div className="flex flex-wrap gap-2">
                    {f.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          value={opt}
                          {...register(f.id)}
                          className="accent-zinc-600"
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
            case "radio": {
              const f = field as RadioFieldType;
              return (
                <div
                  key={f.id}
                  className="flex flex-col space-y-1 text-zinc-200"
                >
                  <Label>{f.label}</Label>
                  <div className="flex gap-3">
                    {f.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-1">
                        <input
                          type="radio"
                          value={opt}
                          {...register(f.id)}
                          name={f.id}
                          className="accent-zinc-600"
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
                  <Label htmlFor={f.id} className="text-zinc-200">
                    {f.label}
                  </Label>
                  <select
                    id={f.id}
                    {...register(f.id)}
                    className={`bg-zinc-800 text-white border px-3 py-2 rounded-md focus:ring-zinc-600 ${
                      errors[f.id] ? "border-red-600" : "border-zinc-700"
                    }`}
                  >
                    <option value="">-- Select --</option>
                    {f.options.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
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
                  <Label htmlFor={f.id} className="text-zinc-200">
                    {f.label}
                  </Label>
                  <textarea
                    id={f.id}
                    placeholder={f.placeholder}
                    {...register(f.id)}
                    className={`bg-zinc-800 text-white border px-3 py-2 rounded-md focus:ring-zinc-600 resize-vertical ${
                      errors[f.id] ? "border-red-600" : "border-zinc-700"
                    }`}
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
                  <Label htmlFor={f.id} className="text-zinc-200">
                    {f.label}
                  </Label>
                  <Input
                    id={f.id}
                    type="number"
                    placeholder={f.placeholder}
                    step={f.isDecimalAllowed ? "any" : "1"}
                    {...register(f.id)}
                    className={`bg-zinc-800 text-white border ${
                      errors[f.id] ? "border-red-600" : "border-zinc-700"
                    } focus:ring-zinc-600`}
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
                  <Label htmlFor={f.id} className="text-zinc-200">
                    {f.label}
                  </Label>
                  <Input
                    id={f.id}
                    type="date"
                    {...register(f.id)}
                    min={f.minDate}
                    max={f.maxDate}
                    className={`bg-zinc-800 text-white border ${
                      errors[f.id] ? "border-red-600" : "border-zinc-700"
                    } focus:ring-zinc-600`}
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
        <Button
          type="submit"
          className="bg-zinc-700 hover:bg-zinc-600 text-white"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserForm;

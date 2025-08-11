import React from "react";
import type { TextAreaFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import { formActions } from "../../redux/features/form/formSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { X } from "lucide-react";

interface TextAreaFieldProps {
  fieldVal: TextAreaFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className={cn(
        fieldVal.error ? "border-red-600" : "border-zinc-700",
        "space-y-4 border rounded-lg p-4 bg-zinc-900"
      )}
    >
      <div className="w-full flex justify-between">
        <p className="text-base text-gray-500">Field type: Textarea</p>
        <button onClick={() => dispatch(formActions.removeField(fieldVal.id))}>
          <X />
        </button>
      </div>
      <div>
        <Label htmlFor="field-label" className="text-zinc-200">
          Label <span className="text-zinc-500">*</span>
        </Label>
        <Input
          id="label"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={(e) => onFieldChange("label", e.target.value)}
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      <div>
        <Label htmlFor="placeholder" className="block mb-1 text-zinc-200">
          Placeholder
        </Label>
        <Input
          id="placeholder"
          placeholder="Enter placeholder text"
          value={fieldVal.placeholder}
          onChange={(e) => onFieldChange("placeholder", e.target.value)}
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-zinc-200">
          <Checkbox
            checked={!!fieldVal.required}
            onCheckedChange={(checked) => onFieldChange("required", !!checked)}
            className="border-zinc-600 checked:bg-zinc-600"
          />
          Required
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minLength" className="block mb-1 text-zinc-200">
            Min Length
          </Label>
          <Input
            id="minLength"
            type="number"
            min={fieldVal.required ? 1 : 0} // HTML-level constraint
            value={
              fieldVal.required && (fieldVal.minLength ?? 0) < 1
                ? 1
                : fieldVal.minLength ?? 0
            }
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onFieldChange(
                "minLength",
                fieldVal.required ? Math.max(1, value) : value
              );
            }}
            className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
          />
        </div>

        <div>
          <Label htmlFor="maxLength" className="block mb-1 text-zinc-200">
            Max Length
          </Label>
          <Input
            id="maxLength"
            type="number"
            value={fieldVal.maxLength ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              onFieldChange("maxLength", val === "" ? "" : parseInt(val));
            }}
            className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
          />
        </div>
      </div>

      {fieldVal.error && (
        <p className="text-red-600 text-sm mt-1">{fieldVal.error}</p>
      )}
    </div>
  );
};

export default TextAreaField;

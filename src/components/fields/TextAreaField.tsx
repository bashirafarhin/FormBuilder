import React from "react";
import type { TextAreaFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";

interface TextAreaFieldProps {
  fieldVal: TextAreaFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  return (
    <div
      className={cn(
        fieldVal.error ? "border-red-500" : "border-gray-300",
        "space-y-4 border rounded-lg p-4"
      )}
    >
      <div>
        <Label htmlFor="field-label">
          Label <span className="text-gray-500">*</span>
        </Label>
        <Input
          id="label"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={(e) => onFieldChange("label", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="placeholder" className="block mb-1">
          Placeholder
        </Label>
        <Input
          id="placeholder"
          placeholder="Enter placeholder text"
          value={fieldVal.placeholder}
          onChange={(e) => onFieldChange("placeholder", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <Checkbox
            checked={!!fieldVal.required}
            onCheckedChange={(checked) => onFieldChange("required", !!checked)}
          />
          Required
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minLength" className="block mb-1">
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
          />
        </div>

        <div>
          <Label htmlFor="maxLength" className="block mb-1">
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
          />
        </div>
      </div>
      {fieldVal.error && (
        <p className="text-red-500 text-sm mt-1">{fieldVal.error}</p>
      )}
    </div>
  );
};

export default TextAreaField;

import React, { useState } from "react";
import type { RadioFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";

interface RadioFieldProps {
  fieldVal: RadioFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const RadioField: React.FC<RadioFieldProps> = ({ fieldVal, onFieldChange }) => {
  // Initialize options string from fieldVal.options array
  const [options, setOptions] = useState(
    Array.isArray(fieldVal.options) ? fieldVal.options.join(", ") : ""
  );

  const [isRequired, setIsRequired] = useState(!!fieldVal.required);

  // Handle options input change: update local and notify parent with array
  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOptions(val);

    const optionsArray = val
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);

    onFieldChange("options", optionsArray);
  };

  // Handle required checkbox toggle
  const handleRequiredChange = (checked: boolean) => {
    setIsRequired(checked);
    onFieldChange("required", checked);
  };

  // Handle label change
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("label", e.target.value);
  };

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
          id="radio-label"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={handleLabelChange}
        />
      </div>

      <div>
        <Label className="block mb-1" htmlFor="options">
          Options (comma-separated) <span className="text-gray-500">*</span>
        </Label>
        <Input
          id="radio-options"
          placeholder="e.g. Male, Female, Other"
          value={options}
          onChange={handleOptionsChange}
        />
      </div>

      <label className="flex items-center gap-2">
        <Checkbox
          checked={isRequired}
          onCheckedChange={(checked) => handleRequiredChange(!!checked)}
        />
        Required field
      </label>
      {fieldVal.error && (
        <p className="text-red-500 text-sm mt-1">{fieldVal.error}</p>
      )}
    </div>
  );
};

export default RadioField;

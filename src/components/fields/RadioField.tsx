import React, { useState } from "react";
import type { RadioFieldType } from "../../lib/types/form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

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
    <div className="space-y-4">
      <h4 className="text-md font-semibold">Radio Field</h4>

      <div>
        <Label htmlFor="radio-label" className="block mb-1">
          Label / Question
        </Label>
        <Input
          id="radio-label"
          placeholder="e.g. Select your gender"
          value={fieldVal.label}
          onChange={handleLabelChange}
        />
      </div>

      <div>
        <Label htmlFor="radio-options" className="block mb-1">
          Options (comma-separated)
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
    </div>
  );
};

export default RadioField;

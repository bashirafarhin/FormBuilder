import React, { useState } from "react";
import type { CheckBoxFieldType } from "../../lib/types/form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface CheckboxFieldProps {
  fieldVal: CheckBoxFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  // Initialize options string from fieldVal.options (assuming it's an array)
  const [options, setOptions] = useState(
    Array.isArray(fieldVal.options) ? fieldVal.options.join(", ") : ""
  );
  const [isRequired, setIsRequired] = useState(!!fieldVal.required);

  // When options string changes, parse and send updated array to parent
  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOptions(val);

    // Parse comma separated string to array, trim each option, filter empty strings
    const optionsArray = val
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);

    onFieldChange("options", optionsArray);
  };

  // Similarly for required checkbox
  const handleRequiredChange = (checked: boolean) => {
    setIsRequired(checked);
    onFieldChange("required", checked);
  };

  return (
    <div className="space-y-3">
      <h4 className="text-md font-semibold mb-2">
        Checkbox Field Configuration
      </h4>

      <div>
        <Label className="block mb-1" htmlFor="label">
          Label / Question
        </Label>
        <Input
          id="label"
          placeholder="e.g. Choose your hobbies"
          value={fieldVal.label}
          onChange={(e) => onFieldChange("label", e.target.value)}
        />
      </div>

      <div>
        <Label className="block mb-1" htmlFor="options">
          Options (comma-separated)
        </Label>
        <Input
          id="options"
          value={options}
          onChange={handleOptionsChange}
          placeholder="e.g. Reading, Swimming, Traveling"
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

export default CheckboxField;

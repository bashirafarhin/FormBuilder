import React, { useState } from "react";
import type { CheckBoxFieldType } from "../../lib/types/form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";

interface CheckboxFieldProps {
  fieldVal: CheckBoxFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  const [options, setOptions] = useState(
    Array.isArray(fieldVal.options) ? fieldVal.options.join(", ") : ""
  );
  const [isRequired, setIsRequired] = useState(!!fieldVal.required);

  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOptions(val);

    const optionsArray = val
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);

    onFieldChange("options", optionsArray);
  };

  const handleRequiredChange = (checked: boolean) => {
    setIsRequired(checked);
    onFieldChange("required", checked);
  };

  return (
    <div
      className={cn(
        fieldVal.error ? "border-red-600" : "border-zinc-700",
        "space-y-4 border rounded-lg p-4 bg-zinc-900"
      )}
    >
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
        <Label htmlFor="options" className="block mb-1 text-zinc-200">
          Options (comma-separated) <span className="text-zinc-500">*</span>
        </Label>
        <Input
          id="options"
          value={options}
          onChange={handleOptionsChange}
          placeholder="e.g. Reading, Swimming, Traveling"
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      <label className="flex items-center gap-2 text-zinc-200">
        <Checkbox
          checked={isRequired}
          onCheckedChange={(checked) => handleRequiredChange(!!checked)}
          className="border-zinc-600 checked:bg-zinc-600"
        />
        Required field
      </label>

      {fieldVal.error && (
        <p className="text-red-600 text-sm mt-1">{fieldVal.error}</p>
      )}
    </div>
  );
};

export default CheckboxField;

import React, { useState, useEffect } from "react";
import type { SelectFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";

interface SelectFieldProps {
  fieldVal: SelectFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  // Initialize local states from fieldVal
  const [label, setLabel] = useState(fieldVal.label || "");
  const [options, setOptions] = useState(
    Array.isArray(fieldVal.options) ? fieldVal.options.join(", ") : ""
  );
  const [required, setRequired] = useState(!!fieldVal.required);

  // Sync label changes
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLabel(val);
    onFieldChange("label", val);
  };

  // Sync options changes as comma separated string -> array
  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOptions(val);

    const optionsArray = val
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);

    onFieldChange("options", optionsArray);
  };

  // Sync required checkbox changes
  const handleRequiredChange = (checked: boolean) => {
    setRequired(checked);
    onFieldChange("required", checked);
  };

  // Optional: sync prop changes to local state if fieldVal updates externally
  useEffect(() => {
    setLabel(fieldVal.label || "");
    setOptions(
      Array.isArray(fieldVal.options) ? fieldVal.options.join(", ") : ""
    );
    setRequired(!!fieldVal.required);
  }, [fieldVal]);

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
          id="select-label"
          placeholder="Enter field label"
          value={label}
          onChange={handleLabelChange}
        />
      </div>

      <div>
        <Label className="block mb-1" htmlFor="options">
          Options (comma-separated) <span className="text-gray-500">*</span>
        </Label>
        <Input
          id="select-options"
          placeholder="e.g. Red, Green, Blue"
          value={options}
          onChange={handleOptionsChange}
        />
      </div>

      <label className="flex items-center gap-2">
        <Checkbox
          checked={required}
          onCheckedChange={(checked) => handleRequiredChange(!!checked)}
        />
        Required
      </label>
      {fieldVal.error && (
        <p className="text-red-500 text-sm mt-1">{fieldVal.error}</p>
      )}
    </div>
  );
};

export default SelectField;

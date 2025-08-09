import React, { useState, useEffect } from "react";
import type { SelectFieldType } from "../../lib/types/form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

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
  const [multiple, setMultiple] = useState(!!fieldVal.multiple);
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

  // Sync multiple checkbox changes
  const handleMultipleChange = (checked: boolean) => {
    setMultiple(checked);
    onFieldChange("multiple", checked);
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
    setMultiple(!!fieldVal.multiple);
    setRequired(!!fieldVal.required);
  }, [fieldVal]);

  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold">Select Field</h4>

      <div>
        <Label htmlFor="select-label" className="block mb-1">
          Label / Question
        </Label>
        <Input
          id="select-label"
          placeholder="Label / Question"
          value={label}
          onChange={handleLabelChange}
        />
      </div>

      <div>
        <Label htmlFor="select-options" className="block mb-1">
          Options (comma-separated)
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
          checked={multiple}
          onCheckedChange={(checked) => handleMultipleChange(!!checked)}
        />
        Allow multiple selections
      </label>

      <label className="flex items-center gap-2">
        <Checkbox
          checked={required}
          onCheckedChange={(checked) => handleRequiredChange(!!checked)}
        />
        Required
      </label>
    </div>
  );
};

export default SelectField;

import React, { useState, useEffect } from "react";
import type { SelectFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import { formActions } from "../../redux/features/form/formSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { X } from "lucide-react";

interface SelectFieldProps {
  fieldVal: SelectFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  // Initialize local states from fieldVal
  const dispatch = useDispatch<AppDispatch>();
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
        fieldVal.error ? "border-red-600" : "border-zinc-700",
        "space-y-4 border rounded-lg p-4 bg-zinc-900"
      )}
    >
      <div className="w-full flex justify-between">
        <p className="text-base text-gray-500">Field type: Select</p>
        <button onClick={() => dispatch(formActions.removeField(fieldVal.id))}>
          <X />
        </button>
      </div>
      <div>
        <Label htmlFor="field-label" className="text-zinc-200">
          Label <span className="text-zinc-500">*</span>
        </Label>
        <Input
          id="select-label"
          placeholder="Enter field label"
          value={label}
          onChange={handleLabelChange}
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      <div>
        <Label className="block mb-1 text-zinc-200" htmlFor="options">
          Options (comma-separated) <span className="text-zinc-500">*</span>
        </Label>
        <Input
          id="select-options"
          placeholder="e.g. Red, Green, Blue"
          value={options}
          onChange={handleOptionsChange}
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      <label className="flex items-center gap-2 text-zinc-200">
        <Checkbox
          checked={required}
          onCheckedChange={(checked) => handleRequiredChange(!!checked)}
          className="border-zinc-600 checked:bg-zinc-600"
        />
        Required
      </label>

      {fieldVal.error && (
        <p className="text-red-600 text-sm mt-1">{fieldVal.error}</p>
      )}
    </div>
  );
};

export default SelectField;

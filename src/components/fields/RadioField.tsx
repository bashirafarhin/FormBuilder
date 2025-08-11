import React, { useState } from "react";
import type { RadioFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import { formActions } from "../../redux/features/form/formSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { X } from "lucide-react";

interface RadioFieldProps {
  fieldVal: RadioFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const RadioField: React.FC<RadioFieldProps> = ({ fieldVal, onFieldChange }) => {
  const dispatch = useDispatch<AppDispatch>();
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

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("label", e.target.value);
  };

  return (
    <div
      className={cn(
        fieldVal.error ? "border-red-600" : "border-zinc-700",
        "space-y-4 border rounded-lg p-4 bg-zinc-900"
      )}
    >
      <div className="w-full flex justify-between">
        <p className="text-base text-gray-500">Field type: Radio</p>
        <button onClick={() => dispatch(formActions.removeField(fieldVal.id))}>
          <X />
        </button>
      </div>
      <div>
        <Label htmlFor="field-label" className="text-zinc-200">
          Label <span className="text-zinc-500">*</span>
        </Label>
        <Input
          id="radio-label"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={handleLabelChange}
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      <div>
        <Label className="block mb-1 text-zinc-200" htmlFor="options">
          Options (comma-separated) <span className="text-zinc-500">*</span>
        </Label>
        <Input
          id="radio-options"
          placeholder="e.g. Male, Female, Other"
          value={options}
          onChange={handleOptionsChange}
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

export default RadioField;

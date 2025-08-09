import React from "react";
import type { TextAreaFieldType } from "../../lib/types/form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface TextAreaFieldProps {
  fieldVal: TextAreaFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label" className="block mb-1">
          Label / Question
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
            value={fieldVal.minLength ?? 0}
            onChange={(e) =>
              onFieldChange("minLength", parseInt(e.target.value) || 0)
            }
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
    </div>
  );
};

export default TextAreaField;

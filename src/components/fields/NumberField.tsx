import React from "react";
import type { NumberFieldType } from "../../lib/types/form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface NumberFieldProps {
  fieldVal: NumberFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold">Number Field</h4>

      <div>
        <Label htmlFor="label" className="block mb-1">
          Label / Question
        </Label>
        <Input
          id="label"
          placeholder="Label / Question"
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
          placeholder="Placeholder"
          value={fieldVal.placeholder ?? ""}
          onChange={(e) => onFieldChange("placeholder", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="min" className="block mb-1">
          Min Value
        </Label>
        <Input
          id="min"
          type="number"
          value={fieldVal.min ?? 0}
          onChange={(e) =>
            onFieldChange(
              "min",
              e.target.value === "" ? 0 : Number(e.target.value)
            )
          }
        />
      </div>

      <div>
        <Label htmlFor="max" className="block mb-1">
          Max Value
        </Label>
        <Input
          id="max"
          type="number"
          value={fieldVal.max ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onFieldChange("max", val === "" ? "" : Number(val));
          }}
        />
      </div>

      <label className="flex items-center gap-2">
        <Checkbox
          checked={!!fieldVal.decimal}
          onCheckedChange={(checked) => onFieldChange("decimal", !!checked)}
        />
        Allow Decimal
      </label>

      <label className="flex items-center gap-2">
        <Checkbox
          checked={!!fieldVal.required}
          onCheckedChange={(checked) => onFieldChange("required", !!checked)}
        />
        Required
      </label>
    </div>
  );
};

export default NumberField;

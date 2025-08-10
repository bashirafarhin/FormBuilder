import React from "react";
import type { NumberFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";

interface NumberFieldProps {
  fieldVal: NumberFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
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
          placeholder="Placeholder"
          value={fieldVal.placeholder ?? ""}
          onChange={(e) => onFieldChange("placeholder", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minValue" className="block mb-1">
            Min Value
          </Label>
          <Input
            id="min"
            type="number"
            value={fieldVal.minValue ?? 0}
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
            value={fieldVal.maxValue ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              onFieldChange("maxValue", val === "" ? "" : Number(val));
            }}
          />
        </div>
      </div>

      <label className="flex items-center gap-2">
        <Checkbox
          checked={!!fieldVal.isDecimalAllowed}
          onCheckedChange={(checked) =>
            onFieldChange("isDecimalAllowed", !!checked)
          }
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
      {fieldVal.error && (
        <p className="text-red-500 text-sm mt-1">{fieldVal.error}</p>
      )}
    </div>
  );
};

export default NumberField;

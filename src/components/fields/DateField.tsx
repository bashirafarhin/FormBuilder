import React from "react";
import type { DateFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";

interface DateFieldProps {
  fieldVal: DateFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const DateField: React.FC<DateFieldProps> = ({ fieldVal, onFieldChange }) => {
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
          id="date-label"
          type="text"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={(e) => onFieldChange("label", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date-min" className="block mb-1">
            Min Date
          </Label>
          <Input
            id="date-min"
            type="date"
            value={fieldVal.minDate || ""}
            onChange={(e) => onFieldChange("minDate", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="date-max" className="block mb-1">
            Max Date
          </Label>
          <Input
            id="date-max"
            type="date"
            value={fieldVal.maxDate || ""}
            onChange={(e) => onFieldChange("maxDate", e.target.value)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2">
        <Checkbox
          checked={fieldVal.required || false}
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

export default DateField;

import React from "react";
import type { DateFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import { formActions } from "../../redux/features/form/formSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { X } from "lucide-react";

interface DateFieldProps {
  fieldVal: DateFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const DateField: React.FC<DateFieldProps> = ({ fieldVal, onFieldChange }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      className={cn(
        fieldVal.error ? "border-red-600" : "border-zinc-700",
        "space-y-4 border rounded-lg p-4 bg-zinc-900"
      )}
    >
      <div className="w-full flex justify-between">
        <p className="text-base text-gray-500">Field type: Date</p>
        <button onClick={() => dispatch(formActions.removeField(fieldVal.id))}>
          <X />
        </button>
      </div>
      <div>
        <Label htmlFor="field-label" className="text-zinc-200">
          Label <span className="text-zinc-500">*</span>
        </Label>
        <Input
          id="date-label"
          type="text"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={(e) => onFieldChange("label", e.target.value)}
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date-min" className="block mb-1 text-zinc-200">
            Min Date
          </Label>
          <Input
            id="date-min"
            type="date"
            value={fieldVal.minDate || ""}
            onChange={(e) => onFieldChange("minDate", e.target.value)}
            className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
          />
        </div>

        <div>
          <Label htmlFor="date-max" className="block mb-1 text-zinc-200">
            Max Date
          </Label>
          <Input
            id="date-max"
            type="date"
            value={fieldVal.maxDate || ""}
            onChange={(e) => onFieldChange("maxDate", e.target.value)}
            className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-zinc-200">
        <Checkbox
          checked={fieldVal.required || false}
          onCheckedChange={(checked) => onFieldChange("required", !!checked)}
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

export default DateField;

import React from "react";
import type { NumberFieldType } from "../../lib/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import { formActions } from "../../redux/features/form/formSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { X } from "lucide-react";

interface NumberFieldProps {
  fieldVal: NumberFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({
  fieldVal,
  onFieldChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className={cn(
        fieldVal.error ? "border-red-600" : "border-zinc-700",
        "space-y-4 border rounded-lg p-4 bg-zinc-900"
      )}
    >
      <div className="w-full flex justify-between">
        <p className="text-base text-gray-500">Field type: Number</p>
        <button onClick={() => dispatch(formActions.removeField(fieldVal.id))}>
          <X />
        </button>
      </div>
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
        <Label htmlFor="placeholder" className="block mb-1 text-zinc-200">
          Placeholder
        </Label>
        <Input
          id="placeholder"
          placeholder="Placeholder"
          value={fieldVal.placeholder ?? ""}
          onChange={(e) => onFieldChange("placeholder", e.target.value)}
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minValue" className="block mb-1 text-zinc-200">
            Min Value
          </Label>
          <Input
            id="min"
            type="number"
            value={fieldVal.minValue ?? 0}
            onChange={(e) =>
              onFieldChange(
                "minValue",
                e.target.value === "" ? 0 : Number(e.target.value)
              )
            }
            className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
          />
        </div>

        <div>
          <Label htmlFor="maxValue" className="block mb-1 text-zinc-200">
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
            className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-zinc-200">
        <Checkbox
          checked={!!fieldVal.isDecimalAllowed}
          onCheckedChange={(checked) =>
            onFieldChange("isDecimalAllowed", !!checked)
          }
          className="border-zinc-600 checked:bg-zinc-600"
        />
        Allow Decimal
      </label>

      <label className="flex items-center gap-2 text-zinc-200">
        <Checkbox
          checked={!!fieldVal.required}
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

export default NumberField;

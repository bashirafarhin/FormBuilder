import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import type { TextFieldType } from "../../lib/types/form";
import { cn } from "../../lib/utils";
import { formActions } from "../../redux/features/form/formSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { X } from "lucide-react";

interface TextFieldProps {
  fieldVal: TextFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const TextField: React.FC<TextFieldProps> = ({ fieldVal, onFieldChange }) => {
  onFieldChange;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className={cn(
        fieldVal.error ? "border-red-600" : "border-zinc-700",
        "space-y-4 border rounded-lg p-4 bg-zinc-900"
      )}
    >
      <div className="w-full flex justify-between">
        <p className="text-base text-gray-500">Field type: Text</p>
        <button onClick={() => dispatch(formActions.removeField(fieldVal.id))}>
          <X />
        </button>
      </div>
      <div>
        <Label htmlFor="field-label" className="text-zinc-200">
          Label <span className="text-zinc-500">*</span>
        </Label>

        <Input
          id="field-label"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={(e) => onFieldChange("label", e.target.value)}
          className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
        />
      </div>

      {/* Placeholder */}
      {!fieldVal.isDerived && (
        <div>
          <Label htmlFor="placeholder" className="text-zinc-200">
            Placeholder
          </Label>
          <Input
            id="placeholder"
            placeholder="Enter placeholder text"
            value={fieldVal.placeholder}
            onChange={(e) => onFieldChange("placeholder", e.target.value)}
            className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
          />
        </div>
      )}

      {/* Derived Field Option */}
      <div className="flex items-center gap-2 mt-4">
        <Checkbox
          checked={!!fieldVal.isDerived}
          onCheckedChange={(checked) => onFieldChange("isDerived", checked)}
          className="border-zinc-600 checked:bg-zinc-600"
        />
        Derived Field
      </div>

      {/* {fieldVal.isDerived && (
        <div className="space-y-2 mt-2">
          <div>
            <Label className="text-zinc-200">Parent Fields (IDs)</Label>
            <Input
              placeholder="e.g. label"
              value={fieldVal.parentFields?.join(",") || ""}
              onChange={(e) =>
                onFieldChange(
                  "parentFields",
                  e.target.value.split(",").map((id) => id.trim())
                )
              }
              className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
            />
          </div>
          <div>
            <Label className="text-zinc-200">Formula</Label>
            <Input
              placeholder="e.g. field1 + field2"
              value={fieldVal.formula || ""}
              onChange={(e) => onFieldChange("formula", e.target.value)}
              className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
            />
          </div>
        </div>
      )} */}
      {fieldVal.isDerived && (
        <div className="space-y-2 mt-2">
          {/* Parent Fields Input */}
          <div>
            <Label className="text-zinc-200">Parent Fields (Labels)</Label>
            <Input
              placeholder="e.g. First Name, Last Name"
              value={fieldVal.parentFields?.join(", ") || ""}
              onChange={(e) =>
                onFieldChange(
                  "parentFields",
                  e.target.value.split(",").map((label) => label.trim())
                )
              }
              className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
            />
          </div>

          {/* Formula Input */}
          <div>
            <Label className="text-zinc-200">Formula</Label>
            <Input
              placeholder="e.g. {First Name} + ' ' + {Last Name}"
              value={fieldVal.formula || ""}
              onChange={(e) => onFieldChange("formula", e.target.value)}
              className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
            />
          </div>
        </div>
      )}

      {/* Min / Max length */}
      {!fieldVal.isDerived && (
        <div>
          <div className="flex flex-col gap-2 text-zinc-200">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={!!fieldVal.required}
                onCheckedChange={(checked) =>
                  onFieldChange("required", checked)
                }
                className="border-zinc-600 checked:bg-zinc-600"
              />
              Required
            </label>

            <label className="flex items-center gap-2">
              <Checkbox
                checked={!!fieldVal.isEmail}
                onCheckedChange={(checked) => {
                  onFieldChange("isEmail", checked);
                  if (checked) onFieldChange("isPassword", false);
                }}
                className="border-zinc-600 checked:bg-zinc-600"
              />
              Is Email
            </label>

            <label className="flex items-center gap-2">
              <Checkbox
                checked={!!fieldVal.isPassword}
                onCheckedChange={(checked) => {
                  onFieldChange("isPassword", checked);
                  if (checked) onFieldChange("isEmail", false);
                }}
                className="border-zinc-600 checked:bg-zinc-600"
              />
              Is Password
            </label>
          </div>
          {!fieldVal.isEmail && !fieldVal.isPassword && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minLength" className="text-zinc-200">
                  Min Length
                </Label>
                <Input
                  id="minLength"
                  type="number"
                  min={fieldVal.required ? 1 : 0} // UI restriction
                  value={
                    fieldVal.required && fieldVal.minLength === 0
                      ? 1
                      : fieldVal.minLength ?? 0
                  }
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    onFieldChange(
                      "minLength",
                      fieldVal.required ? Math.max(1, value) : value
                    );
                  }}
                  className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
                />
              </div>

              <div>
                <Label htmlFor="maxLength" className="text-zinc-200">
                  Max Length
                </Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={fieldVal.maxLength ?? ""}
                  onChange={(e) =>
                    onFieldChange(
                      "maxLength",
                      e.target.value ? parseInt(e.target.value) : ""
                    )
                  }
                  className="bg-zinc-800 text-white border-zinc-700 focus:ring-zinc-600"
                />
              </div>
            </div>
          )}

          {/* Password rules */}
          {fieldVal.isPassword && (
            <div className="space-y-2 text-zinc-200">
              <h4 className="text-sm font-semibold">Password Rules</h4>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked
                  disabled
                  className="border-zinc-600 checked:bg-zinc-600"
                />
                Min Length: 6 (Always enabled)
              </label>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={!!fieldVal.includeNumber}
                  onCheckedChange={(checked) =>
                    onFieldChange("includeNumber", checked)
                  }
                  className="border-zinc-600 checked:bg-zinc-600"
                />
                Must include number
              </label>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={!!fieldVal.includeLowercase}
                  onCheckedChange={(checked) =>
                    onFieldChange("includeLowercase", checked)
                  }
                  className="border-zinc-600 checked:bg-zinc-600"
                />
                Must include lowercase letter
              </label>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={!!fieldVal.includeUppercase}
                  onCheckedChange={(checked) =>
                    onFieldChange("includeUppercase", checked)
                  }
                  className="border-zinc-600 checked:bg-zinc-600"
                />
                Must include uppercase letter
              </label>

              <label className="flex items-center gap-2">
                <Checkbox
                  checked={!!fieldVal.includeSpecialChar}
                  onCheckedChange={(checked) =>
                    onFieldChange("includeSpecialChar", checked)
                  }
                  className="border-zinc-600 checked:bg-zinc-600"
                />
                Must include special character
              </label>
            </div>
          )}
          {fieldVal.error && (
            <p className="text-red-600 text-sm mt-1">{fieldVal.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TextField;

import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import type { TextFieldType } from "../../lib/types/form";
import { cn } from "../../lib/utils";

interface TextFieldProps {
  fieldVal: TextFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const TextField: React.FC<TextFieldProps> = ({ fieldVal, onFieldChange }) => {
  onFieldChange;

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
          id="field-label"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={(e) => onFieldChange("label", e.target.value)}
        />
      </div>

      {/* Placeholder */}
      <div>
        <Label htmlFor="placeholder">Placeholder</Label>
        <Input
          id="placeholder"
          placeholder="Enter placeholder text"
          value={fieldVal.placeholder}
          onChange={(e) => onFieldChange("placeholder", e.target.value)}
        />
      </div>

      {/* Checkbox group */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <Checkbox
            checked={!!fieldVal.required}
            onCheckedChange={(checked) => onFieldChange("required", checked)}
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
          />
          Is Password
        </label>
      </div>

      {/* Min / Max length */}
      {!fieldVal.isEmail && !fieldVal.isPassword && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minLength">Min Length</Label>
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
            />
          </div>

          <div>
            <Label htmlFor="maxLength">Max Length</Label>
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
            />
          </div>
        </div>
      )}

      {/* Password rules */}
      {fieldVal.isPassword && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Password Rules</h4>

          <label className="flex items-center gap-2">
            <Checkbox checked disabled />
            Min Length: 6 (Always enabled)
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={!!fieldVal.includeNumber}
              onCheckedChange={(checked) =>
                onFieldChange("includeNumber", checked)
              }
            />
            Must include number
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={!!fieldVal.includeLowercase}
              onCheckedChange={(checked) =>
                onFieldChange("includeLowercase", checked)
              }
            />
            Must include lowercase letter
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={!!fieldVal.includeUppercase}
              onCheckedChange={(checked) =>
                onFieldChange("includeUppercase", checked)
              }
            />
            Must include uppercase letter
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={!!fieldVal.includeSpecialChar}
              onCheckedChange={(checked) =>
                onFieldChange("includeSpecialChar", checked)
              }
            />
            Must include special character
          </label>
        </div>
      )}
      {fieldVal.error && (
        <p className="text-red-500 text-sm mt-1">{fieldVal.error}</p>
      )}
    </div>
  );
};

export default TextField;

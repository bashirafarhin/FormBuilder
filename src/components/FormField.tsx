import React, { useState } from "react";
import Dropdown from "../components/ui/Dropdown";
import { FIELD_TYPES } from "../lib/form";
import FieldConfig from "./FieldConfig";

type Props = {
  fieldIndex: number;
  allFields: { id: string; label: string }[]; // 🔁 new
  currentFieldId: string; // 🔁 new
};

const FormField: React.FC<Props> = ({
  fieldIndex,
  allFields,
  currentFieldId,
}) => {
  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <div
      className={`border p-4 rounded-md space-y-4 ${
        !selectedType ? "border-red-500" : "border-green-400"
      }`}
    >
      <p className="font-medium mb-2">Field #{fieldIndex + 1}</p>

      <Dropdown
        label="Add form field type"
        options={FIELD_TYPES}
        selected={selectedType}
        onChange={setSelectedType}
        className="w-full"
        classNameList="bg-white dark:bg-gray-800"
      />

      {/* Show field config once a type is selected */}
      {selectedType && (
        <FieldConfig
          fieldType={selectedType}
          allFields={allFields}
          currentFieldId={currentFieldId}
        />
      )}
    </div>
  );
};

export default FormField;

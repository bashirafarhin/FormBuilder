// import { useState } from "react";

// const DateField: React.FC = () => {
//   const [label, setLabel] = useState("");
//   const [minDate, setMinDate] = useState("");
//   const [maxDate, setMaxDate] = useState("");
//   const [required, setRequired] = useState(false);

//   return (
//     <div className="space-y-4">
//       <h4 className="text-md font-semibold">Date Field</h4>
//       <input
//         type="text"
//         placeholder="Label / Question"
//         value={label}
//         onChange={(e) => setLabel(e.target.value)}
//         className="w-full p-2 border rounded-md"
//       />
//       <input
//         type="date"
//         placeholder="Min Date"
//         value={minDate}
//         onChange={(e) => setMinDate(e.target.value)}
//         className="w-full p-2 border rounded-md"
//       />
//       <input
//         type="date"
//         placeholder="Max Date"
//         value={maxDate}
//         onChange={(e) => setMaxDate(e.target.value)}
//         className="w-full p-2 border rounded-md"
//       />
//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           checked={required}
//           onChange={(e) => setRequired(e.target.checked)}
//         />
//         Required
//       </label>
//     </div>
//   );
// };

// export default DateField;
import React from "react";
import type { DateFieldType } from "../../lib/types/form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface DateFieldProps {
  fieldVal: DateFieldType;
  onFieldChange: (key: string, value: any) => void;
}

const DateField: React.FC<DateFieldProps> = ({ fieldVal, onFieldChange }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold">Date Field</h4>

      <div>
        <Label htmlFor="date-label" className="block mb-1">
          Label / Question
        </Label>
        <Input
          id="date-label"
          type="text"
          placeholder="Enter field label"
          value={fieldVal.label}
          onChange={(e) => onFieldChange("label", e.target.value)}
        />
      </div>

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

      <label className="flex items-center gap-2">
        <Checkbox
          checked={fieldVal.required || false}
          onCheckedChange={(checked) => onFieldChange("required", !!checked)}
        />
        Required
      </label>
    </div>
  );
};

export default DateField;

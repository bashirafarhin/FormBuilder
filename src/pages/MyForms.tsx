import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormType } from "../lib/types/form";

const MyForms = () => {
  const [forms, setForms] = useState<FormType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = localStorage.getItem("forms");
    if (storedForms) {
      setForms(JSON.parse(storedForms));
    }
  }, []);

  if (forms.length === 0) {
    return (
      <div
        className="cursor-pointer p-6 border border-gray-400 rounded-md text-center mt-10"
        onClick={() => navigate("/create")}
      >
        No forms found. Click here to create a new form.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {forms.map((form) => (
        <div
          key={form.id}
          className="cursor-pointer p-4 border border-blue-400 rounded-md hover:bg-blue-50"
          onClick={() => navigate(`/preview/${form.id}`)}
        >
          <h2 className="text-lg font-semibold">
            {form.name || "Untitled Form"}
          </h2>
          <p>{form.formFields.length} fields</p>
        </div>
      ))}
    </div>
  );
};

export default MyForms;

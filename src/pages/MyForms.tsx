import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormType } from "../lib/types/form";
import { Button } from "../components/ui/Button";

const MyForms = () => {
  const [forms, setForms] = useState<FormType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = localStorage.getItem("forms");
    if (storedForms) {
      setForms(JSON.parse(storedForms));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-center mt-40">
      {/* Forms list or empty message */}
      {forms.length === 0 ? (
        <div className="flex flex-col items-center space-y-4">
          <p>No forms found.</p>
          <Button onClick={() => navigate("/create")}>
            Click here to create a new form.
          </Button>
        </div>
      ) : (
        <div className="space-y-4 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-2">Previous Forms</h2>
          {forms.map((form) => (
            <div
              key={form.id}
              className="cursor-pointer p-4 border border-zinc-700 rounded-md hover:bg-zinc-900 transition"
              onClick={() => navigate(`/preview/${form.id}`)}
            >
              <h3 className="text-lg font-semibold">
                {form.name || "Untitled Form"}
              </h3>
              <p className="text-gray-600">{form.formFields.length} fields</p>
              <p className="text-gray-600">
                Created At:{" "}
                {form.createdAt
                  ? new Date(form.createdAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyForms;

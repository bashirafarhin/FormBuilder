import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { FormType } from "../lib/types/form";
import UserForm from "../components/userForm";

const PreviewForm = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<FormType | null>(null);

  useEffect(() => {
    if (!id) return;

    const storedForms = localStorage.getItem("forms");
    if (storedForms) {
      const formsArray: FormType[] = JSON.parse(storedForms);
      const foundForm = formsArray.find((f) => f.id === id);
      if (foundForm) {
        setForm(foundForm);
      }
    }
  }, [id]);

  if (!form) return <div>Form not found or loading...</div>;

  return <UserForm form={form} />;
};

export default PreviewForm;

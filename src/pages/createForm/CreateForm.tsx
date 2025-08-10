import { useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { formActions } from "../../redux/features/form/formSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TextField from "../../components/fields/TextField";
import type {
  CheckBoxFieldType,
  DateFieldType,
  FormFieldType,
  NumberFieldType,
  RadioFieldType,
  SelectFieldType,
  TextAreaFieldType,
  TextFieldType,
} from "../../lib/types/form";
import AddFieldButton from "./AddFieldButton";
import type { FieldType } from "../../lib/types/form";
import CheckboxField from "../../components/fields/CheckboxField";
import RadioField from "../../components/fields/RadioField";
import SelectField from "../../components/fields/SelectField";
import TextAreaField from "../../components/fields/TextAreaField";
import NumberField from "../../components/fields/NumberField";
import DateField from "../../components/fields/DateField";
import type { FormType } from "../../lib/types/form";
import DraggableFieldsList from "./DraggableFieldList";

const CreateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const form = useSelector((state: RootState) => state.form.data);

  useEffect(() => {
    dispatch(
      formActions.createForm({
        id: uuidv4(),
        name: "Untitled Form",
        formFields: [],
      })
    );
  }, [dispatch]);

  const handleFieldChange = (id: string, key: string, value: any) => {
    dispatch(formActions.updateField({ id, key, value }));
  };

  const addFieldByType = (type: FieldType[number]) => {
    let newField: FormFieldType;
    switch (type) {
      case "text":
        newField = {
          id: uuidv4(),
          label: "",
          type: "text",
          required: false,
          placeholder: "",
          minLength: 0,
          maxLength: 3000,
          isEmail: false,
          isPassword: false,
          includeNumber: true,
          includeLowercase: false,
          includeUppercase: false,
          includeSpecialChar: false,
        } as TextFieldType;
        break;
      case "checkbox":
        newField = {
          id: uuidv4(),
          label: "",
          type: "checkbox",
          required: false,
          options: [],
        } as CheckBoxFieldType;
        break;
      case "radio":
        newField = {
          id: uuidv4(),
          label: "",
          type: "radio",
          required: false,
          options: [],
        } as RadioFieldType;
        break;
      case "select":
        newField = {
          id: uuidv4(),
          label: "",
          type: "select",
          required: false,
          options: [],
        } as SelectFieldType;
        break;
      case "textarea":
        newField = {
          id: uuidv4(),
          label: "",
          type: "textarea",
          required: false,
          placeholder: "",
          minLength: 0,
          maxLength: 3000,
        } as TextAreaFieldType;
        break;
      case "number":
        newField = {
          id: uuidv4(),
          label: "",
          type: "number",
          required: false,
          placeholder: "",
          minValue: 0,
          maxValue: 10000,
          isDecimalAllowed: false,
        } as NumberFieldType;
        break;
      case "date":
        newField = {
          id: uuidv4(),
          label: "",
          type: "date",
          required: false,
          minDate: "",
          maxDate: "",
        } as DateFieldType;
        break;
      default:
        newField = {
          id: uuidv4(),
          label: "Add label",
          type,
          required: false,
        } as FormFieldType;
        break;
    }
    dispatch(formActions.addField(newField));
  };

  const handleSaveClick = () => {
    let isValid = true;
    form.formFields.forEach((field) => {
      dispatch(formActions.setFieldError({ id: field.id, error: null }));
      // Check for empty label
      if (!field.label.trim()) {
        dispatch(
          formActions.setFieldError({
            id: field.id,
            error: "Label is required",
          })
        );
        isValid = false;
      }
      // Check for options if applicable
      if (
        (field.type === "checkbox" ||
          field.type === "radio" ||
          field.type === "select") &&
        "options" in field &&
        (!field.options || field.options.length === 0)
      ) {
        dispatch(
          formActions.setFieldError({
            id: field.id,
            error: "At least one option is required",
          })
        );
        isValid = false;
      }
    });
    if (!isValid) return;
    const storedForms = localStorage.getItem("forms");
    let formsArray: FormType[] = storedForms ? JSON.parse(storedForms) : [];
    formsArray.push(form);
    localStorage.setItem("forms", JSON.stringify(formsArray));
    navigate(`/preview/${form.id}`);
  };

  const handleReorderFields = (newFields: FormFieldType[]) => {
    dispatch(formActions.setFormFields(newFields));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border border-zinc-700 flex flex-col rounded-lg shadow-lg space-y-6 p-6">
        <h1 className="text-[6vw] text-center font-semibold text-white">
          <i>Create Form</i>
        </h1>

        <Input
          value={form.name}
          onChange={(e) => dispatch(formActions.updateFormName(e.target.value))}
          placeholder="Enter form name"
          className="w-fit mx-auto text-center bg-zinc-800 text-white border border-zinc-700 rounded-md px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-500
          transition-colors duration-200"
        />

        <DraggableFieldsList
          fields={form.formFields}
          onReorder={handleReorderFields}
          renderField={(field) => {
            switch (field.type) {
              case "text":
                return (
                  <TextField
                    key={field.id}
                    fieldVal={field as TextFieldType}
                    onFieldChange={(key: string, value: any) =>
                      handleFieldChange(field.id, key, value)
                    }
                  />
                );
              case "checkbox":
                return (
                  <CheckboxField
                    key={field.id}
                    fieldVal={field as CheckBoxFieldType}
                    onFieldChange={(key: string, value: any) =>
                      handleFieldChange(field.id, key, value)
                    }
                  />
                );
              case "radio":
                return (
                  <RadioField
                    key={field.id}
                    fieldVal={field as RadioFieldType}
                    onFieldChange={(key: string, value: any) =>
                      handleFieldChange(field.id, key, value)
                    }
                  />
                );
              case "textarea":
                return (
                  <TextAreaField
                    key={field.id}
                    fieldVal={field as TextAreaFieldType}
                    onFieldChange={(key: string, value: any) =>
                      handleFieldChange(field.id, key, value)
                    }
                  />
                );
              case "number":
                return (
                  <NumberField
                    key={field.id}
                    fieldVal={field as NumberFieldType}
                    onFieldChange={(key: string, value: any) =>
                      handleFieldChange(field.id, key, value)
                    }
                  />
                );
              case "select":
                return (
                  <SelectField
                    key={field.id}
                    fieldVal={field as SelectFieldType}
                    onFieldChange={(key: string, value: any) =>
                      handleFieldChange(field.id, key, value)
                    }
                  />
                );
              case "date":
                return (
                  <DateField
                    key={field.id}
                    fieldVal={field as DateFieldType}
                    onFieldChange={(key: string, value: any) =>
                      handleFieldChange(field.id, key, value)
                    }
                  />
                );
              default:
                return <p className="text-red-500">Invalid Field</p>;
            }
          }}
        />

        <AddFieldButton addFieldByType={addFieldByType} />

        <Button
          disabled={form.formFields.length === 0}
          onClick={handleSaveClick}
          className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold px-6 py-3 rounded-md
          disabled:bg-zinc-500 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Save and Preview Form
        </Button>
      </div>
    </div>
  );
};

export default CreateForm;

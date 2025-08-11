import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormType, FormFieldType } from "../../../lib/types/form";

interface FormState {
  data: FormType;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  data: { createdAt: new Date(), id: "", name: "", formFields: [] },
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    createForm: (state, action: PayloadAction<FormType>) => {
      state.data = action.payload;
      state.loading = true;
      state.error = null;
    },
    updateFormName(state, action: PayloadAction<string>) {
      state.data.name = action.payload;
    },
    addField(state, action: PayloadAction<FormFieldType>) {
      state.data.formFields = [...state.data.formFields, action.payload];
    },
    updateField(
      state,
      action: PayloadAction<{
        id: string;
        key: string;
        value: any;
      }>
    ) {
      const { id, key, value } = action.payload;
      const field = state.data.formFields.find((f) => f.id === id);
      (field as any)[key] = value;
    },
    setFieldError(
      state,
      action: PayloadAction<{ id: string; error: string | null }>
    ) {
      const { id, error } = action.payload;
      const field = state.data.formFields.find((f) => f.id === id);
      if (field) {
        field.error = error;
      }
    },
    resetForm: () => initialState,
    setFormFields(state, action: PayloadAction<FormFieldType[]>) {
      state.data.formFields = action.payload;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice.reducer;

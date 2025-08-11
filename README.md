# Dynamic Form Builder – upliance.ai Assignment

### 📌 Overview

This project is a Dynamic Form Builder built as part of the Associate Software Developer Assignment for upliance.ai.
It allows users to create, configure, and preview forms with fully customizable fields and validations — all without a backend, using localStorage for persistence.

### 🚀 Features Implemented

1. Form Creation (/create)
   Add dynamic form fields:
   - Text
   - Number
   - Textarea
   - Select
   - Radio
   - Checkbox
   - Date
2. Configure field properties:
   - Label
   - Required toggle
   - Default value
   - Validation rules:
   - Not empty
   - Minimum/maximum length
   - Email format validation
   - Password complexity (min length, number, lowercase, uppercase, special character)
3. Derived Fields:

   - Select parent fields
   - Apply formula/logic for computed values
     (Example: Age auto-calculated from Date of Birth)

4. Reorder and delete fields

5. Form Preview (/preview)
   Interactive preview of the created form

6. My Forms (/myforms)
   List of all saved forms from localStorage

### 🛠 Tech Stack

- Frontend: React (TypeScript)
- State Management: Redux Toolkit
- UI Components: Material UI (MUI)
- Form Validation: Zod
- Routing: React Router
- Storage: localStorage
- Build Tool: Vite

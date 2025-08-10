import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
const CreateForm = lazy(() => import("./pages/createForm/CreateForm"));
const PreviewForm = lazy(() => import("./pages/PreviewForm"));
const MyForms = lazy(() => import("./pages/MyForms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={<div className="text-center mt-10 text-lg">Loading...</div>}
      >
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateForm />} />
            <Route path="/preview/:id" element={<PreviewForm />} />
            <Route path="/myforms" element={<MyForms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import TemplateRouter from "./templates/TemplateRouter.jsx";
import Privacy from "./pages/privacy.jsx";

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Routes>
        <Route path="/" element={<TemplateRouter />} />
        <Route path="/barber/:slug" element={<TemplateRouter />} />
        <Route path="/theme/:themeName" element={<TemplateRouter />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<TemplateRouter />} />
      </Routes>
    </div>
  );
};

export default App;

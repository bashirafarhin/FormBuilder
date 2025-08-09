import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <h1 className="text-[10vw] font-semibold">
        <i>Form Builder</i>
      </h1>
      <div className="flex flex-col p-2 sm:flex-row items-center gap-10">
        <Button onClick={() => navigate("/create")}>Create</Button>
        <Button onClick={() => navigate("/preview")}>Preview</Button>
        <Button onClick={() => navigate("/myforms")}>Previous</Button>
      </div>
    </div>
  );
};

export default Home;

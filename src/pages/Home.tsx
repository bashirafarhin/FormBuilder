import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
      <h1 className="text-5xl md:text-8xl font-semibold italic m-0 p-0">
        Form
      </h1>
      <h1 className="text-5xl md:text-8xl font-semibold italic m-0 p-0">
        Builder
      </h1>
      <div className="flex flex-col p-2 md:flex-row items-center gap-10 mt-5">
        <Button onClick={() => navigate("/create")}>Create</Button>
        <Button onClick={() => navigate("/myforms")}>Previous</Button>
      </div>
    </div>
  );
};

export default Home;

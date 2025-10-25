import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button variant={"ghost"} className="mr-4" onClick={() => navigate(-1)}>
      <ArrowLeft />
    </Button>
  );
}

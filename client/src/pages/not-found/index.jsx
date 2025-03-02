import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
        <Button onClick={() => navigate("/shop/home")} className="w-full">
          Go to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
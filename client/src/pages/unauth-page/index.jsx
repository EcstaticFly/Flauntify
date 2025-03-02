import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function UnauthPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <Lock className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">Sorry, you don't have access to view this page.</p>
        <Button onClick={() => navigate("/shop/home")} className="w-full">
          Go to Home
        </Button>
      </div>
    </div>
  );
}

export default UnauthPage;
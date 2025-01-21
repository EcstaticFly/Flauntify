import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage(){
  const navigate = useNavigate();
  return (
    <Card className="p-10">
          <CardHeader className="p-0">
            <CardTitle className="text-4xl">Processing Successfull!</CardTitle>
          </CardHeader>
          <Button className="mt-5" onClick={()=> navigate('/shop/account')}>
            View Orders
          </Button>
        </Card>
  )
}
export default PaymentSuccessPage;
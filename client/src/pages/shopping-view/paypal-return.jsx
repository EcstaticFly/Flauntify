import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get('paymentId');
  const payerId = params.get('PayerID');
  const navigate = useNavigate();

  useEffect(()=>{
    if(paymentId && payerId){
      const orderId = JSON.parse(sessionStorage.getItem('orderId'))
      dispatch(capturePayment({paymentId,payerId,orderId}))
      .then((data)=>{
        console.log('payment captured', data)
        if(data?.payload?.success){
          sessionStorage.removeItem('orderId');
          window.location.href = '/shop/payment-success'
          toast.success("Payment successful");
        }
      })
    }

  },[payerId,paymentId,dispatch])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please Wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;

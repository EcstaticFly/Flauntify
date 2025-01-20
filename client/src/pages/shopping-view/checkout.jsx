import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { configDotenv } from "dotenv";
import { toast } from "react-toastify";


function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const {user} = useSelector((state)=> state.auth);
  const {approvalURL} = useSelector((state)=>state.shopOrder)
  const [currentSelectedAddress,setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart,setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();


  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length>0
  ? cartItems.items.reduce((acc, item) => acc + (item?.salePrice>0 ? item?.salePrice : item?.price)*item?.quantity,0) : 0;

  console.log(cartItems);

  function handleInitiatePaypalPayment(){

    if(cartItems.length === 0 ){
      toast.error("Your cart is empty");
      return;
    }
    if(currentSelectedAddress === null){
      toast.error("Please select one address");
      return;
    }

    const orderData = {
      userId : user?.id,
      cartId : cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem)=>({
        productId: singleCartItem?.productId,
      title: singleCartItem?.title,
      image: singleCartItem?.image,
      price: singleCartItem?.salePrice >0 ? singleCartItem?.salePrice : singleCartItem?.price,
      quantity: singleCartItem?.quantity,
      })),
      addressInfo : {
        addressId: currentSelectedAddress?.addressId,
    address: currentSelectedAddress?.address,
    city: currentSelectedAddress?.city,
    pincode: currentSelectedAddress?.pincode,
    phone: currentSelectedAddress?.phone,
    notes: currentSelectedAddress?.notes,
      },
      orderStatus : 'pending',
      paymentMethod : 'paypal',
      paymentStatus : 'pending',
      totalAmount : totalCartAmount,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId : '',
      payerId : '',
    }
    console.log(orderData)
    dispatch(createNewOrder(orderData))
    .then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false);
      }
    })
  }
  
  if(approvalURL){console.log(approvalURL); window.location.href = approvalURL;}

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;

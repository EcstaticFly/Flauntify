import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts(){
  const [searchTerm, setsearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const {user} = useSelector(state=>state.auth);
  const {searchResults} = useSelector((state)=>state.shopSearch);
  const {productDetails} = useSelector(state=>state.shopProducts)
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
  const {cartItems} = useSelector(state=>state.shopCart)
  const dispatch = useDispatch();
  const {toast} = useToast();


  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];
    if(getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex(item=>item.productId === getCurrentProductId)
      if(indexOfCurrentItem !== -1){
        const currentQuantity = getCartItems[indexOfCurrentItem].quantity;
        if((currentQuantity+1)>getTotalStock){
          toast({
            title: `Only ${currentQuantity} items are available in stock`,
            variant : 'destructive'
          })
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: `Product added to cart successfully`,
        })
      }
    });
  }

  useEffect(()=>{
    if(searchTerm && searchTerm.trim()!=='' && searchTerm.trim().length>3){
      setTimeout(()=>{
        setSearchParams(new URLSearchParams(`?searchTerm=${searchTerm}`));
        dispatch(getSearchResults(searchTerm))
      },1000)
    }else{
      setSearchParams(new URLSearchParams(`?searchTerm=${searchTerm}`));
      dispatch(resetSearchResults());
    }
  },[searchTerm]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);




  console.log(searchResults,'searchResult');

  return(
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={searchTerm}
            name="searchTerm"
            onChange={(event) => setsearchTerm(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-bold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )

}
export default SearchProducts;
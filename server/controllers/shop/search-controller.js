const Product = require('../../models/Product')

const searchProducts = async(req,res)=>{
  try{
    const {searchTerm} = req.params;
    console.log(searchTerm)

    if(!searchTerm || typeof searchTerm !=="string"){
      return res.status(400).json({success: false,message:'Invalid search term'})
    }
    const regEx = new RegExp(searchTerm, 'i');
    const searchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(searchQuery);
    res.status(200).json({
      success: true,
      data: searchResults
    })



  }catch(error){
    console.log(error.message);
    res.status(400).json({ success: false, message: "An error occurred!" });
  }
}

module.exports = {searchProducts}

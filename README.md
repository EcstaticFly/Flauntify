# Flauntify – E-commerce Website  
A full-stack e-commerce platform built with the MERN stack, featuring product management, PayPal integration, shopping cart, and order tracking.

🔗 **Live Site:** [Flauntify](https://flauntify.onrender.com/)  
📂 **Repository:** [GitHub](https://github.com/EcstaticFly/Flauntify.git)

## ✨ Features  
- 🛍️ **Full-Stack E-commerce Platform** – Browse and buy from a catalog of multiple products.  
- 📦 **Shopping Cart & Order Management** – Add/remove items, place orders, track deliveries.  
- 💳 **Secure Payments** – Integrated **PayPal** for smooth transactions.  
- ⭐ **Product Reviews & Ratings** – Users can review and rate purchased products.  
- 🔄 **State Management** – **Redux** ensures efficient global state handling.  
- 📸 **Image Uploads** – **Cloudinary** used for optimized product and user image uploads.  
- 🔎 **Product Search & Filters** – Users can easily search for products and apply filters.  
- 🛠 **Admin Dashboard** – Admins have a separate panel to:  
  - **Add, edit, or delete products**  
  - **Update order status**  
  - **Feature images on the homepage**  
- 📱 **Mobile-First Design** – **Tailwind CSS** ensures responsiveness across all devices.  


## 🛠 Tech Stack  
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **Payments:** PayPal API  
- **Image Uploads:** Cloudinary  
- **State Management:** Redux  


## 🚀 Installation & Setup  

1️⃣ **Clone the repository:**  
```bash
git clone https://github.com/EcstaticFly/Flauntify.git
cd Flauntify
```

2️⃣ **Install dependencies:**  
```bash
cd client && npm install
cd server && npm install
```

3️⃣ **Set up environment variables:** 
```bash
#set up .env for client:
VITE_API_URL=your_vite_api_url

#set up .env for server:
REACT_APP_MONGODB_URL = your_mongodb_connection_string
CLIENT_BASE_URL = your_client_base_url
PORT = your_server_port
CLIENT_ACCESS_SECRET = your_client_access_secret
CLOUDINARY_CLOUD_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_cloudinary_api_key
CLOUDINARY_API_SECRET = your_cloudinary_secret
PAYPAL_CLIENT_ID = your_paypal_client_id
PAYPAL_CLIENT_SECRET = your_paypal_client_secret
```

4️⃣ **Run the app:**  
```bash
# Start backend
cd server
npm run start  

# Start frontend
cd client
npm run start
```
5️⃣ **The app will be live at http://localhost:5173** 

## 🤝 Contributing  
Contributions, issues, and feature requests are welcome!  
Feel free to **fork** the repo and submit a **pull request**.  

## 📜 License  
This project is licensed under the **GNU GENERAL PUBLIC LICENSE v3**.

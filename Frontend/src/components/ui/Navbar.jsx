import ProductCard from "./Orders";

const Navbar = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const user = userdata.username;
  return (
    <>
      <nav className="flex items-center justify-between bg-white shadow-md p-4">
        {/* Left: Home Icon */}
        <div className="flex items-center">
          {/* <Home className="w-9 h-7 text-gray-700 cursor-pointer" /> */}
          <span className="font-sans text-3xl font-bold">{user}'s Shop</span>
        </div>

        {/* Center: Search Bar with Icon */}
        {/* <div className="flex-grow mx-4 relative">
          <Search className="absolute left-3 top-3 w-7 h-6 text-gray-500" />  
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div> */}

        {/* Right: Cart Icon with Badge */}
        <div></div>
        <div className="relative"></div>
      </nav>
      {/* Orders Page */}
      <ProductCard />
    </>
  );
};

export default Navbar;

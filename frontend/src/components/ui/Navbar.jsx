import { useContext, useState } from "react";
import { Book, Code, LogOut, Menu, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../../Utils/UserContext";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);
  const { userData, serverUrl, setUserData } = useContext(dataContext);
  if (userData) {
    console.log("userlogin");
  }
  const navigation = useNavigate();
  const navItems = [
    { name: "Resources", href: "/resources", icon: Book },
    { name: "Practice", href: "/practice", icon: Code },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Learning Platform
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePath === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setActivePath(item.href)}
                >
                  <item.icon className="inline-block w-5 h-5 mr-1" />
                  {item.name}
                </Link>
              ))}
              {userData ? (
                <div
                  onClick={async () => {
                    await axios.post(
                      serverUrl + "/logout",
                      {},
                      { withCredentials: true }
                    );
                    navigation("/signIn");
                    setUserData(null);
                  }}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Link
                    key={"SignIn"}
                    to={"/signIn"}
                    className={`px-3 py-2 rounded-md text-sm font-medium `}
                  >
                    Logout
                    <LogOut className="inline-block w-4 h-4 ml-1" />
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    key={"SignIn"}
                    to={"/signIn"}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activePath
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => setActivePath("/signIn")}
                  >
                    <User className="inline-block w-5 h-5 mr-1" />
                    SignIn
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activePath === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => {
                  setActivePath(item.href);
                  setIsOpen(false);
                }}
              >
                <item.icon className="inline-block w-5 h-5 mr-1" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

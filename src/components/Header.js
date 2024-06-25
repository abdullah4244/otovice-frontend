import React, { useEffect, useState } from "react";
import { Menu, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (userData?.user) {
      setUser(userData?.user);
    }
  }, [location.pathname]);

  const toggleLogin = () => {
    if (localStorage.getItem("user")) {
      if (localStorage.getItem("google_user")) {
        localStorage.removeItem("google_user");
        localStorage.removeItem("user");
        googleLogout();
      }
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto flex justify-between items-center py-3">
      <div className="flex items-center justify-center w-full">
        <Menu
          mode="horizontal"
          theme="light"
          style={{
            flex: 1,
            minWidth: 0,
          }}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/categories">
            <Link to="/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="/buy-subscription">
            <Link to="/buy-subscription">Subscription</Link>
          </Menu.Item>
        </Menu>
      </div>
      <Button type="ghost" onClick={toggleLogin} className="z-50">
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  );
};

export default AppHeader;

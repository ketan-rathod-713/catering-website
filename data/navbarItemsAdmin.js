
import Logout from './../utils/logoutClientSide';

const navbarMenuItems = [
    { title: "Home", link: "/admin" },
    { title: "Reviews", link: "/admin/reviews" },
    { title: "Products", link: "/admin/product" },
    { title: "Account", link: "/admin/account" },
    { title: "Orders", link: "/admin/orders" },
    { title: "LOGIN", link: "/auth/login", btn: true },
    { title: "SIGN UP", link: "/auth/signup", btn: true },
    { title: "LOG OUT", link: "", btn: true, onClickFunction: Logout},
  ];

export default navbarMenuItems;
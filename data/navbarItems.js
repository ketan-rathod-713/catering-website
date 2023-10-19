
import Logout from './../utils/logoutClientSide';

const navbarMenuItems = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Contact us", link: "/contactus" },
    { title: "Gallary", link: "/gallary  " },
    { title: "Reviews", link: "/reviews" },
    { title: "Shop", link: "/shop/product" },
    { title: "Cart", link: "/shop/cart" },
    { title: "Account", link: "/account" },
    { title: "LOGIN", link: "/auth/login", btn: true },
    { title: "SIGN UP", link: "/auth/signup", btn: true },
    { title: "LOG OUT", link: "", btn: true, onClickFunction: Logout},
  ];

export default navbarMenuItems;
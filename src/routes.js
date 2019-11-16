/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Authors from "views/author/Authors.jsx";
import CategoryList from "views/category/CategoryList.jsx";
import Login from "views/examples/Login.jsx";
import Register from "views/examples/Register.jsx";
import LanguageList from "views/language/LanguageList.jsx";
import BorringList from "views/borrowing-card/Borrowing.jsx";

var routes = [
  {
    path: "/authors",
    name: "Authors",
    icon: "ni ni-planet text-blue",
    component: Authors,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-planet text-blue",
    component: CategoryList,
    layout: "/admin"
  },
  {
    path: "/languages",
    name: "Language",
    icon: "ni ni-planet text-blue",
    component: LanguageList,
    layout: "/admin"
  },
  {
    path: "/borrowings",
    name: "Danh Sách Mượn",
    icon: "ni ni-planet text-blue",
    component: BorringList,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default routes;

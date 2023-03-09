import { routerType } from "../types/router.types";
import { Promotions } from "./Promotions";
import { Home } from "./Home";
import { Users } from "./Users";
import { AppBarHead } from "../layouts/Appbar";
import ErrorPage from "./Error";
import CreateUser from "../components/Users/CreateUser";
import EditUser from "../components/Users/EditUser";
import UserDetails from "../components/Users/UserDetails";
import EditAccount from "../components/Users/EditAccount";
import CreatePromotion from "../components/Promotions/CreatePromotion";
import EditPromotion from "../components/Promotions/EditPromotion";
import PromotionDetails from "../components/Promotions/PromotionDetails";

const pagesData: routerType[] = [
  {
    path: "",
    element: (
      <>
        <AppBarHead />
        <Home />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "Home",
  },
  {
    path: "users",
    element: (
      <>
        <AppBarHead />
        <Users />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "Users",
  },
  {
    path: "users/create",
    element: (
      <>
        <AppBarHead />
        <CreateUser />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "create user",
  },
  {
    path: "users/edit/:_id",
    element: (
      <>
        <AppBarHead />
        <EditUser />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "Edit user",
  },
  {
    path: "users/details/:_id",
    element: (
      <>
        <AppBarHead />
        <UserDetails />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "User details",
  },
  {
    path: "users/editaccount/:_id",
    element: (
      <>
        <AppBarHead />
        <EditAccount />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "Edit account",
  },

  {
    path: "promotions",
    element: (
      <>
        <AppBarHead />
        <Promotions />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "Promotions",
  },
  {
    path: "promotions/create",
    element: (
      <>
        <AppBarHead />
        <CreatePromotion />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "Create promotion",
  },
  {
    path: "promotions/details/:_id",
    element: (
      <>
        <AppBarHead />
        <PromotionDetails />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "Promotion details",
  },
  {
    path: "promotions/edit/:_id",
    element: (
      <>
        <AppBarHead />
        <EditPromotion />
      </>
    ),
    errorElement: <ErrorPage />,
    title: "Edit promotion",
  },
];

export default pagesData;

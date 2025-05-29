import Home from '../pages/home/Home';
import {checkAuthenticatedRoute, checkUnauthenticatedRouteOnly} from "../utils/auth";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import AddStory from "../pages/add/AddStory";
import Detail from "../pages/detail/Detail";
import Save from "../pages/save/Save";

const routes = {
  '/login': () => checkUnauthenticatedRouteOnly(Login),
  '/register': () => checkUnauthenticatedRouteOnly(Register),

  '/': () => checkAuthenticatedRoute(Home),
  '/new': () => checkAuthenticatedRoute(AddStory),
  '/story/:id': () => checkAuthenticatedRoute(Detail),
  '/bookmark': () => checkAuthenticatedRoute(Save),
};

export default routes;

import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

import Login from "./Pages/Login";
import LoginAdmin from "./Pages/LoginAdmin";
import HomeAdmin from "./Pages/HomeAdmin";
import RegisterAccount from "./Pages/RegisterAccount";
import Home from "./Pages/Home";
import { isAuthenticated } from "./services/auth";
console.log('entrou', isAuthenticated());
function PrivateRoute  ({ component: Component, ...rest }) {

  return(
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
  )
  };
  

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/LoginAdmin" component={LoginAdmin} />
        <Route path="/RegisterAccount" component={RegisterAccount} />
        <PrivateRoute path="/Home" component={Home}/>
        <PrivateRoute path="/HomeAdmin" component= {HomeAdmin}/>
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
      </Switch>
      </BrowserRouter>
  );
}

export default Routes;

import {BrowserRouter as Router, Switch} from "react-router-dom";
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Verify from '../components/Auth/Verify'
import BoxChatCall from "../components/BoxChatCall";
import Home from '../components/Home'
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute'
import PageLoader from './PageLoader'
import Socket from '../components/Common/Socket'
import { Suspense } from "react";

function App() {
  return (
    <>
    <Socket/>
    <Router>
      <Suspense fallback={<PageLoader/>}>
        <Switch>
          <PrivateRoute exact  path="/call" component={BoxChatCall}/>
          <PublicRoute exact  path="/login" component={Login}/>
          <PublicRoute exact  path="/register" component={Register}/>
          <PrivateRoute exact  path="/verify" component={Verify}/>
          <PrivateRoute exact  path="/" component={Home}/>
        </Switch>
      </Suspense>
    </Router>
    </>
    
  );
}

export default App;

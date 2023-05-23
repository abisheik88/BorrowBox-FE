import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookingcar from './pages/Bookingcar';
import 'antd/dist/reset.css'
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  return (
    <div className="App">




      <BrowserRouter>

        <ProtectedRoute path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoute path='/booking/:carid' exact component={Bookingcar} />
        <ProtectedRoute path='/userbookings' exact component={UserBookings} />
        <ProtectedRoute path='/addcar' exact component={AddCar} />
        <ProtectedRoute path='/editcar/:carid' exact component={EditCar} />
        <ProtectedRoute path='/admin' exact component={AdminHome} />


      </BrowserRouter>

    </div>
  );
}



export default App;


export function ProtectedRoute(props) {


  if (localStorage.getItem('user')) {
    return <Route {...props} />
  }
  else {
    return <Redirect to='/login' />
  }

}

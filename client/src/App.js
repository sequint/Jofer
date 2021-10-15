import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import PostedJobs from './pages/PostedJobs'
import ManageJobs from './pages/ManageJobs'
import AppliedJobs from './pages/AppliedJobs'
import DeclinedJobs from './pages/DeclinedJobs'
import Login from './pages/SignIn'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/postedjobs'>
            <PostedJobs />
          </Route>
          <Route path='/managejobs'>
            <ManageJobs />
          </Route>
          <Route path='/appliedjobs'>
            <AppliedJobs />
          </Route>
          <Route path='/declinedjobs'>
            <DeclinedJobs />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

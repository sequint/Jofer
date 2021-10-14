import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/signIn'>
            <Auth />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

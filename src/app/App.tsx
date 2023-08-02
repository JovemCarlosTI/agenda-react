import { CalendarScreen } from "../components/CalendarScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { getToday } from "../utils/dateFunctions";

function App() {
  const month = getToday().substring(0, 7);
  return (
    <Router>
      <Switch>
        <Route path="/calendar/:month">
          <CalendarScreen />
        </Route>
        <Redirect to={{pathname: "/calendar/" + month}} />
      </Switch>
    </Router>
  )
}

export default App;

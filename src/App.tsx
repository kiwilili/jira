import { AuthtenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';
// import {ProjectListScreen} from './screens/project-list/index';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {
        user ? <AuthtenticatedApp/> : <UnauthenticatedApp/>
      }
    </div>
  );
}

export default App;

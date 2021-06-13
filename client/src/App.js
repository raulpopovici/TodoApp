import Routes from './Routes';
import {AuthProvider} from './auth'

function App() {
  return (
      <AuthProvider>
        <Routes/>
      </AuthProvider>
  );
}

export default App;

import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <AppProvider>
       <Home/>
       </AppProvider>
      </header>
    </div>
  );
}

export default App;

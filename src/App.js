import './App.css';
import { Header,Footer,ScrollToTop} from './components';
import { AllRoute } from './Routes/AllRoute';
function App() {
  return (
    <div className='bg-gray-900'>
      <Header/>
      <AllRoute/>
      <ScrollToTop/>
      <Footer/>
    </div>

  );
}

export default App;

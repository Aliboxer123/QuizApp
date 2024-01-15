import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Score from './components/Score';
function App() {
     return (<Router>
          <Routes>
         <Route path="/" Component={Intro} />
          <Route path='/quiz' Component={Quiz} />
          <Route path='/score' Component={Score} />     
    </Routes>  
 </Router>
)}

export default App

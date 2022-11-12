
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Create_Slots from './Components/Create_Slots';
import Enter_Car from './Components/Enter_Car';
import ExitCar from './Components/ExitCar';

import { AnimatePresence } from "framer-motion"


function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path='/' element={<Create_Slots />} />
        <Route path='/enterCar' element={<Enter_Car />} />
        <Route path='/exitCar' element={<ExitCar />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

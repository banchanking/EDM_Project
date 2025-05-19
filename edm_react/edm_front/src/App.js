import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from './Common/Header';
import StudentEnroll from './StudentManage/StrudentEnroll';
import Main from './Common/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          
          {/* 학생정보등록 */}
          <Route 
            path="/studentEnroll"
            element={<StudentEnroll />}
          />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

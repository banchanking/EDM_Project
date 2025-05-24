import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from './Common/Header';
import Main from './Common/Main';
import StudentEnroll from './StudentManage/StrudentEnroll';
import TeacherList from './User/TeacherList';


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

          {/* 선생님 목록 */}
          <Route 
            path="/teacherList"
            element={<TeacherList />}
          />



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

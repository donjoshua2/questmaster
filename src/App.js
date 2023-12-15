import './App.css';
import SideBar from './components/SideBar'
import User from './components/User'
import AddNewTodo from './components/AddNewTodo'
import Calendar from './components/Calendar'
import Projects from './components/Projects'
import Todos from './components/Todos'
import EditTodo from './components/EditTodo'
import Main from './components/Main'



function App() {
  return (
    <div className="App">
      <SideBar>
        <User />
        <AddNewTodo />
        <Calendar />
        <Projects />


      </SideBar>
      <Main>
        <Todos />
        <EditTodo />


      </Main>
    </div>
  );
}

export default App;

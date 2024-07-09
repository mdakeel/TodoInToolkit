
import { Provider } from 'react-redux';
import './App.css';
import store from './features/store';
import { Header } from './components/Header';
import TodoList from './components/TodoList';

function App() {
  return (
    <Provider store={store} >
      <div className="flex items-center justify-cente flex-col bg-[#F7E7DC] w-full h-dvh gap-y-10">
        <Header />
        <TodoList />
      </div>
    </Provider >
  );
}

export default App;

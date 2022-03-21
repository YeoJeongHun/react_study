import './App.css';
import ListContainer from './components/ListContainer';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ListContainer />
      </QueryClientProvider>
    </div>
  );
}

export default App;


// npx create-react-app my-app --template redux 비교하기
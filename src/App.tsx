import Feed from "./assets/Components/Feed";
import Header from "./assets/Components/Header";
import Loading from "./assets/Components/Loading";
import Login from "./assets/Components/Login";
import { useAsyncUserData } from "./assets/Components/stores";

function App() {
  const { logged, loading } = useAsyncUserData();
  const login = logged ? <Feed /> : <Login />;
  return (
    <div className="app">
      <Header />
      {loading ? <Loading /> : login}
    </div>
  );
}

export default App;

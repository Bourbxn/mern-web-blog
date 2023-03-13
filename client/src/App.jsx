import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="container p-5">
      <NavBar />
      <h1>MERN STACK | Workshop</h1>
      <a className="btn btn-primary" href="/create">
        Bootstrap
      </a>
    </div>
  );
}

export default App;

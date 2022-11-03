import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/*===========Pages and Components========= */
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <div className="App">
        <Router>
        <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;

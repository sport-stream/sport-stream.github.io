import "./App.css";
import ReactGA from "react-ga";
import { Body, Footer, Header } from "./layout";

ReactGA.initialize("G-3D65M2L9LS");

function App() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}
export default App;

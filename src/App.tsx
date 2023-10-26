import "./App.css";
import ReactGA from "react-ga";
import { Body, Footer, Header, Left, Right } from "./layout";
import { Grid } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { InvisibleAds } from "./ads";

ReactGA.initialize("G-3D65M2L9LS");

function App() {
  const [showSides, setShowSides] = useState(window.innerWidth > 1070);

  useEffect(() => {
    const handleWindowResize = () => {
      setShowSides(window.innerWidth > 1070);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <>
      <InvisibleAds />
      <Header />
      <Grid>
        <Grid.Row>
          {showSides && (
            <Grid.Column width={3}>
              <Left />
            </Grid.Column>
          )}
          <Grid.Column width={showSides ? 10 : 16}>
            <Body />
          </Grid.Column>
          {showSides && (
            <Grid.Column width={3}>
              <Right />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
      <Footer />
    </>
  );
}
export default App;

import { Container, Menu, Image } from "semantic-ui-react";
import Watch from "../static/img/watch.png";
import { Link } from "react-router-dom";

const Header = (props: any) => {
  return (
    <Menu
      id="menu"
      fixed="top"
      inverted
      style={{ backgroundColor: "#1b1c1d", borderBottom: "3px solid #2185d0" }}
    >
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Image size="mini" src={Watch} style={{ marginRight: "1.5em" }} />
          <span
            style={{ fontSize: "1.5em", fontWeight: "bold", color: "#ffffff" }}
          >
            Sport-Stream
          </span>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/"
          style={{ fontSize: "1.2em", color: "#ffffff" }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/Soccer"
          style={{ fontSize: "1.2em", color: "#ffffff" }}
        >
          ⚽️ Soccer ⚽️
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/Basketball"
          style={{ fontSize: "1.2em", color: "#ffffff" }}
        >
          🏀 Basketball 🏀
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default Header;

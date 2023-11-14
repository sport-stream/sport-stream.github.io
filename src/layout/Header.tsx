import { Container, Menu, Image } from "semantic-ui-react";
import Watch from "../static/img/watch.png";
import { Link } from "react-router-dom";

const Header = (props: any) => {
  return (
    <Menu id="menu" fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Image size="mini" src={Watch} style={{ marginRight: "1.5em" }} />
          Sport-Stream
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/Soccer">
          ⚽️ Soccer ⚽️
        </Menu.Item>
        <Menu.Item as={Link} to="/Basketball">
          🏀 Basketball 🏀
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default Header;

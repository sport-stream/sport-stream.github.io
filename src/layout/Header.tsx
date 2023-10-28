import { Container, Menu, Image } from "semantic-ui-react";
import Watch from "../static/img/watch.png";

const Header = (props: any) => {
  return (
    <Menu id="menu" fixed="top" inverted>
      <Container>
        <Menu.Item as="a" href="/" header>
          <Image size="mini" src={Watch} style={{ marginRight: "1.5em" }} />
          Sport-Stream
        </Menu.Item>
        <Menu.Item as="a" href="/">
          Home
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default Header;

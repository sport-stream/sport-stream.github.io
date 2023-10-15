import { Container, Menu, Image } from "semantic-ui-react";
import Watch from "../static/img/watch.png";

const Header = (props: any) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" href="/Games" header>
          <Image size="mini" src={Watch} style={{ marginRight: "1.5em" }} />
          Nivdal Global
        </Menu.Item>
        <Menu.Item as="a" href="/Games">
          Home
        </Menu.Item>
      </Container>
    </Menu>
    // <div>
    //   <Link >Home</Link>
    // </div>
  );
};
export default Header;

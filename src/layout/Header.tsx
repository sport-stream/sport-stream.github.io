import { Link } from "react-router-dom";
import { Container, Menu, Image } from "semantic-ui-react";
import Watch from "../static/img/watch.png";

const Header = (props: any) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={Link} to="/Games" header>
          <Image size="mini" src={Watch} style={{ marginRight: "1.5em" }} />
          Nivdal Global
        </Menu.Item>
        <Menu.Item as={Link} to="/Games">
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

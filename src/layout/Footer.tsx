import { Menu, Segment } from "semantic-ui-react";

const Footer = (props: any) => {
  return (
    <Menu fixed="bottom" inverted>
      <Segment inverted textAlign="center">
        <p>Copyright © Nivdal Global Games 2014-{new Date().getFullYear()}</p>
      </Segment>
    </Menu>
  );
};

export default Footer;

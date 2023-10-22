import { Menu, Segment } from "semantic-ui-react";

const Footer = (props: any) => {
  return (
    <Menu fixed="bottom" inverted>
      <Segment inverted textAlign="center">
        <p>
          Copyright © <a href="https://sport-stream.github.io">Sport-Stream</a>
          Games 2014-{new Date().getFullYear()}
        </p>
      </Segment>
    </Menu>
  );
};

export default Footer;

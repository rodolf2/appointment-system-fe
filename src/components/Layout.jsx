import BackToTopButton from "./BackToTopButton";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <BackToTopButton />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

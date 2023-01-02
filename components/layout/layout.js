import AppFooterBasic from "./app-footer-basic";
import AppHeaderBasic from "./app-header-basic";

const Layout = ({ children }) => {
  return (
    <>
      <AppHeaderBasic />
      <main>{children}</main>
      <AppFooterBasic />
    </>
  );
};

export default Layout;

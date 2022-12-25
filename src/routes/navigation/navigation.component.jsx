import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from '../../assets/crown-svgrepo-com.svg'
import { ReactComponent as ShopIcon } from '../../assets/shopping-bag-svgrepo-com.svg'
import './navigaton.styles.scss'

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            SHOP
          </Link>
          <Link className="nav-link" to='/contact'>
            CONTACT
          </Link>
          <Link className="nav-link" to='/sign-in'>
            SIGN IN
          </Link>
          <Link className="nav-link icon-container" to='/shop'>
            <ShopIcon className="icon-shop" />
          </Link>

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
import React from "react";
import styles from "./styles.module.scss";
import CurrentDateTime from "../CurrentDateTime";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header id={styles.navbar}>
      <nav className={`${styles.navbar_container} ${styles.container}`}>
        <NavLink to="/">
          <div className={styles.navbar_logo}>
            <img src="/images/logo_full.png" alt="Pulsar"></img>
          </div>
          {/* Pulsar */}
        </NavLink>

        <div id={styles.navbar_menu}>
          <ul className={styles.navbar_links}>
            <li className={styles.navbar_item}>
              <CurrentDateTime />
            </li>
            <li className={styles.navbar_item}>
              <NavLink style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1.3rem", textDecoration: "none", color: "white"}} to="/graphics">Graphics</NavLink>
            </li>
            <li>
              <NavLink style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1.3rem", textDecoration: "none", color: "white"}} to="/report">Report</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

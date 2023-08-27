import React from "react";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
      <header id={styles.navbar}>
        <nav className={`${styles.navbar_container} ${styles.container}`}>
          <a href="/" className={styles.home_link}>
            <div className={styles.navbar_logo}><img src="/images/logo_full.png" alt="Pulsar"></img></div>
           {/* Pulsar */}
          </a>

          <div id={styles.navbar_menu} >
            <ul className={styles.navbar_links}>
              <li className={styles.navbar_item}>
                <a className={styles.navbar_link} href="/blog">
                  Login
                </a>
              </li>
              <li className={styles.navbar_item}>
                <a className={styles.navbar_link} href="/contact">
                  Report
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
  );
}

export default Header;
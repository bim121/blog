import Link from "next/link";
import styles from "../src/styles/Header.module.css"
import Image from "next/image"
import Search from "./Search";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Header() {
    const { user, signout } = useContext(AuthContext);
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <a>Sport News</a>
          </Link>
        </div>
        <Search />
        <nav>
          <ul>
            <li>
              <Link href="/news">
                <a>News</a>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/news/add">
                    <a>Add News</a>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/dashboard">
                    <a>Dashboard</a>
                  </Link>
                </li>
                <button className="btn-secondary" onClick={() => signout()}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/signin">
                    <a className="btn-secondary">Sign In</a>
                  </Link>
                </li>
              </>
            )}
  
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
}
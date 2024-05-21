import Link from "next/link";
import styles from "../src/styles/Header.module.css"

export default function Header() {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            Sport News
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/news">
                News
              </Link>
            </li>
              <>
                <li>
                  <Link href="/news/add">
                    Add News
                  </Link>
                </li>
              </>
            <li>
              <Link href="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
}
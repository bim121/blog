import Link from "next/link";
import styles from "@/styles/Header.module.css"
import Image from "next/image"

export default function Header() {
    return(
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
                            Sport News
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
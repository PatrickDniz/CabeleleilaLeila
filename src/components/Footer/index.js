import styles from "./style.module.css";
import Logo from "@/components/Logo";
import { FaLinkedinIn } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";
import { HiOutlineDatabase } from "react-icons/hi";
import { MdOutlineContentPaste } from "react-icons/md";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerTop}>
          <Logo>CabeleleilaLeila</Logo>
          <div className={styles.socials}>
          <Link
              href={"https://www.linkedin.com/in/patrick-dniz/"}
              title="Linkedin"
               target="_blank"
            >
              <FaLinkedinIn fontSize={32} />
            </Link>
            <Link
              href={"https://github.com/PatrickDniz/CabeleleilaLeila"}
              title="Github"
              target="_blank"
            >
              <VscGithubInverted fontSize={32} />
            </Link>
            <Link
              href={"https://github.com/PatrickDniz/CabeleleilaLeila-api"}
              title="Github Api"
              target="_blank"
            >
              <HiOutlineDatabase fontSize={32} />
            </Link>
            <Link
              href={
                "https://drive.google.com/drive/folders/1BReBhja3znNLmKbb69-BgLU6J6xwfcXA?usp=sharing"
              }
              title="Drive"
              target="_blank"
            >
              <MdOutlineContentPaste fontSize={32} />
            </Link>
          </div>
        </div>
        <hr className={styles.bar} />
        <div className={styles.footerBottom}>
          <span className={styles.copy}>
            ©2025 CabeleleilaLeila.
          </span>
          <span className={styles.copy}>
            Desenvolvido por: Patrick Diniz
          </span>
        </div>
      </div>
    </footer>
  );
}

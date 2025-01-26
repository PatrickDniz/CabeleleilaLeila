"use client";

import styles from "./style.module.css";
import Link from "next/link";
import { CiBoxList } from "react-icons/ci";
import { LuBadgePlus } from "react-icons/lu";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        className={clsx(styles.navItem, {
          [styles.selected]: path === "/agendamento/cadastro",
        })}
        href={"/agendamento/cadastro"}
      >
        <LuBadgePlus fontSize={20} />
        <span>Agendar</span>
      </Link>
      <Link
        className={clsx(styles.navItem, {
          [styles.selected]: path === "/agendamento/lista",
        })}
        href={"/agendamento/lista"}
      >
        <CiBoxList  fontSize={20} />
        <span>Meus Agendamentos</span>
      </Link>
    </nav>
  );
}

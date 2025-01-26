"use client";

import styles from "./style.module.css";
import Link from "next/link";
import { CiBoxList } from "react-icons/ci";
import { LuBadgePlus } from "react-icons/lu";
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

export default function NavbarMobile() {
  const path = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  function toggleNav() {
    return setOpenMenu((state) => !state);
  }

  return (
    <>
      <div
        className={clsx(styles.menu, {
          [styles.open]: openMenu == true,
        })}
        onClick={toggleNav}
      >
        <RiMenu3Line fontSize={32} />
      </div>
      <nav className={clsx(styles.nav, { [styles.open]: openMenu == true })}>
        <div className={styles.close}>
          <span>CabeleleilaLeila</span>
          <IoCloseSharp fontSize={32} onClick={toggleNav} />
        </div>
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
    </>
  );
}

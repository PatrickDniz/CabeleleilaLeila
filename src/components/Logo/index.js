import { PiHairDryerBold } from "react-icons/pi";
import styles from "./style.module.css";
import Link from "next/link";

export default function Logo({children}) {
  return (
    <Link href={"/"} className={styles.logo}>
      <PiHairDryerBold  fontSize={48}/> 

      {children}
    </Link>
  );
}

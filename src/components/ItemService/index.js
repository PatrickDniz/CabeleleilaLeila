import Image from "next/image";
import styles from "./style.module.css";
import Link from "next/link";

export default function ItemService({ data }) {
    const { id, name, small_description, price, image, tag } = data;

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image src={image} alt={name} width={240} height={240} />
        {tag && <span className={styles.tag}>{tag}</span>}
      </div>
      <div className={styles.cardInfo}>
        <h3>{name}</h3>
        <span>{small_description}</span>
        <strong>Valor: R$ {price}</strong>
        <Link href={`/agendamento/cadastro?service=${id}`}>Agendar Agora!</Link>
      </div>
    </div>
  );
}

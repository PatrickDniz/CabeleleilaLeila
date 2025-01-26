"use client"

import { services } from "@/mock/services";
import { useState } from "react";
import styles from "./style.module.css";
import clsx from "clsx";
import SchedulingForm from "../SchedulingForm";

export default function SectionCreateScheduling() {  
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardSelect = (card) => {
    const isSelected = selectedCards.some((selectedCard) => selectedCard.id === card.id);

    if (isSelected) {
      setSelectedCards(selectedCards.filter((selectedCard) => selectedCard.id !== card.id));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  function formatToCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  const totalValue = formatToCurrency(selectedCards.reduce((acc, card) => acc + card.price_value, 0));
  const totalPeriod = parseInt(selectedCards.reduce((acc, card) => acc + card.period, 0));

  return (
    <section className={styles.section}>
      <div className={styles.cardList}>
        {services.cards.map((card) => (
          <div
            key={card.id}
            className={clsx(styles.cardItem, {
              [styles.selected]: selectedCards.some((selectedCard) => selectedCard.id === card.id),
            })}
            onClick={() => handleCardSelect(card)}
          >
            <span>{card.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <p>Total de Valor: {totalValue}</p>
        <p>Total de Período: {totalPeriod}</p>
      </div>
      <div className={styles.observation}>
        Observação: Deve-se selecionar periodos em sequencia para realizar o agendamento, se for realizar em dois horarios distintos, favor realizar os mesmos em horários distintos. Agradeçemos a colaboração!! 
      </div>
      <SchedulingForm  data={{totalPeriod: totalPeriod}}/>
    </section>
  );
}

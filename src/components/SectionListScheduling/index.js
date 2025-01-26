"use client"

import React, { useState, useEffect } from 'react';
import { deleteScheduling, getAllSchedulings } from '@/api/client';
import styles from "./style.module.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { redirect } from 'next/navigation';

const SectionListScheduling = () => {
  const [schedulings, setSchedulings] = useState([]);

  useEffect(() => {
    const fetchSchedulings = async () => {
      try {
        const data = await getAllSchedulings(); 
        setSchedulings(data);
      } catch (error) {
        console.error("Erro ao carregar agendamentos", error);
      }
    };
    fetchSchedulings();
  }, []);

  const handleEdit = (id) => {
    redirect(`/agendamento/cadastro/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      await deleteScheduling(id); 
      setSchedulings(schedulings.filter((scheduling) => scheduling.id !== id)); 
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Lista de Agendamentos</h1>
      <ul className={styles.list}>
        {schedulings.map((scheduling) => (
          <li key={scheduling.id} className={styles.item}>
            <div>
              <p><strong>Nome:</strong> {scheduling.name}</p>
              <p><strong>Início:</strong> {new Date(scheduling.inicio).toLocaleString()}</p>
              <p><strong>Fim:</strong> {new Date(scheduling.fim).toLocaleString()}</p>
            </div>
            <div>
              <div className={styles.button} onClick={() => handleEdit(scheduling.id)}><FaRegEdit fontSize={24}/></div>
              <div className={styles.button} onClick={() => handleDelete(scheduling.id)}><RiDeleteBin2Line fontSize={24}/></div>
            </div>
          </li>
        ))}
        {schedulings.length == 0 && 
          <li className={styles.item}>
            <strong>Sem Agendamentos até o momento!</strong>
          </li>
        }
      </ul>
    </section>
  );
};

export default SectionListScheduling;

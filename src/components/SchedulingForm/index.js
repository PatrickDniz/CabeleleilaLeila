"use client"

import React, { useState, useEffect } from 'react';
import { createOneScheduling, getAllSchedulings, updateScheduling } from '@/api/client';
import styles from "./style.module.css";
import clsx from "clsx";

const SchedulingForm = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMinDate, setSelectedMinDate] = useState('');
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]); 
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots());
  const [clienName, setClienName] = useState([]);
  const [error, setError] = useState(null); 

  const { totalPeriod, edit } = data; 

  function generateTimeSlots() {
    const timeSlots = [];

    for (let h = 8; h < 12; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h < 10 ? `0${h}` : h; 
        const minute = m === 0 ? '00' : '30';
        timeSlots.push({ time: `${hour}:${minute}`, isBlocked: blockedSlots.includes(`${hour}:${minute}`) });
      }
    }

    for (let h = 13; h < 18; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h < 10 ? `0${h}` : h; 
        const minute = m === 0 ? '00' : '30'; 
        timeSlots.push({ time: `${hour}:${minute}`, isBlocked: blockedSlots.includes(`${hour}:${minute}`) });
      }
    }

    return timeSlots;
  }
  function setInitialDate() {
    const today = new Date();
    const year = today.getFullYear(); 
    const month = String(today.getMonth() + 1).padStart(2, '0');  
    const day = String(today.getDate()).padStart(2, '0'); 
    const todayFormatted = `${year}-${month}-${day}`; 
    
    setSelectedDate(todayFormatted);
    setSelectedMinDate(todayFormatted);
  }

  useEffect(() => {
    setInitialDate()
  },[]);

  const processBlockedSlots = (schedulingData) => {
    const blocked = [];
    const selectedDateObj = new Date(selectedDate + `T00:00:00Z`);

    schedulingData.forEach((item) => {
      if(!edit || edit.id != item.id) {
        const schedulingDate = new Date(item.inicio + "z");
  
        if (
          schedulingDate.getDate() === selectedDateObj.getDate() &&
          schedulingDate.getMonth() === selectedDateObj.getMonth() &&
          schedulingDate.getFullYear() === selectedDateObj.getFullYear()
        ) {
          const initialHour = schedulingDate.getHours();
          const initialMinute = schedulingDate.getMinutes();
          const initial = `${initialHour.toString().padStart(2, '0')}:${initialMinute.toString().padStart(2, '0')}`;
          const periods = item.periodos;
          blocked.push(initial);
  
          if(periods > 1) {
            for (let i = 1; i < periods; i++) {
              const blockedSlot = new Date(schedulingDate);
              blockedSlot.setMinutes(initialMinute + i * 30);
              const timeSlot = `${blockedSlot.getHours().toString().padStart(2, '0')}:${blockedSlot.getMinutes().toString().padStart(2, '0')}`;
              blocked.push(timeSlot);
            }
          }      
        }
      }
    });

    setBlockedSlots(blocked); 
  };

  useEffect(() => {
    const getSchedulingData = async () => {
      const schedulingData = await getAllSchedulings();
      processBlockedSlots(schedulingData); 
    };

    if (selectedDate) {
      getSchedulingData();
    }
  }, [selectedDate]);

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, [blockedSlots])

  const handlePeriodSelect = (slot) => {
    if (slot.isBlocked) {
      return; 
    }

    if (selectedPeriods.includes(slot.time)) {
      setSelectedPeriods(selectedPeriods.filter((period) => period !== slot.time));
    } else {
      if (selectedPeriods.length < totalPeriod) {
        setSelectedPeriods([...selectedPeriods, slot.time]);
      } else {
        setError(`Você só pode selecionar ${totalPeriod} períodos.`);
      }
    }
  };


  const createScheduling = async () => {
    console.log(clienName)
    if (selectedPeriods.length === totalPeriod && (clienName.length > 3 || edit)) {
        const sortedPeriods = [...selectedPeriods].sort((a, b) => {
            const [aHour, aMinute] = a.split(':').map(Number);
            const [bHour, bMinute] = b.split(':').map(Number);
            return aHour * 60 + aMinute - (bHour * 60 + bMinute); 
        });
        const [startHour, startMinute] = sortedPeriods[0].split(':'); 
        const startDate = new Date(selectedDate + `T${startHour}:${startMinute}:00Z`); 
        const endDate = new Date(selectedDate + `T${startHour}:${startMinute}:00Z`); 
        endDate.setMinutes(startDate.getMinutes() + 30 * selectedPeriods.length); 
        console.log(startDate)
        try {
            if(edit) {
              const schedulingObject = await updateScheduling(
                edit.id,
                edit.name, 
                startDate.toISOString(), 
                endDate.toISOString(), 
                selectedPeriods.length  
              );
              
              setError(null);
              console.log('Agendamento criado com sucesso:', schedulingObject);
              return alert('Agendamento realizado com sucesso!');
            }
            const schedulingObject = await createOneScheduling(
              clienName, 
              startDate.toISOString().slice(0, -1), 
              endDate.toISOString(), 
              selectedPeriods.length  
            );
      
            setError(null);
            console.log('Agendamento criado com sucesso:', schedulingObject);
            alert('Agendamento realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar o agendamento:', error);
            setError('Erro ao criar o agendamento.');
        }

    } else {
      setError(`Você deve selecionar exatamente ${totalPeriod} períodos.`);
    }
  };

  return (
    <div className={styles.container}>
      {edit ? 
        <h3 className={styles.title}>Selecione <strong>{totalPeriod}</strong> Horários para editar o agendamento</h3>
      :
      <>
        <h3 className={styles.title}>Nome do Cliente</h3>
        <input
          className={styles.name}
          type="text"
          value={clienName}
          onChange={(e) => setClienName(e.target.value)}
        />
      </>
      }
      <h3 className={styles.title}>Selecione o Dia</h3>
      <input
        className={styles.date}
        type="date"
        value={selectedDate}
        min={selectedMinDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <h3 className={styles.title}>Selecione os Períodos</h3>
      <div className={styles.slotList}>
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={clsx(styles.slotItem, {
                [styles.selected]: selectedPeriods.includes(slot.time),
                [styles.blocked]: slot.isBlocked,
              })}
            onClick={() => handlePeriodSelect(slot)}
          >
            {slot.time}
          </div>
        ))}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.button} onClick={createScheduling}>Criar Scheduling</div>
    </div>
  );
};

export default SchedulingForm;

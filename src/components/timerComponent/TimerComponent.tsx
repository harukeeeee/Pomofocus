import { useEffect, useState } from "react";

import styles from "./timerComponent.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { isFocusOrNot, changeTimer } from "../../store/reducers/timerSlice";

export const TimerComponent = () => {
  // состояние которое говорит о том, идет ли сейчас таймер, или он стоит на паузе
  // const [isRunning, setIsRunning] = useState<boolean>(false);

  // стейты из слайсов
  const { isFocus, isRunning } = useAppSelector((state) => state.timer);
  const { chill, focus } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  // состояния текущих секунд и минут таймера
  const [seconds, setSeconds] = useState(focus.seconds);
  const [minutes, setMinutes] = useState(focus.minutes);

  // эффекты которые изменяют секунды и минуты при изменении настроек

  useEffect(() => {
    if (isFocus) {
      setSeconds(focus.seconds);
      setMinutes(focus.minutes);
    }
  }, [focus.seconds, focus.minutes]);

  useEffect(() => {
    if (!isFocus) {
      setSeconds(chill.seconds);
      setMinutes(chill.minutes);
    }
  }, [chill.seconds, chill.minutes]);

  // эффект таймера

  useEffect(() => {
    // ЕСЛИ ТАЙМЕР РАБОТАЕТ
    if (isRunning) {
      // ЗАПУСКАЕМ ИНТЕРВАЛ
      let interval = setInterval(() => {
        // ЕСЛИ СЕКУНДЫ ЗАКОНЧИЛИСЬ
        if (seconds <= 0) {
          // А МИНУТЫ НЕ ЗАКОНЧИЛИСЬ
          if (minutes > 0) {
            // ТО ОТНИМАЕМ МИНУТУ
            setMinutes((m) => m - 1);
            // А СЕКУНД СТАНОВИТСЯ 59
            setSeconds(59);
            // ЕСЛИ МИНУТЫ ТОЖЕ ЗАКОНЧИЛИСЬ
          } else {
            // ОЧИЩАЕМ ТАЙМЕР
            dispatch(isFocusOrNot());
            // И ЕСЛИ БЫЛ ФОКУС
            if (isFocus) {
              // ТО ЗАПУСКАЕМ ЧИЛЛ ТАЙМЕР
              setSeconds(chill.seconds);
              setMinutes(chill.minutes);
              // ЕСЛИ ЖЕ БЫЛ ЧИЛЛ
            } else {
              // ЗАПУСКАЕМ ФОКУС ТАЙМЕР
              setSeconds(focus.seconds);
              setMinutes(focus.minutes);
            }
          }
          // ЕСЛИ ВСЕ ЭТО НЕВЕРНО
        } else {
          // ПРОСТО ОТНИМАЕМ СЕКУНДУ
          setSeconds((seconds) => seconds - 1);
        }
        // делаем раз в секунду
      }, 1000);
      // и каждую секунду очищаем таймер чтобы они не множились при ререндере
      return () => clearInterval(interval);
    }
  });

  return (
    <div
      className={
        isFocus ? styles.timerContainerFocusRed : styles.timerContainerChillBlue
      }
    >
      <h1 className={styles.timerState}>{isFocus ? "Focus" : "Chilling"}</h1>
      <h1 className={styles.timer}>
        {minutes < 10 ? `0${minutes}` : `${minutes}`}:
        {seconds < 10 ? `0${seconds}` : `${seconds}`}
      </h1>
      <button
        className={
          isRunning ? styles.timerButtonRunning : styles.timerButtonNotRunning
        }
        onClick={() => dispatch(changeTimer())}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

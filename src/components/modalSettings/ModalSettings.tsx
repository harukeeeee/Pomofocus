import styles from "./modalSettings.module.css";
import iconClose from "../../images/iconClose.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  closeModal,
  setChillMinutes,
  setChillSeconds,
  setFocusMinutes,
  setFocusSeconds,
} from "../../store/reducers/modalSlice";
import { stopTimer } from "../../store/reducers/timerSlice";

export const ModalSettings = () => {
  const { isOpen, focus, chill } = useAppSelector((state) => state.modal);
  const { isFocus } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const handleInputChange = (
    setter: Function,
    value: string,
    min: number,
    condition: boolean
  ) => {
    const newValue = Math.max(Number(value), min);
    setter(newValue);

    if ((condition && isFocus) || (!condition && !isFocus)) {
      dispatch(stopTimer());
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalSettingsContainer}>
        <img
          onClick={() => dispatch(closeModal())}
          className={styles.iconClose}
          src={iconClose}
          alt="close"
        />
        <h1>Settings</h1>
        <p>
          focus duration{" "}
          <input
            className={styles.settingsInput}
            type="number"
            placeholder="minutes"
            value={focus.minutes}
            onChange={(e) =>
              handleInputChange(
                (val: number) => dispatch(setFocusMinutes(val)),
                e.target.value,
                1,
                true
              )
            }
            min={1}
          />{" "}
          :{" "}
          <input
            className={styles.settingsInput}
            type="number"
            placeholder="seconds"
            value={focus.seconds}
            onChange={(e) =>
              handleInputChange(
                (val: number) => dispatch(setFocusSeconds(val)),
                e.target.value,
                0,
                true
              )
            }
            min={0}
          />
        </p>
        <p>
          chill duration{" "}
          <input
            className={styles.settingsInput}
            type="number"
            placeholder="minutes"
            value={chill.minutes}
            onChange={(e) =>
              handleInputChange(
                (val: number) => dispatch(setChillMinutes(val)),
                e.target.value,
                1,
                false
              )
            }
            min={1}
          />{" "}
          :{" "}
          <input
            className={styles.settingsInput}
            type="number"
            placeholder="seconds"
            value={chill.seconds}
            onChange={(e) =>
              handleInputChange(
                (val: number) => dispatch(setChillSeconds(val)),
                e.target.value,
                0,
                false
              )
            }
            min={0}
          />
        </p>
      </div>
    </div>
  );
};

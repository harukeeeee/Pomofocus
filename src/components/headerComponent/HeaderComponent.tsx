import { useAppDispatch } from "../../hooks/redux";
import settings from "../../images/settingsIcon.svg";
import { openModal } from "../../store/reducers/modalSlice";
import styles from "./headerComponent.module.css";

export const HeaderComponent = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.headerContainer}>
      <p className={styles.headerTitleLogo}>Pomofocus</p>
      <img
        className={styles.headerSettingsLogo}
        src={settings}
        alt="settings-icon"
        onClick={() => dispatch(openModal())}
      />
    </div>
  );
};

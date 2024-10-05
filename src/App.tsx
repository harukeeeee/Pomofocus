import { TimerComponent } from "./components/timerComponent/TimerComponent";
import { HeaderComponent } from "./components/headerComponent/HeaderComponent";
import { useAppSelector } from "./hooks/redux";
import styles from "./App.module.css";
import { ModalSettings } from "./components/modalSettings/ModalSettings";

function App() {
  const { isFocus } = useAppSelector((state) => state.timer);

  return (
    <div className={isFocus ? styles.appFocus : styles.appChill}>
      <HeaderComponent />
      <TimerComponent />
      <ModalSettings />
    </div>
  );
}

export default App;

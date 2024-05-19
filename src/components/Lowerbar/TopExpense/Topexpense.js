import styles from "./Topexpense.module.css";
import { Barchart } from "../Barchart/Barchart.js";
function Topexpense({ categorySpends }) {
  return (
    <div className={styles.containerexpense}>
      <h2>Top expenses</h2>
      <div className={styles.expenses}>
        <Barchart categorySpends={categorySpends} />
      </div>
    </div>
  );
}

export { Topexpense };

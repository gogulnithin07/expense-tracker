import styles from "./Box.module.css";
import { Button } from "../Button/Button.js";
function Box({
  expense,
  children,
  balance,
  setBalance,
  expenseList,
  setExpenseList,
}) {
  return (
    <div className={styles.box}>
      <h3>
        {children}:<span> {children === "expenses" ? expense : balance}</span>
      </h3>
      <Button
        balance={balance}
        className={
          children === "expense" ? styles.expenseBtn : styles.incomeBtn
        }
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        setBalance={setBalance}>
        {children === "expenses" ? children : "balance"}
      </Button>
    </div>
  );
}
export { Box };

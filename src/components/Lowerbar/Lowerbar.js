import styles from "./Lower.module.css";
import { RecentTransaction } from "./RecentTransaction/RecenetTransaction";
import { Topexpense } from "./TopExpense/Topexpense";
function Lowerbar({
  balance,
  setBalance,
  expenseList,
  setExpenseList,
  categorySpends,
}) {
  return (
    <div className={styles.lowerbar}>
      <RecentTransaction
        balance={balance}
        setBalance={setBalance}
        expenseList={expenseList}
        setExpenseList={setExpenseList}
      />
      <Topexpense categorySpends={categorySpends} />
    </div>
  );
}
export { Lowerbar };

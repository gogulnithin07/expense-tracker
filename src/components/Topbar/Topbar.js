import styles from "./Topbar.module.css";
import { Box } from "./Box/Box.js";
import { Piee } from "./Piechart/Piechart.js";
function Topbar({
  expense,
  categorySpends,
  balance,
  setBalance,
  expenseList,
  setExpenseList,
}) {
  // piedata
  return (
    <div className={styles.containerTopbar}>
      <Box className={styles.box} balance={balance} setBalance={setBalance}>
        wallet balance
      </Box>
      <Box
        balance={balance}
        expense={expense}
        setBalance={setBalance}
        expenseList={expenseList}
        setExpenseList={setExpenseList}>
        expenses
      </Box>
      <Piee
        data1={[
          { name: "food", value: categorySpends.food },
          { name: "travel", value: categorySpends.travel },
          { name: "entertainment", value: categorySpends.entertainment },
        ]}
      />
    </div>
  );
}

export { Topbar };

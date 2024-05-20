import { Topbar } from "./components/Topbar/Topbar";
import { Lowerbar } from "./components/Lowerbar/Lowerbar";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
function App() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  useEffect(() => {
    console.log("bal changed by use effect", balance);
    if (mounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance, mounted]);
  useEffect(() => {
    const localBal = localStorage.getItem("balance");
    console.log(localBal, "get1");
    if (localBal) {
      setBalance(Number(localBal));
      console.log("no change", localBal, balance);
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
      console.log("change");
    }
    const items = JSON.parse(localStorage.getItem("expenses"));
    setExpenseList(items || []);
    setMounted(true);
  }, []);
  // for passing values in state
  useEffect(() => {
    // storing initial value
    if (expenseList.length > 0 || mounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
      const total = expenseList.slice().reduce((acc, val) => {
        return acc + val.price;
      }, 0);
      setExpense((c) => total);
    } else {
      setExpense(0);
    }
    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    expenseList.forEach((val) => {
      let category = val.category;
      if (category === "food") {
        foodSpends += val.price;
      }
      if (category === "travel") {
        travelSpends += val.price;
      }
      if (category === "entertainment") {
        entertainmentSpends += val.price;
      }
    });
    setCategorySpends({
      food: foodSpends,
      entertainment: entertainmentSpends,
      travel: travelSpends,
    });
  }, [expenseList, mounted]);

  return (
    <SnackbarProvider>
      <div className="App">
        <div className="container">
          {/* box 1 */}
          <h1 className="mainHeading">expense tracker</h1>
          <Topbar
            balance={balance}
            expense={expense}
            expenseList={expenseList}
            setExpenseList={setExpenseList}
            setBalance={setBalance}
            categorySpends={categorySpends}
          />
          <Lowerbar
            balance={balance}
            setBalance={setBalance}
            categorySpends={categorySpends}
            expenseList={expenseList}
            setExpenseList={setExpenseList}
          />
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;

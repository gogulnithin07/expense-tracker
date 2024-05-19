import { Topbar } from "./components/Topbar/Topbar";
import { Lowerbar } from "./components/Lowerbar/Lowerbar";
import { useEffect, useRef, useState } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
function App() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  // piestart
  // 3rd state
  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  // storing in local
  useEffect(() => {
    // check local
    const localBalance = localStorage.getItem("balance");
    console.log(localBalance, "get1");
    if (Number(localBalance) && Number(localBalance) !== 0) {
      setBalance(Number(localBalance));
      console.log("no change");
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
      console.log("change");
    }
    const items = JSON.parse(localStorage.getItem("expenses"));
    setExpenseList(items || []);
  }, []);
  // for passing values in state
  useEffect(() => {
    // storing initial value
    if (expenseList.length > 0) {
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
  }, [expenseList, expense]);
  // saving balance in local
  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);
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

import { useState } from "react";
import styles from "./Button.module.css";
import BalanceForm from "../Forms/BalanceForm/BalanceForm.js";
import { ExpenseForm } from "../Forms/ExpenseForm/ExpenseForm.js";
import ReactModal from "react-modal";
import { useSnackbar } from "notistack";
ReactModal.setAppElement(document.getElementById("root"));
function Button({
  children,
  balance,
  setBalance,
  expenseList,
  setExpenseList,
}) {
  // form show and not show state
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function handleAddBalance(e) {
    e.preventDefault();
    const addIncomeValue = +e.target.income.value;
    if (addIncomeValue > 0) {
      setBalance((c) => c + addIncomeValue);
    } else {
      enqueueSnackbar("Income should be greater than 0", {
        variant: "warning",
      });
    }
    handleCloseModal();
  }
  return (
    <>
      <button
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        onClick={handleOpenModal}
        className={
          children === "expenses" ? styles.expenseBtn : styles.balanceBtn
        }>
        {"+add " + children}
      </button>
      {showModal && children === "balance" ? (
        <BalanceForm
          showModal={showModal}
          setShowModal={setShowModal}
          handleCloseModal={handleCloseModal}
          handleAddBalance={handleAddBalance}
        />
      ) : showModal && children === "expenses" ? (
        <ExpenseForm
          balance={balance}
          showModal={showModal}
          setShowModal={setShowModal}
          handleCloseModal={handleCloseModal}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
        />
      ) : null}
    </>
  );
}
export { Button };

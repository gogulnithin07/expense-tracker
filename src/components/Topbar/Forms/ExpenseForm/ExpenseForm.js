import { useState } from "react";
import ReactModal from "react-modal";
import styles from "./ExpenseForm.module.css";
import { SnackbarProvider, useSnackbar } from "notistack";
ReactModal.setAppElement(document.getElementById("root"));
const ExpenseForm = ({
  balance,
  showModal,
  handleCloseModal,
  expenseList,
  setExpenseList,
  setBalance,
}) => {
  // state for inputs form expenses form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  //
  const { enqueueSnackbar } = useSnackbar();
  function handleSubmit(e) {
    e.preventDefault();
    if (balance < price) {
      enqueueSnackbar("Price should be less than the wallet balance", {
        variant: "warning",
      });
      handleCloseModal();
      return;
    }

    const obj = {
      title,
      price,
      category,
      date,
      id: crypto.randomUUID(),
    };
    setExpenseList((lists) => [...lists, obj]);
    setBalance((balance) => balance - Number(price));
    // resetting
    setTitle("");
    setCategory("");
    setPrice("");
    setDate("");
    // closing
    handleCloseModal();
    // decreasing the wallet balance
  }
  // modal style
  const customStyles = {
    content: {
      width: "95%",
      maxWidth: "572px",
      top: "50%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      height: "fit-content",
      maxHeight: "90vh",
      background: "rgba(239, 239, 239, 0.85)",
      border: "0",
      borderRadius: "15px",
      padding: "2rem",
    },
  };
  return (
    <div>
      <ReactModal
        style={customStyles}
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}>
        {/* content */}
        <div className={styles.formEl}>
          <h3 className={styles.one}>Add Expenses</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                value={price}
                type="number"
                onChange={(e) => setPrice(+e.target.value)}
                placeholder="Price"
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required>
                <option value="" disabled>
                  Select category
                </option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="entertainment">Entertainment</option>
              </select>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              style={{
                backgroundColor: "rgba(244, 187, 74, 1)",
                color: "rgba(255, 255, 255, 1)",
              }}
              className={styles.btn}
              type="submit">
              Add expense
            </button>

            <button
              style={{
                backgroundColor: "rgb(227, 227, 227 )",
                color: "background: rgba(0, 0, 0, 1)",
              }}
              className={styles.btn}
              type="click"
              onClick={handleCloseModal}>
              Close Modal
            </button>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};
export { ExpenseForm };

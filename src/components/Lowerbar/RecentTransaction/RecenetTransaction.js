import styles from "./RecentTransaction.module.css";
import ReactModal from "react-modal";
import { useState } from "react";
import { PiPizzaThin } from "react-icons/pi";
import { BsSuitcase2 } from "react-icons/bs";
import { GoGift } from "react-icons/go";
import { FaPenClip } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSnackbar } from "notistack";
ReactModal.setAppElement(document.getElementById("root"));
// parent
function RecentTransaction({
  balance,
  setBalance,
  expenseList,
  setExpenseList,
}) {
  const [displayList, setDisplayList] = useState(3);
  const [pageNum, setPageNum] = useState(1);
  return (
    <div className={styles.containerTransaction}>
      <h2>Recent transactions</h2>
      <div className={styles.transactions}>
        {expenseList.length === 0 ? (
          <p
            style={{
              fontSize: "22px",
              fontFamily: "sans-serif",
              paddingTop: "10px",
              fontWeight: "400",
            }}>
            No transactions!
          </p>
        ) : (
          <>
            {expenseList.slice(displayList - 3, displayList).map((obj) => (
              <CreateExpenseElement
                key={crypto.randomUUID()}
                obj={obj}
                balance={balance}
                setBalance={setBalance}
                expenseList={expenseList}
                setExpenseList={setExpenseList}
              />
            ))}
            {true && (
              <div className={styles.pagination}>
                <button
                  onClick={(e) => {
                    if (displayList > 3) {
                      setDisplayList((c) => c - 3);
                      setPageNum((c) => c - 1);
                    }
                  }}>
                  <FaArrowLeftLong />
                </button>
                <p>{pageNum}</p>
                <button
                  onClick={(e) => {
                    if (expenseList.length > displayList) {
                      setDisplayList((c) => c + 3);
                      setPageNum((c) => c + 1);
                    }
                  }}>
                  <FaArrowRightLong />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
// child
function CreateExpenseElement({
  obj,
  balance,
  setBalance,
  expenseList,
  setExpenseList,
}) {
  //
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  //
  function handleDeleteItem() {
    console.log(obj);
    setBalance((balance) => balance + obj.price);
    setExpenseList((lists) => {
      return [...lists].filter((val) => val.id !== obj.id);
    });
  }
  function formattedDate(timestamp) {
    const date = new Date(timestamp);
    // Get the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    // Format the date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  console.log(obj.date);
  obj.date = formattedDate(obj.date);
  return (
    <div className={styles.list}>
      <div className={styles.listContainerOne}>
        <div className={styles.categoryIcon}>
          {obj.category === "food" && <PiPizzaThin />}
          {obj.category === "entertainment" && <GoGift />}
          {obj.category === "travel" && <BsSuitcase2 />}
        </div>
        <div style={{ textAlign: "center" }}>
          <p className={styles.title}>{obj.price}</p>
          <p className={styles.date}>
            {new Date(obj.date).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className={styles.listContainerTwo}>
        <p
          style={{
            color: "#F4BB4A",
            fontWeight: "700",
            fontSize: "22px",
          }}>
          ₹{obj.price}
        </p>
        <div className={styles.buttonWrapper}>
          <button
            style={{ backgroundColor: "#FF3E3E" }}
            type="click"
            onClick={handleDeleteItem}>
            <IoMdCloseCircleOutline />
          </button>
          <button
            className={styles.cardEdit}
            style={{ backgroundColor: "#F4BB4A" }}
            type="click"
            onClick={(e) => handleOpenModal()}>
            <FaPenClip />
          </button>
        </div>
        {showModal && (
          <EditForm
            obj={obj}
            balance={balance}
            setBalance={setBalance}
            expenseList={expenseList}
            setExpenseList={setExpenseList}
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
// grand child

const EditForm = ({
  obj,
  balance,
  setBalance,
  expenseList,
  setExpenseList,
  showModal,
  handleCloseModal,
}) => {
  //  function handleEditItem() {
  //     let ob = expenseList.find((val) => val.id === obj.id);
  //     console.log(ob);
  //   }
  // on
  // state for inputs form expenses form
  const [title, setTitle] = useState(obj.title);
  const [category, setCategory] = useState(obj.category);
  const [price, setPrice] = useState(obj.price);
  const [date, setDate] = useState(obj.date);
  const { enqueueSnackbar } = useSnackbar();
  //
  function handleSubmit(e) {
    e.preventDefault();
    console.log(balance, price, "km");
    if (balance < price) {
      enqueueSnackbar("Price should be less than the wallet balance", {
        variant: "warning",
      });
      handleCloseModal();
      return;
    }
    console.log(title, category, price, date);
    setExpenseList((lists) => {
      return lists.map((val) => {
        if (val.id === obj.id) {
          // updating balance
          const priceDifference = val.price - Number(price);
          setBalance((balance) => balance + priceDifference);
          return {
            title,
            category,
            price,
            date,
          };
        } else {
          return val;
        }
      });
    });

    // const obj = {
    //   title,
    //   price,
    //   category,
    //   date,
    //   id: crypto.randomUUID(),
    // };
    // setExpenseList((lists) => [...lists, obj]);
    // setBalance((balance) => balance - Number(price));
    // resetting
    // setTitle("");
    // setCategory("");
    // setPrice("");
    // setDate("");
    // closing
    handleCloseModal();
    // decreasing the wallet balance
  }
  // close
  console.log(obj);
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
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}>
        <div className={styles.formEl}>
          <h3 className={styles.one}>Edit Expenses</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
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
              className={`${styles.btn} ${styles.btnCancel}`}
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

export { RecentTransaction };

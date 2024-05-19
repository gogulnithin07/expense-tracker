import styles from "./BalanceForm.module.css";
import ReactModal from "react-modal";
ReactModal.setAppElement(document.getElementById("root"));
const BalanceForm = ({ showModal, handleCloseModal, handleAddBalance }) => {
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
        isOpen={showModal}
        style={customStyles}
        contentLabel="onRequestClose Example"
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}>
        <form onSubmit={(e) => handleAddBalance(e)}>
          <h3 className={styles.one}>Add balance</h3>
          <div className={styles.two}>
            <input
              type="number"
              name="income"
              id="income"
              placeholder="income amount"
            />
            <button
              style={{
                backgroundColor: "rgba(244, 187, 74, 1)",
              }}
              type="submit">
              add balance
            </button>
            <button
              style={{ backgroundColor: "#E3E3E3", color: "black" }}
              onClick={handleCloseModal}>
              cancel
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default BalanceForm;

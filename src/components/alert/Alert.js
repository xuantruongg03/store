import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import style from "./Alert.module.scss";

function Alert() {
  const state = useSelector((state) => state.NotificationReducer);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: "CLOSE_NOTIFICATION",
      // data: state,
    })
  };


  return (
    <div className={clsx(state ? style.toastContainer : style.container)}>
      <div className={clsx(style.toast, style.toastYellow, style.addMargin)}>
        <FontAwesomeIcon icon={faWarning} className={style.toastIcon} />
        <div className={style.toastContent}>
          <p className={style.toastType}>Warning</p>
          <p className={style.toastMessage}>Being updated.</p>
        </div>
        <div className={style.toastClose} onClick={handleClose}>
          <svg
            version="1.1"
            viewBox="0 0 15.642 15.642"
            enableBackground="new 0 0 15.642 15.642"
          >
            <path
              fillRule="evenodd"
              d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Alert;

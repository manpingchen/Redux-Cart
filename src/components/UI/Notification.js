import { useEffect } from "react";
import classes from "./Notification.module.css";

const Notification = (props) => {
  const { title, status, message } = props;

  let specialClasses = "";

  if (status === "error") {
    specialClasses = `${classes.error} ${classes.animation}`;
  }

  if (status === "success") {
    specialClasses = `${classes.success} ${classes.animation}`;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <span className={classes.triangle}></span>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;

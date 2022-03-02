import styles from "./input-field.module.css";

export default function InputField({ label, type = "text", ...rest }) {
  const El = type === "textarea" ? "textarea" : "input";
  const inputType = type === "textarea" ? undefined : type;
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <El className={styles.input} type={inputType} {...rest} />
    </label>
  );
}

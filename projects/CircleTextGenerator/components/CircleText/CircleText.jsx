import styles from "./circle-text.module.css";

export default function CircleText({ text, size, fontSize, fontColor }) {
  const rotation = 360 / text.length;
  const charHeight = `${size / 2}px`;
  return (
    <div>
      <div
        className={styles.wrapper}
        style={{
          color: fontColor,
          fontSize: `${fontSize}px`,
          height: `${size}px`,
          width: `${size}px`,
        }}
      >
        {text.split("").map((char, i) => {
          return (
            <span
              className={styles.char}
              style={{
                transform: `rotate(${rotation * i}deg)`,
                height: charHeight,
              }}
              key={i}
            >
              {/^\s+$/.test(char) ? <span>&nbsp;</span> : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

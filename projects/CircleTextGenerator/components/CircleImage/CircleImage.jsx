import styles from "./circle-image.module.css";

export default function CircleImage({ src, size }) {
  if (!src) {
    return null;
  }

  const imageStyles = {
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <div className={styles.wrapper} style={imageStyles}>
      <img style={imageStyles} src={src} alt="" />
    </div>
  );
}

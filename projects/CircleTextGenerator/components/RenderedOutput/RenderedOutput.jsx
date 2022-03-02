import { forwardRef } from "react";
import styles from "./rendered-output.module.css";

const RenderedOutput = forwardRef(function RenderedOutput(
  { children, size },
  ref
) {
  return (
    <div className={styles.wrapper}>
      <div
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
});

export default RenderedOutput;

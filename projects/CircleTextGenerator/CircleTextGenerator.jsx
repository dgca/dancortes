import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import styled from "styled-components";

import RenderedOutput from "./components/RenderedOutput/RenderedOutput";
import CircleText from "./components/CircleText/CircleText";
import CircleImage from "./components/CircleImage/CircleImage";
import InputField from "./components/InputField/InputField";

const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");
  background-color: #2e2bff;
  color: #202030;
  font-family: "Source Code Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 40px 16px;
  font-size: 20px;

  h1 {
    text-align: center;
    color: white;
    margin-bottom: 40px;
    font-size: 48px;
    font-family: serif;
    letter-spacing: 12px;
  }

  p,
  hr {
    color: white;
    margin-bottom: 1.5em;
  }

  hr {
    border: 1px dashed white;
  }

  .boundary {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
    padding-bottom: 80px;
  }

  .button {
    padding: 1em;
    font-weight: bold;
    font-size: 1em;
    border: 0;
    border-radius: 0.25em;
    background-color: #ffe066;
    color: inherit;
    cursor: pointer;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
  }

  .button:hover:not(:active),
  .button:focus {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    transition: box-shadow 0.15s;
  }
`;

export default function CircularTextGenerator() {
  const [containerSize, setContainerSize] = useState(420);
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(30);
  const [text, setText] = useState(
    "THIS TOOL WAS MADE BY → DAN CORTES • dancortes.dev • "
  );
  const [imageSize, setImageSize] = useState(340);
  const [image, setImage] = useState(null);

  const contentRef = useRef();
  const fileReader = useRef(
    globalThis.FileReader ? new FileReader() : null
  ).current;
  useEffect(() => {
    fileReader.addEventListener("load", () => {
      setImage(fileReader.result);
    });
  }, [fileReader]);

  return (
    <Wrapper>
      <h1>Circle text generator</h1>
      <RenderedOutput ref={contentRef} size={containerSize}>
        <CircleText
          text={text}
          size={containerSize}
          fontSize={fontSize}
          fontColor={fontColor}
        />
        <CircleImage src={image} size={imageSize} />
      </RenderedOutput>
      <div className="boundary">
        <p>
          This circle text generator lets you easily create an image of text
          that follows the curve of a circle. You can put an image inside the
          text for extra swag factor.
        </p>
        <p>
          This tool works entirely in the browser, so the text and image you add
          won't be shared with anyone. Enjoy.
        </p>
        <hr />
        <InputField
          label="Container size"
          value={containerSize}
          type="number"
          onChange={(e) => {
            const newSize = parseInt(e.target.value, 10);
            setContainerSize(newSize);
          }}
        />
        <InputField
          label="Text size"
          value={fontSize}
          type="number"
          onChange={(e) => {
            const newSize = parseInt(e.target.value, 10);
            setFontSize(newSize);
          }}
        />
        <InputField
          label="Text color"
          value={fontColor}
          type="color"
          onChange={(e) => {
            setFontColor(e.target.value);
          }}
        />
        <InputField
          label="Text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="textarea"
          rows={3}
        />
        <InputField
          label="Image size"
          value={imageSize}
          type="number"
          onChange={(e) => {
            const newSize = parseInt(e.target.value, 10);
            setImageSize(newSize);
          }}
        />
        <InputField
          label="Image"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              fileReader.readAsDataURL(file);
            }
          }}
          accept="image/png, image/jpeg"
        />
        <button
          className="button"
          onClick={() => {
            toPng(contentRef.current, {
              cacheBust: true,
            }).then(function (dataUrl) {
              const link = document.createElement("a");
              link.download = "generated-image.png";
              link.href = dataUrl;
              link.click();
            });
          }}
        >
          Download Image
        </button>
      </div>
    </Wrapper>
  );
}

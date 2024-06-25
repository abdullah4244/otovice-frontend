import TextArea from "antd/es/input/TextArea";
import "./LLMPromt.css";

const LLMPromt = ({ setPromt, promt }) => {
  return (
    <>
      <label>Ask Anything</label>
      <TextArea
        rows={4}
        placeholder="maxLength is 1000"
        maxLength={1000}
        onChange={(e) => setPromt(e.target.value)}
        value={promt}
      />
    </>
  );
};

export default LLMPromt;

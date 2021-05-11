// import styled from "styled-components";
import { Button } from "@material-ui/core";

const MultiStepForm = ({ step, children, setStep }) => {
  const footer =
    step === 0 ? (
      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px 28px",
        }}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => setStep((s) => s + 1)}>
          Next
        </Button>
      </footer>
    ) : step === children.length - 1 ? (
      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px 28px",
        }}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
      </footer>
    ) : (
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 28px",
        }}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => setStep((s) => s - 1)}>
          Back
        </Button>
        <Button
          color='primary'
          variant='contained'
          onClick={() => setStep((s) => s + 1)}>
          Next
        </Button>
      </footer>
    );
  return (
    <section>
      {children[step]}
      {footer}
    </section>
  );
};
export default MultiStepForm;

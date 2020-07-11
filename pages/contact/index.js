import { useState } from "react";
import styled, { css } from "styled-components";
import Layout from "../../components/Layout/Layout.react";
import { Container } from "../../components/MainPageTypeset/MainPageTypeset.react";
import Heading from "../../components/Heading/Heading.react";
import Paragraph from "../../components/Paragraph/Paragraph.react";
import FAIcon from "../../components/FAIcon/FAIcon.react";

const Form = styled.form`
  margin: 4rem 0;
`;

const Field = styled.label`
  display: block;
  margin-bottom: 1em;
`;

const Label = styled.div`
  font-family: var(--font-heading);
  margin-bottom: 0.5em;
`;

const Input = styled.input.attrs(() => ({
  type: "text",
}))`
  padding: 10px;
  width: 100%;

  ${(props) =>
    props.as === "textarea" &&
    css`
      min-height: 150px;
    `}
`;

const Button = styled.button`
  background-color: var(--blue);
  border-radius: 0.25em;
  border: 0;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  font-size: 1.8rem;
  outline: none;
  padding: 0.75em 1em;

  &:focus,
  &:hover:not(:active) {
    box-shadow: 0 0.1em 0.25em rgba(0, 0, 0, 0.25);
    transform: translateY(-0.1em);
    transition: box-shadow 0.25s, transform 0.25s;
  }
`;

const Message = styled.p`
  background-color: var(--pink);
  border-radius: 0.5em;
  font-family: var(--font-code);
  font-size: 1.6rem;
  padding: 1em 1.5em;

  ${(props) =>
    props.type === "error" &&
    css`
      background-color: white;
      border: 1px solid var(--red);
    `}
`;

const LoadingBg = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  bottom: 0;
  display: flex;
  font-size: 4rem;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const Loading = () => (
  <LoadingBg>
    <FAIcon icon="spinner" pulse />
  </LoadingBg>
);

const fields = {
  email: "email",
  firstname: "firstname",
  lastname: "lastname",
  message: "message",
};

async function handleSubmit({ event, onStart, onSuccess, onError, onEnd }) {
  event.preventDefault();
  onStart();
  const data = Object.entries(fields).reduce((acc, [property, name]) => {
    const value = event.target[name].value;
    if (!value) {
      throw Error(
        "Form field with empty value found. All fields are required."
      );
    }
    acc[property] = value;
    return acc;
  }, {});

  try {
    const res = await window.fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        pageUrl: window.location.href,
        pageTitle: document.title,
      }),
    });

    const payload = await res.json();

    if (!res.ok) {
      throw payload;
    }

    onSuccess(payload);
  } catch (err) {
    onError(err);
  } finally {
    onEnd();
  }
}

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  return (
    <Layout title="Contact">
      <Container>
        <Heading>Wanna talk? Hit me up!</Heading>
        <Paragraph>
          Okay, so first things first, I'm probably not looking to switch jobs.
          That said, if you have an opportunity I <em>must</em> hear about, feel
          free to reach out.
        </Paragraph>
        <Paragraph>
          Aside from that, if you need some freelance work done, need general
          development help, want me to speak at your event, need a belay
          partner, or want to do a cross country bike ride, hit me up and I'll
          be in touch as soon as I can.
        </Paragraph>
        {error && !isSubmitted && <Message type="error">{error}</Message>}
        {isSubmitted ? (
          <Message>
            Thanks for your submission! I'll be in touch soon :-)
          </Message>
        ) : (
          <Form
            onSubmit={(event) => {
              handleSubmit({
                event,
                onStart() {
                  setIsPending(true);
                },
                onSuccess() {
                  setIsSubmitted(true);
                },
                onError(error) {
                  if (error.errors?.[0]?.errorType === "INVALID_EMAIL") {
                    setError("The email you entered is not valid.");
                  } else {
                    setError(error.message);
                  }
                },
                onEnd() {
                  setIsPending(false);
                },
              });
            }}
          >
            {isPending && <Loading />}
            <Field>
              <Label>Email</Label>
              <Input
                type="email"
                name={fields.email}
                placeholder="phoebe@example.com"
                required
              />
            </Field>
            <Field>
              <Label>First name</Label>
              <Input name={fields.firstname} placeholder="Phoebe" required />
            </Field>
            <Field>
              <Label>Last name</Label>
              <Input name={fields.lastname} placeholder="Bean" required />
            </Field>
            <Field>
              <Label>Message</Label>
              <Input
                as="textarea"
                name={fields.message}
                placeholder="Hi, let's build something."
                required
              />
            </Field>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Container>
    </Layout>
  );
};

export default Contact;

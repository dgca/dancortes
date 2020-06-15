import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout.react";
import {
  Container,
  Heading,
  Paragraph,
} from "../../components/MainPageTypeset/MainPageTypeset.react";

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

const Input = styled.input.attrs((props) => ({
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

const fields = {
  email: "email",
  firstname: "firstname",
  lastname: "lastname",
  message: "message",
};

async function handleSubmit(e) {
  e.preventDefault();
  const data = Object.entries(fields).reduce((acc, [property, name]) => {
    const value = e.target[name].value;
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

    const payload = res.json();

    if (!res.ok) {
      throw Error(payload.error);
    }
  } catch (err) {
    console.warn(err);
  }
}

const Contact = () => {
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
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Email</Label>
            <Input
              type="email"
              name={fields.email}
              placeholder="hello@world.com"
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
              placeholder="Hi, I want to talk about hamnsters and how cute they are."
              required
            />
          </Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default Contact;

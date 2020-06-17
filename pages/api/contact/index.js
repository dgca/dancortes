import fetch from "node-fetch";

const portalId = "1569182";
const formId = "991b74da-f26d-43bc-96e0-70515a38e377";
const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

export default async function contact(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { email, firstname, lastname, message, pageUrl, pageTitle } = req.body;

  if (
    [email, firstname, lastname, message, pageUrl, pageTitle].some((x) => !x)
  ) {
    res.statusCode = 400;
    res.json({
      error: "Validation error: All fields are required",
    });
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submittedAt: Date.now(),
        context: {
          pageUri: pageUrl,
          pageName: pageTitle,
        },
        fields: [
          {
            name: "email",
            value: email,
          },
          {
            name: "firstname",
            value: firstname,
          },
          {
            name: "lastname",
            value: lastname,
          },
          {
            name: "message",
            value: message,
          },
        ],
      }),
    });

    const payload = await response.json();

    res.statusCode = payload.status === "error" ? 400 : 200;

    res.json(payload);
  } catch (err) {
    res.statusCode = 500;

    res.json({
      message: "Something went wrong. Please try again.",
    });
  }
}

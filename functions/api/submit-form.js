
export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email'); // L'email del mittente del form
    const message = formData.get('message');

    // Controlli base (opzionale)
    if (!name || !email || !message) {
      return new Response("Missing form fields.", { status: 400 });
    }

    const SENDGRID_API_KEY = env.SENDGRID_API_KEY; // Recupera la tua API Key dalla variabile d'ambiente
    const YOUR_RECIPIENT_EMAIL = "salvatore.caiazzo94@gmail.com"; // <--- CAMBIA CON LA TUA EMAIL!
    const SENDER_EMAIL_DOMAIN = "info@salvatorecaiazzo.com"; // <--- CAMBIA CON UN INDIRIZZO VERIFICATO NEL TUO SERVIZIO EMAIL (es. noreply@salvatorecaiazzo.com)

    const sendEmailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: YOUR_RECIPIENT_EMAIL }],
            // reply_to: { email: email, name: name } // Opzionale: imposta la reply-to per rispondere direttamente al mittente del form
          },
        ],
        from: { email: SENDER_EMAIL_DOMAIN, name: "Contatto Sito Web" },
        subject: `Nuovo messaggio dal tuo sito da ${name}`,
        content: [
          {
            type: "text/plain",
            value: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
          },
        ],
      }),
    });

    if (sendEmailResponse.ok) {
      return new Response("Messaggio inviato con successo!", { status: 200, headers: { 'Content-Type': 'text/plain' } });
    } else {
      const errorBody = await sendEmailResponse.json();
      console.error("Error sending email:", errorBody);
      return new Response(`Errore nell'invio del messaggio: ${JSON.stringify(errorBody)}`, { status: sendEmailResponse.status });
    }

  } catch (error) {
    console.error("Function error:", error);
    return new Response(`Errore interno del server: ${error.message}`, { status: 500 });
  }
}

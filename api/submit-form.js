export async function onRequestPost({ request, env }) {
  try {
    // 1. Parsa i dati del form
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // 2. Costruisci il corpo dell'email
    const subject = `Nuovo messaggio dal tuo sito web da ${name}`;
    const emailBody = `
      Nome: ${name}
      Email: ${email}
      Messaggio:
      ${message}
    `;

    // 3. Invia l'email usando Mailchannels (integrato con Cloudflare)
    // Assicurati che il tuo dominio sia attivo su Cloudflare
    // e che i record MX puntino a Cloudflare (se usi Cloudflare per l'email).
    const emailResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "salvatore.caiazzo94@gmail.com", name: "Salvatore Caiazzo" }], // <--- CAMBIA CON LA TUA EMAIL!
            dkim_domain: "salvatore.caiazzo.com", // <--- CAMBIA CON IL TUO DOMINIO! es. salvatorecaiazzo.com
            dkim_selector: "mailchannels",
            dkim_private_key: env.MAILCHANNELS_DKIM_PRIVATE_KEY, // Variabile d'ambiente, vedi Passo 4
          },
        ],
        from: {
          email: "no-reply@tuo-dominio.com", // <--- CAMBIA CON UN SOTTODOMINIO DEL TUO DOMINIO! es. no-reply@salvatorecaiazzo.com
          name: "Form Contatti Sito",
        },
        subject: subject,
        content: [
          {
            type: "text/plain",
            value: emailBody,
          },
        ],
      }),
    });

    const emailResult = await emailResponse.json();

    if (emailResponse.ok) {
      console.log("Email inviata con successo:", emailResult);
      // Reindirizza l'utente o mostra un messaggio di successo
      return new Response("Messaggio inviato con successo!", { status: 200, headers: { 'Content-Type': 'text/plain' } });
      // Oppure puoi reindirizzare:
      // return Response.redirect(request.url + '?success=true', 302);
    } else {
      console.error("Errore nell'invio dell'email:", emailResult);
      return new Response("Errore nell'invio del messaggio.", { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }

  } catch (error) {
    console.error("Errore generico della funzione:", error);
    return new Response(`Errore interno del server: ${error.message}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }
}

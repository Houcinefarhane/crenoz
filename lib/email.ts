import { Resend } from "resend";

// Initialiser Resend avec la clé API (une seule pour toute l'application)
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendBookingConfirmationParams {
  to: string; // Email du destinataire
  from: string; // Email de l'expéditeur (peut être personnalisé par utilisateur)
  fromName: string; // Nom de l'expéditeur
  attendeeName: string;
  attendeeEmail: string;
  eventName: string;
  startTime: Date;
  endTime: Date;
  timezone?: string;
  notes?: string;
}

/**
 * Envoie un email de confirmation au professionnel (propriétaire du calendrier)
 */
export async function sendBookingConfirmationToPro(
  params: SendBookingConfirmationParams
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("❌ RESEND_API_KEY non configurée, email non envoyé");
    return { success: false, error: "RESEND_API_KEY non configurée" };
  }

  try {
    const { to, from, fromName, attendeeName, attendeeEmail, eventName, startTime, endTime, timezone = "Europe/Paris", notes } = params;

    console.log("📧 Envoi email au professionnel:", { to, from, fromName, eventName });

    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: timezone,
    }).format(startTime);

    const formattedStartTime = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    }).format(startTime);

    const formattedEndTime = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    }).format(endTime);

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${from}>`, // Personnalisé par utilisateur
      to: [to], // Email du professionnel
      subject: `Nouvelle réservation : ${eventName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouvelle réservation</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #10b981, #14b8a6); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle réservation !</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
              <h2 style="color: #111827; margin-top: 0;">Détails de la réservation</h2>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <p style="margin: 10px 0;"><strong>Type de rendez-vous :</strong> ${eventName}</p>
                <p style="margin: 10px 0;"><strong>Date :</strong> ${formattedDate}</p>
                <p style="margin: 10px 0;"><strong>Heure :</strong> ${formattedStartTime} - ${formattedEndTime}</p>
                <p style="margin: 10px 0;"><strong>Client :</strong> ${attendeeName}</p>
                <p style="margin: 10px 0;"><strong>Email du client :</strong> ${attendeeEmail}</p>
                ${notes ? `<p style="margin: 10px 0;"><strong>Notes :</strong> ${notes}</p>` : ""}
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Cette réservation a été créée via votre page Crenoz.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Erreur Resend (Pro):", JSON.stringify(error, null, 2));
      return { success: false, error };
    }

    console.log("✅ Email envoyé au professionnel avec succès:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email (Pro):", error);
    return { success: false, error };
  }
}

/**
 * Envoie un email de confirmation au client (personne qui réserve)
 */
export async function sendBookingConfirmationToClient(
  params: SendBookingConfirmationParams
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("❌ RESEND_API_KEY non configurée, email non envoyé");
    return { success: false, error: "RESEND_API_KEY non configurée" };
  }

  try {
    const { to, from, fromName, attendeeName, eventName, startTime, endTime, timezone = "Europe/Paris", notes } = params;

    console.log("📧 Envoi email au client:", { to, from, fromName, eventName });

    const formattedDate = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: timezone,
    }).format(startTime);

    const formattedStartTime = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    }).format(startTime);

    const formattedEndTime = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    }).format(endTime);

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${from}>`, // Email personnalisé du professionnel
      to: [to], // Email du client
      subject: `Confirmation de votre réservation : ${eventName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation de réservation</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #10b981, #14b8a6); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Réservation confirmée !</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
              <p style="color: #111827; font-size: 16px;">Bonjour ${attendeeName},</p>
              
              <p style="color: #374151;">Votre réservation a été confirmée avec succès !</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <p style="margin: 10px 0;"><strong>Type de rendez-vous :</strong> ${eventName}</p>
                <p style="margin: 10px 0;"><strong>Date :</strong> ${formattedDate}</p>
                <p style="margin: 10px 0;"><strong>Heure :</strong> ${formattedStartTime} - ${formattedEndTime}</p>
                <p style="margin: 10px 0;"><strong>Avec :</strong> ${fromName}</p>
                ${notes ? `<p style="margin: 10px 0;"><strong>Notes :</strong> ${notes}</p>` : ""}
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Vous recevrez un rappel avant votre rendez-vous.
              </p>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                Si vous avez des questions, n'hésitez pas à répondre à cet email.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Erreur Resend (Client):", JSON.stringify(error, null, 2));
      return { success: false, error };
    }

    console.log("✅ Email envoyé au client avec succès:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email (Client):", error);
    return { success: false, error };
  }
}

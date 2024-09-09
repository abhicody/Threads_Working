// pages/api/webhooks/smsWebhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookRequiredHeaders } from "svix";

// Define the type for the sms.created event data
interface SmsCreatedEvent {
  type: "sms.created";
  data: {
    id: string;
    phone_number: string;
    message: string;
    status: string;
    created_at: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const sig = req.headers["svix-signature"];

    if (typeof sig !== "string") {
      res.status(400).json({ error: "Invalid signature header" });
      return;
    }

    const payload = req.body;

    try {
      const webhook = new Webhook(process.env.WEBHOOK_SECRET as string);
      const headers: WebhookRequiredHeaders = {
        "svix-signature": sig,
        "svix-id": "",
        "svix-timestamp": "",
      };
      const event = webhook.verify(payload, headers) as SmsCreatedEvent;

      if (event.type === "sms.created") {
        // Handle the sms.created event
        const smsData = event.data;
        console.log("SMS Created:", smsData);

        // Add your custom logic here
      }

      res.status(200).json({ message: "Event received" });
    } catch (error) {
      console.error("Error verifying webhook:", error);
      res.status(400).json({ error: "Invalid signature" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

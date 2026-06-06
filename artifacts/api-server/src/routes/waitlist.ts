import { Router } from "express";
import { db, waitlistTable } from "@workspace/db";
import { count } from "drizzle-orm";
import { JoinWaitlistBody } from "@workspace/api-zod";
import nodemailer from "nodemailer";

const router = Router();

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

async function sendNotificationEmail(name: string | undefined, email: string) {
  const transporter = createTransporter();
  if (!transporter) return;
  await transporter.sendMail({
    from: `"Gyan Travels" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "New Waitlist Signup — Gyan Travels",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;border:1px solid #eee;border-radius:8px;">
        <h2 style="color:#f5a623;margin-top:0;">🚌 New Waitlist Signup</h2>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="border:none;border-top:1px solid #eee;"/>
        <p style="color:#999;font-size:12px;">Gyan Travels — Don't worry when you travel with GT</p>
      </div>
    `,
  });
}

router.post("/waitlist", async (req, res) => {
  const parsed = JoinWaitlistBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  const { email, name } = parsed.data;

  try {
    const [entry] = await db
      .insert(waitlistTable)
      .values({ email, name: name ?? null })
      .returning();

    sendNotificationEmail(name, email).catch((err) => {
      req.log.warn({ err }, "Failed to send notification email");
    });

    res.status(201).json(entry);
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error?.code === "23505") {
      res.status(400).json({ error: "This email is already on the waitlist" });
    } else {
      req.log.error({ err }, "Error inserting into waitlist");
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.get("/waitlist/count", async (req, res) => {
  try {
    const [result] = await db.select({ count: count() }).from(waitlistTable);
    res.json({ count: Number(result.count) });
  } catch (err) {
    req.log.error({ err }, "Error fetching waitlist count");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

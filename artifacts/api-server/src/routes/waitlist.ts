import { Router } from "express";
import { db, waitlistTable } from "@workspace/db";
import { count } from "drizzle-orm";
import { JoinWaitlistBody } from "@workspace/api-zod";

const router = Router();

router.post("/waitlist", async (req, res) => {
  const parsed = JoinWaitlistBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  const { email } = parsed.data;

  try {
    const [entry] = await db
      .insert(waitlistTable)
      .values({ email })
      .returning();
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

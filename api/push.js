// Vercel serverless proxy: forwards one attendance record to the odpay API.
// Avoids browser CORS issues. Target is fixed (not an open proxy).
const TARGET =
  process.env.BIO_API_URL ||
  "https://api.odpay.in/api/saveBioServerEmployeeAttendance";

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }
  try {
    const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
    const r = await fetch(TARGET, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body,
    });
    const text = await r.text();
    res.status(200).json({ upstreamStatus: r.status, ok: r.ok, body: text });
  } catch (e) {
    res.status(502).json({ upstreamStatus: 0, ok: false, body: String(e && e.message || e) });
  }
};

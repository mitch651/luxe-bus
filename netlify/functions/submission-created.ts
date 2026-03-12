/**
 * Custom form notification - sends formatted email via Resend.
 * Dates: Month Day, Year (e.g. February 27, 2025)
 * Times: 12-hour (e.g. 2:30 PM)
 *
 * IMPORTANT: To receive this formatted email instead of Netlify's default
 * (which shows raw YYYY-MM-DD and 24h time), disable Netlify's built-in
 * "Email notification" under Site Settings > Notifications > Form submission
 * notifications. Ensure RESEND_API_KEY and NOTIFICATION_EMAIL are set.
 */
/** Convert 24h time "14:30" to 12h "2:30 PM" - pass through if already formatted */
function to12h(time: string): string {
  if (!time || typeof time !== "string") return "";
  const trimmed = time.trim();
  if (!trimmed) return "";
  if (/AM|PM/i.test(trimmed)) return trimmed; // already 12h
  const [h, m] = trimmed.split(":").map(Number);
  if (isNaN(h)) return trimmed;
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m || 0).padStart(2, "0")} ${period}`;
}

/** Format date for display - pass through MM/DD/YYYY, convert YYYY-MM-DD to "Month Day, Year" */
function formatDateForEmail(dateStr: string): string {
  if (!dateStr || typeof dateStr !== "string") return "";
  const trimmed = dateStr.trim();
  if (!trimmed) return "";
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmed)) return trimmed; // MM/DD/YYYY - use as-is
  const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = MONTHS[parseInt(match[2], 10) - 1] || match[2];
    return `${month} ${parseInt(match[3], 10)}, ${match[1]}`;
  }
  const d = new Date(trimmed + "T12:00:00");
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  return trimmed;
}

/** Bold label + value row */
function row(label: string, value: string): string {
  if (!value) return "";
  return `<p><strong>${label}:</strong> ${value}</p>`;
}

/** Extract form data from Netlify payload (supports data object or ordered_human_fields array) */
function extractFormData(payload: Record<string, unknown>): Record<string, string> {
  const data = (payload.data || payload) as Record<string, unknown>;
  if (data && typeof data === "object" && Object.keys(data).length > 0) {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(data)) {
      if (v != null && typeof v === "string") out[k] = v;
    }
    if (Object.keys(out).length > 0) return out;
  }
  const ordered = payload.ordered_human_fields as Array<{ name?: string; key?: string; value?: unknown }> | undefined;
  if (Array.isArray(ordered)) {
    const out: Record<string, string> = {};
    for (const f of ordered) {
      const key = f.name || f.key;
      const val = f.value;
      if (key && val != null) out[key] = String(val);
    }
    return out;
  }
  return {};
}

export const handler = async (event: { body?: string }) => {
  const body = JSON.parse(event.body || "{}");
  const payload = (body.payload || body) as Record<string, unknown>;
  const data = extractFormData(payload);

  if (!data["form-name"] || data["form-name"] !== "trip-request") {
    return { statusCode: 200, body: "OK" };
  }

  const email = process.env.NOTIFICATION_EMAIL || process.env.RESEND_TO;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !email) {
    console.warn("RESEND_API_KEY and NOTIFICATION_EMAIL (or RESEND_TO) required for custom form emails");
    return { statusCode: 200, body: "OK" };
  }

  const quoteType = data["quote-type"] || "";
  const tripType = (data["trip-type"] || "").replace(/-/g, " ");
  const isAirport = quoteType === "airport";

  const arrivalTime12 = to12h(data["arrival-time"] || "");
  const departingTime12 = to12h(data["departing-time"] || "");
  const pickupTime12 = to12h(data["pickup-time"] || "");
  const arrivalDateFmt = formatDateForEmail(data["arrival-date"] || "");
  const departingDateFmt = formatDateForEmail(data["departing-date"] || "");

  const airportSection = isAirport
    ? `
  ${row("Quote Type", "Airport Pickup")}
  ${row("Pick-up (Airport)", data["pickup"] || "")}
  ${row("Drop-off (Location or Address)", data["dropoff"] || "")}
  ${row("Arrival Date", arrivalDateFmt)}
  ${row("Arrival Time", arrivalTime12)}
  ${row("Flight Number", data["flight-number"])}
  ${data["trip-type"] === "round-trip" ? row("Return Pick-up Address", data["airport-return-pickup-address"]) : ""}
  ${data["trip-type"] === "round-trip" ? row("Return Drop-off Address", data["airport-return-dropoff-address"]) : ""}
  ${data["trip-type"] === "round-trip" ? row("Departing Date", departingDateFmt) : ""}
  ${data["trip-type"] === "round-trip" ? row("Departing Time", departingTime12) : ""}
  `
    : `
  ${row("Quote Type", "Event Pickup")}
  ${row("Pick-up Address", data["pickup-address"])}
  ${row("Drop-off Address", data["dropoff-address"])}
  ${row("Pick-up Time", pickupTime12)}
  ${data["trip-type"] === "round-trip" ? row("Return Pick-up Address", data["return-pickup-address"]) : ""}
  ${data["trip-type"] === "round-trip" ? row("Return Drop-off Address", data["return-dropoff-address"]) : ""}
  ${data["trip-type"] === "round-trip" ? row("Estimated Hours", data["estimated-hours"] ? `${data["estimated-hours"]} hrs` : "") : ""}
  `;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 600px;">
  <h2>New Quote Request</h2>
  ${row("Name", data.name)}
  ${row("Email", data.email)}
  ${row("Phone", data.phone)}
  ${row("Timezone", data.timezone)}
  ${row("Trip Type", tripType)}
  ${row("Passengers", data.passengers)}
  ${airportSection}
  ${row("Any Stops?", data["stops-yes-no"])}
  ${data["stops-yes-no"] === "yes" ? row("Stops Where", data["stops-where"]) : ""}
  ${row("Car Seats", data["car-seats"])}
  ${row("Boosters", data.boosters)}
  ${row("Age of Children", data["age-of-children"])}
  ${row("Add On", data["add-on"])}
  ${row("Movie Choice", data["movie-choice"])}
  ${row("Welcome Sign Description", data["welcome-sign-description"])}
  ${row("Travel Agent", data["travel-agent"])}
  ${row("Travel Agency", data["travel-agency"])}
</body>
</html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "The Luxe Bus <onboarding@resend.dev>",
        to: email,
        subject: `Quote Request from ${data.name || "Unknown"}`,
        html,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return { statusCode: 500, body: err };
    }
  } catch (err) {
    console.error("Email send error:", err);
    return { statusCode: 500, body: String(err) };
  }
  return { statusCode: 200, body: "OK" };
};

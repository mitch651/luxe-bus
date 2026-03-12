# Netlify Deployment & Form Email Setup

## Instant Book (BookRidesOnline)

The Instant Book widget **will work on Netlify**. The BookRidesOnline script only has issues when the site is served from `localhost` (it tries to load assets from a non-existent port). On your live Netlify URL (e.g. `yoursite.netlify.app`), the widget loads correctly from `bookridesonline.com`.

## Form Notifications (Get a Quote & Reviews only)

**Instant Book** (BookRidesOnline) is separate — it handles its own bookings and does not submit to our forms. Form email notifications apply only to:
- **Get a Quote** (trip-request)
- **Reviews** (review-notification)

To get form notifications with **12-hour time** (not military), **Month Day, Year** date format, and **bold labels**, set up the following:

### 1. Disable the default Netlify form email

1. Go to **Netlify Dashboard** → **Site** → **Forms**
2. Click your form (e.g. `trip-request`)
3. Under **Form notifications**, edit or remove the default "Email notification" so you don't get duplicate emails

### 2. Use the custom submission handler

The `netlify/functions/submission-created.ts` function runs automatically when any form is submitted. It sends a custom-formatted email for `trip-request` submissions.

### 3. Configure Resend

1. Sign up at [resend.com](https://resend.com) (free tier available)
2. Verify your domain or use `onboarding@resend.dev` for testing
3. Create an API key
4. In **Netlify** → **Site settings** → **Environment variables**, add:
   - `RESEND_API_KEY` = your Resend API key
   - `NOTIFICATION_EMAIL` = email address to receive form submissions (e.g. `info@theluxe-bus.com`)
   - `RESEND_FROM` (optional) = sender like `The Luxe Bus <noreply@yourdomain.com>`

After deployment, form submissions will be emailed with the requested format.

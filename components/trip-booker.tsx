"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const TRAVEL_AGENTS = [
  "None",
  "Christy Powers",
  "Courtney Hidalgo",
  "Katherine Kerbel",
  "Kelly Hayes",
  "Myranda Barrientos",
  "Rachel Miles",
  "Tara Johansen",
  "Denise Hall",
  "Traci McCartney",
  "Amber Thell",
  "Maggie Carver",
  "Kayla Castro",
  "Cassie Todd-Jameson",
  "Kelley Addenbrooke",
  "Charla Swoveland",
];

const ADD_ONS = [
  "None",
  "Balloons $30",
  "Personalized Welcome/Birthday Sign $20",
  "Personalized TV Screen Saver (price varies)",
  "Mimosas $30",
  "Beer $25",
  "Seltzers $25",
  "Cupcake(s) (Price Varies)",
];

const TRAVEL_AGENCIES = [
  "None",
  "Academy Travel",
  "Castle Bound Travel",
  "Crazy Imagination Travel",
  "Once Upon a Wish Travel",
  "Travel Around with Courtney",
  "Special Kind Of Magic",
  "Traveling Ears Vacations",
];

const TIMEZONES = [
  "Pacific (PST/PDT) - California",
  "Mountain (MST/MDT)",
  "Central (CST/CDT)",
  "Eastern (EST/EDT)",
  "Other",
];

const AIRPORTS = [
  "LAX Airport",
  "SNA (John Wayne Airport)",
  "LGB (Long Beach Airport)",
  "ONT (Ontario Airport)",
  "SAN (San Diego Airport)",
  "Other",
];

const EVENT_LOCATIONS = [
  "Disneyland Resort",
  "Temecula Wine Country",
  "SoFi Stadium",
  "Dodger Stadium",
  "Las Vegas, NV",
  "San Diego, CA",
  "Hollywood, CA",
  "Other",
];

const formCard = "bg-white/5 border border-white/10 rounded-2xl p-6 mb-6";
const labelClass = "block text-white/50 text-xs uppercase tracking-wider mb-2 font-medium";

/** Convert 24h time "14:30" to 12h "2:30 PM" */
function to12h(time: string): string {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  if (isNaN(h)) return time;
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m || 0).padStart(2, "0")} ${period}`;
}

/** Convert "2025-02-27" to "February 27, 2025" */
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** Convert "2025-02-27" to "02/27/2025" (MM/DD/YYYY) - for form submission */
function formatDateMMDDYYYY(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  if (isNaN(d.getTime())) return dateStr;
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}
const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 focus:outline-none focus:border-[#c9a84c]/50 transition-colors text-base [color-scheme:dark]";

export default function TripBooker() {
  const [quoteType, setQuoteType] = useState<"airport" | "event">("airport");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timezone, setTimezone] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [botField, setBotField] = useState("");

  // Airport pickup fields
  const [airportPickup, setAirportPickup] = useState("");
  const [airportDropoff, setAirportDropoff] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departingDate, setDepartingDate] = useState("");
  const [departingTime, setDepartingTime] = useState("");
  const [airportReturnPickupAddress, setAirportReturnPickupAddress] = useState("");
  const [airportReturnDropoffAddress, setAirportReturnDropoffAddress] = useState("");

  // Event pickup fields
  const [eventPickupAddress, setEventPickupAddress] = useState("");
  const [eventDropoffAddress, setEventDropoffAddress] = useState("");
  const [eventPickupTime, setEventPickupTime] = useState("");
  const [eventReturnPickupAddress, setEventReturnPickupAddress] = useState("");
  const [eventReturnDropoffAddress, setEventReturnDropoffAddress] = useState("");
  const [eventEstimatedHours, setEventEstimatedHours] = useState("");

  // Add-ons (shared)
  const [travelAgent, setTravelAgent] = useState("None");
  const [carSeats, setCarSeats] = useState("");
  const [boosters, setBoosters] = useState("");
  const [ageOfChildren, setAgeOfChildren] = useState("");
  const [movieChoice, setMovieChoice] = useState("");
  const [welcomeSignDescription, setWelcomeSignDescription] = useState("");
  const [addOn, setAddOn] = useState("None");
  const [addOnOther, setAddOnOther] = useState("");
  const [stopsYesNo, setStopsYesNo] = useState<"yes" | "no" | "">("");
  const [stopsWhere, setStopsWhere] = useState("");
  const [travelAgency, setTravelAgency] = useState("None");

  const validateAndSubmit = async () => {
    setError("");
    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return false;
    }
    if (!lastName.trim()) {
      setError("Please enter your last name.");
      return false;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return false;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return false;
    }
    if (!timezone) {
      setError("Please select your timezone.");
      return false;
    }
    if (!passengers || passengers === "0") {
      setError("Please select the number of passengers.");
      return false;
    }

    if (quoteType === "airport") {
      if (!airportPickup.trim()) {
        setError("Please enter a pick-up location (airport).");
        return false;
      }
      if (!airportDropoff.trim()) {
        setError("Please enter a drop-off location.");
        return false;
      }
      if (!arrivalDate) {
        setError("Please select the arrival date.");
        return false;
      }
      if (!arrivalTime) {
        setError("Please select the arrival time.");
        return false;
      }
      if (!flightNumber.trim()) {
        setError("Please enter the passenger flight number.");
        return false;
      }
      if (tripType === "round-trip") {
        if (!airportReturnPickupAddress.trim()) {
          setError("Please enter the return pick-up address.");
          return false;
        }
        if (!airportReturnDropoffAddress.trim()) {
          setError("Please enter the return drop-off address.");
          return false;
        }
        if (!departingDate) {
          setError("Please select the departing date.");
          return false;
        }
        if (!departingTime) {
          setError("Please select the departing time.");
          return false;
        }
      }
    } else {
      if (!eventPickupAddress.trim()) {
        setError("Please enter the pick-up address.");
        return false;
      }
      if (!eventDropoffAddress.trim()) {
        setError("Please enter the drop-off address.");
        return false;
      }
      if (!eventPickupTime) {
        setError("Please select the pick-up time.");
        return false;
      }
      if (tripType === "round-trip") {
        if (!eventReturnPickupAddress.trim()) {
          setError("Please enter where we're picking them up for the return.");
          return false;
        }
        if (!eventReturnDropoffAddress.trim()) {
          setError("Please enter the return drop-off address.");
          return false;
        }
        if (!eventEstimatedHours) {
          setError("Please select estimated hours.");
          return false;
        }
      }
    }

    if (botField) {
      setError("Submission rejected.");
      return false;
    }
    return true;
  };

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

  /** Build payload for n8n AI Agent quote automation webhook */
  const buildN8nPayload = () => {
    const pickupLoc = quoteType === "airport" ? airportPickup : eventPickupAddress;
    const dropoffLoc = quoteType === "airport" ? airportDropoff : eventDropoffAddress;
    const tripDateVal = quoteType === "airport" ? arrivalDate : "";
    const tripTimeVal = quoteType === "airport" ? to12h(arrivalTime) : to12h(eventPickupTime);
    const tripTypeVal = quoteType === "airport" ? "Airport Transfer" : "Point to Point";
    const tripModeVal = tripType === "one-way" ? "One Way" : "Round Trip";
    const hoursVal = quoteType === "event" && eventEstimatedHours ? parseFloat(eventEstimatedHours) : null;

    const specialParts: string[] = [];
    if (addOn !== "None" && addOn !== "Other") specialParts.push(`Add-on: ${addOn}`);
    if (addOn === "Other" && addOnOther) specialParts.push(`Add-on: ${addOnOther}`);
    if (stopsYesNo === "yes" && stopsWhere) specialParts.push(`Stops: ${stopsWhere}`);
    if (carSeats) specialParts.push(`Car seats: ${carSeats}`);
    if (boosters) specialParts.push(`Boosters: ${boosters}`);
    if (ageOfChildren) specialParts.push(`Age of children: ${ageOfChildren}`);
    if (travelAgent !== "None") specialParts.push(`Travel agent: ${travelAgent}`);
    if (travelAgency !== "None") specialParts.push(`Travel agency: ${travelAgency}`);
    if (movieChoice) specialParts.push(`Movie: ${movieChoice}`);
    if (welcomeSignDescription) specialParts.push(`Welcome sign: ${welcomeSignDescription}`);
    if (quoteType === "airport" && flightNumber) specialParts.push(`Flight #: ${flightNumber}`);
    const specialRequests = specialParts.join(". ") || "";

    return {
      fullName,
      email: email.trim(),
      phone: phone.trim(),
      pickupLocation: pickupLoc || "",
      dropoffLocation: dropoffLoc || "",
      tripDate: tripDateVal || "",
      tripTime: tripTimeVal || "",
      tripType: tripTypeVal,
      passengers: parseInt(passengers) || 1,
      tripMode: tripModeVal,
      hoursNeeded: hoursVal,
      vehicleType: "No Preference",
      specialRequests,
      submittedAt: new Date().toISOString(),
      source: typeof window !== "undefined" ? window.location.href : "luxe-bus.com",
    };
  };

  const sendToN8n = async () => {
    const url = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!url) return;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildN8nPayload()),
      });
    } catch {
      // Fire-and-forget: don't block or surface errors to user
    }
  };

  const saveToSupabase = async () => {
    const payload = {
      quote_type: quoteType,
      trip_type: tripType,
      name: fullName,
      email: email.trim(),
      phone: phone.trim(),
      timezone,
      passengers,
      pickup: quoteType === "airport" ? airportPickup : undefined,
      dropoff: quoteType === "airport" ? airportDropoff : undefined,
      arrival_date: quoteType === "airport" ? formatDateMMDDYYYY(arrivalDate) || arrivalDate : undefined,
      arrival_time: quoteType === "airport" ? to12h(arrivalTime) || arrivalTime : undefined,
      flight_number: quoteType === "airport" ? flightNumber : undefined,
      airport_return_pickup_address: quoteType === "airport" ? airportReturnPickupAddress : undefined,
      airport_return_dropoff_address: quoteType === "airport" ? airportReturnDropoffAddress : undefined,
      departing_date: quoteType === "airport" ? formatDateMMDDYYYY(departingDate) || departingDate : undefined,
      departing_time: quoteType === "airport" ? to12h(departingTime) || departingTime : undefined,
      pickup_address: quoteType === "event" ? eventPickupAddress : undefined,
      dropoff_address: quoteType === "event" ? eventDropoffAddress : undefined,
      pickup_time: quoteType === "event" ? to12h(eventPickupTime) || eventPickupTime : undefined,
      return_pickup_address: quoteType === "event" ? eventReturnPickupAddress : undefined,
      return_dropoff_address: quoteType === "event" ? eventReturnDropoffAddress : undefined,
      estimated_hours: quoteType === "event" ? eventEstimatedHours : undefined,
      travel_agent: travelAgent,
      car_seats: carSeats,
      boosters,
      age_of_children: ageOfChildren,
      movie_choice: movieChoice,
      welcome_sign_description: welcomeSignDescription,
      add_on: addOn === "Other" ? addOnOther : addOn,
      stops_yes_no: stopsYesNo,
      stops_where: stopsWhere,
      travel_agency: travelAgency,
    };
    await supabase.from("quote_requests").insert(payload);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await validateAndSubmit())) return;

    setSending(true);
    try {
      const host = typeof window !== "undefined" ? window.location.hostname : "";
      const isLocalhost = host === "localhost" || host === "127.0.0.1";

      if (!isLocalhost) {
        const formData = new URLSearchParams();
        formData.append("form-name", "trip-request");
        formData.append("bot-field", botField);
        formData.append("quote-type", quoteType);
        formData.append("trip-type", tripType);
        formData.append("name", fullName);
        formData.append("first-name", firstName.trim());
        formData.append("last-name", lastName.trim());
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("timezone", timezone);
        formData.append("passengers", passengers);

        if (quoteType === "airport") {
          formData.append("pickup", airportPickup);
          formData.append("dropoff", airportDropoff);
          formData.append("arrival-date", formatDateMMDDYYYY(arrivalDate) || arrivalDate);
          formData.append("arrival-time", to12h(arrivalTime) || arrivalTime);
          formData.append("flight-number", flightNumber);
          formData.append("airport-return-pickup-address", airportReturnPickupAddress);
          formData.append("airport-return-dropoff-address", airportReturnDropoffAddress);
          formData.append("departing-date", formatDateMMDDYYYY(departingDate) || departingDate);
          formData.append("departing-time", to12h(departingTime) || departingTime);
        } else {
          formData.append("pickup-address", eventPickupAddress);
          formData.append("dropoff-address", eventDropoffAddress);
          formData.append("pickup-time", to12h(eventPickupTime) || eventPickupTime);
          formData.append("return-pickup-address", eventReturnPickupAddress);
          formData.append("return-dropoff-address", eventReturnDropoffAddress);
          formData.append("estimated-hours", eventEstimatedHours);
        }

        formData.append("travel-agent", travelAgent);
        formData.append("car-seats", carSeats);
        formData.append("boosters", boosters);
        formData.append("age-of-children", ageOfChildren);
        formData.append("movie-choice", movieChoice);
        formData.append("welcome-sign-description", welcomeSignDescription);
        formData.append("add-on", addOn === "Other" ? addOnOther : addOn);
        formData.append("stops-yes-no", stopsYesNo);
        formData.append("stops-where", stopsWhere);
        formData.append("travel-agency", travelAgency);

        const response = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        });
        if (response.status >= 400) throw new Error("Submission failed");
      } else {
        // On localhost: Netlify Forms won't work, but we can still save to Supabase for testing
        const { error } = await supabase.from("quote_requests").insert({
          quote_type: quoteType,
          trip_type: tripType,
          name: fullName,
          email: email.trim(),
          phone: phone.trim(),
          timezone,
          passengers,
          pickup: quoteType === "airport" ? airportPickup : undefined,
          dropoff: quoteType === "airport" ? airportDropoff : undefined,
          arrival_date: quoteType === "airport" ? formatDateMMDDYYYY(arrivalDate) || arrivalDate : undefined,
          arrival_time: quoteType === "airport" ? to12h(arrivalTime) || arrivalTime : undefined,
          flight_number: quoteType === "airport" ? flightNumber : undefined,
          airport_return_pickup_address: quoteType === "airport" ? airportReturnPickupAddress : undefined,
          airport_return_dropoff_address: quoteType === "airport" ? airportReturnDropoffAddress : undefined,
          departing_date: quoteType === "airport" ? formatDateMMDDYYYY(departingDate) || departingDate : undefined,
          departing_time: quoteType === "airport" ? to12h(departingTime) || departingTime : undefined,
          pickup_address: quoteType === "event" ? eventPickupAddress : undefined,
          dropoff_address: quoteType === "event" ? eventDropoffAddress : undefined,
          pickup_time: quoteType === "event" ? to12h(eventPickupTime) || eventPickupTime : undefined,
          return_pickup_address: quoteType === "event" ? eventReturnPickupAddress : undefined,
          return_dropoff_address: quoteType === "event" ? eventReturnDropoffAddress : undefined,
          estimated_hours: quoteType === "event" ? eventEstimatedHours : undefined,
          travel_agent: travelAgent,
          car_seats: carSeats,
          boosters,
          age_of_children: ageOfChildren,
          movie_choice: movieChoice,
          welcome_sign_description: welcomeSignDescription,
          add_on: addOn === "Other" ? addOnOther : addOn,
          stops_yes_no: stopsYesNo,
          stops_where: stopsWhere,
          travel_agency: travelAgency,
        });
        if (error) {
          setError("Supabase not configured. Form works on the live site. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local to test locally.");
          setSending(false);
          return;
        }
      }

      // On production: backup to Supabase (fire-and-forget)
      if (!isLocalhost) saveToSupabase().catch(() => {});

      // Send to n8n AI Agent quote automation (fire-and-forget)
      sendToN8n().catch(() => {});

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email info@theluxe-bus.com.");
    } finally {
      setSending(false);
    }
  };

  const handleAirportSwap = () => {
    const temp = airportPickup;
    setAirportPickup(airportDropoff);
    setAirportDropoff(temp);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setTimezone("");
    setPassengers("1");
    setQuoteType("airport");
    setTripType("one-way");
    setAirportPickup("");
    setAirportDropoff("");
    setArrivalDate("");
    setArrivalTime("");
    setFlightNumber("");
    setDepartingDate("");
    setDepartingTime("");
    setAirportReturnPickupAddress("");
    setAirportReturnDropoffAddress("");
    setEventPickupAddress("");
    setEventDropoffAddress("");
    setEventPickupTime("");
    setEventReturnPickupAddress("");
    setEventReturnDropoffAddress("");
    setEventEstimatedHours("");
    setTravelAgent("None");
    setCarSeats("");
    setBoosters("");
    setAgeOfChildren("");
    setMovieChoice("");
    setWelcomeSignDescription("");
    setAddOn("None");
    setAddOnOther("");
    setStopsYesNo("");
    setStopsWhere("");
    setTravelAgency("None");
  };

  if (submitted) {
    return (
      <section id="trip" className="py-24 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="bg-white/5 border border-[#c9a84c]/30 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-3">Quote Request Received!</h3>
            <div className="bg-white/5 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/50">Quote Type</span>
                  <span className="text-white font-medium capitalize">{quoteType === "airport" ? "Airport Pickup" : "Event Pickup"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Name</span>
                  <span className="text-white font-medium">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Email</span>
                  <span className="text-white font-medium">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Phone</span>
                  <span className="text-white font-medium">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Timezone</span>
                  <span className="text-white font-medium">{timezone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Passengers</span>
                  <span className="text-white font-medium">{passengers}</span>
                </div>
                {quoteType === "airport" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-white/50">Pick-up</span>
                      <span className="text-white font-medium">{airportPickup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Drop-off</span>
                      <span className="text-white font-medium">{airportDropoff}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Arrival</span>
                      <span className="text-white font-medium">{formatDate(arrivalDate)} at {to12h(arrivalTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Flight #</span>
                      <span className="text-white font-medium">{flightNumber}</span>
                    </div>
                    {tripType === "round-trip" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/50">Return Pick-up Address</span>
                          <span className="text-white font-medium">{airportReturnPickupAddress}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Return Drop-off Address</span>
                          <span className="text-white font-medium">{airportReturnDropoffAddress}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Departing</span>
                          <span className="text-white font-medium">{formatDate(departingDate)} at {to12h(departingTime)}</span>
                        </div>
                      </>
                    )}
                  </>
                )}
                {quoteType === "event" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-white/50">Pick-up Address</span>
                      <span className="text-white font-medium">{eventPickupAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Drop-off Address</span>
                      <span className="text-white font-medium">{eventDropoffAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Pick-up Time</span>
                      <span className="text-white font-medium">{to12h(eventPickupTime)}</span>
                    </div>
                    {tripType === "round-trip" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/50">Return Pick-up Address</span>
                          <span className="text-white font-medium">{eventReturnPickupAddress}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Return Drop-off Address</span>
                          <span className="text-white font-medium">{eventReturnDropoffAddress}</span>
                        </div>
                        {eventEstimatedHours && (
                          <div className="flex justify-between">
                            <span className="text-white/50">Estimated Hours</span>
                            <span className="text-white font-medium">{eventEstimatedHours} hrs</span>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
                {stopsYesNo && (
                  <div className="flex justify-between">
                    <span className="text-white/50">Any Stops</span>
                    <span className="text-white font-medium">{stopsYesNo === "yes" ? stopsWhere || "Yes" : "No"}</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-white/50 mb-6">We&apos;ll get back to you with a quote within a few hours.</p>
            <button onClick={resetForm} className="btn-outline">
              Get Another Quote
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="trip" className="py-24 bg-[#0a0a0a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-sm font-medium mb-3">Get a Quote</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Where Are You Headed?</h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">
            Fill out your trip details and we&apos;ll send you a quote within a few hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Don&apos;t fill this:{" "}
              <input type="text" name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {/* Quote type tabs: Airport Pickup | Event Pickup */}
          <div className={formCard}>
            <div className="flex justify-center mb-6">
              <div className="bg-white/5 border border-white/10 rounded-full p-1 flex">
                <button
                  type="button"
                  onClick={() => setQuoteType("airport")}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${quoteType === "airport" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-white/50 hover:text-white"}`}
                >
                  ✈️ Airport Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setQuoteType("event")}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${quoteType === "event" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-white/50 hover:text-white"}`}
                >
                  🎉 Event Pickup
                </button>
              </div>
            </div>

            {/* Contact info + timezone (shared) */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className={labelClass}>First Name *</label>
                <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input type="text" placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Your Timezone *</label>
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="">Select your timezone</option>
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz} className="bg-[#1a1a1a]">{tz}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Passengers *</label>
                <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-[#1a1a1a]">{n} {n === 1 ? "Passenger" : "Passengers"}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Airport Pickup section */}
            {quoteType === "airport" && (
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-center">
                  <div className="bg-white/5 border border-white/10 rounded-full p-1 flex">
                    <button type="button" onClick={() => setTripType("one-way")} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${tripType === "one-way" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-white/50 hover:text-white"}`}>
                      One Way
                    </button>
                    <button type="button" onClick={() => setTripType("round-trip")} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${tripType === "round-trip" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-white/50 hover:text-white"}`}>
                      Round Trip
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                  <div>
                    <label className={labelClass}>Pick-up Location (Airport) *</label>
                    <input type="text" placeholder="e.g. LAX Airport" value={airportPickup} onChange={(e) => setAirportPickup(e.target.value)} list="airports-list" className={inputClass} />
                  </div>
                  <button type="button" onClick={handleAirportSwap} className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border border-white/10 hover:border-[#c9a84c]/50 text-white/50 hover:text-[#c9a84c] transition-colors mb-0.5" title="Swap">⇄</button>
                  <div>
                    <label className={labelClass}>Drop-off Location or Address *</label>
                    <input type="text" placeholder="e.g. Disneyland Resort or 123 Main St, Anaheim" value={airportDropoff} onChange={(e) => setAirportDropoff(e.target.value)} list="airport-dropoff-list" className={inputClass} />
                  </div>
                </div>
                <datalist id="airports-list">
                  {AIRPORTS.map((a) => (
                    <option key={a} value={a} />
                  ))}
                </datalist>
                <datalist id="airport-dropoff-list">
                  {EVENT_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} />
                  ))}
                </datalist>
                <datalist id="event-locations-list">
                  {EVENT_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} />
                  ))}
                </datalist>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Arrival Date *</label>
                    <input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Arrival Time *</label>
                    <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Passenger Flight Number *</label>
                  <input type="text" placeholder="e.g. AA 123" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} className={inputClass} />
                </div>
                {tripType === "round-trip" && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div>
                      <label className={labelClass}>Return Pick-up Address *</label>
                      <input type="text" placeholder="Street address" value={airportReturnPickupAddress} onChange={(e) => setAirportReturnPickupAddress(e.target.value)} list="event-locations-list" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Return Drop-off Address *</label>
                      <input type="text" placeholder="Street address" value={airportReturnDropoffAddress} onChange={(e) => setAirportReturnDropoffAddress(e.target.value)} list="airports-list" className={inputClass} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Departing Date *</label>
                        <input type="date" value={departingDate} onChange={(e) => setDepartingDate(e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Departing Time *</label>
                        <input type="time" value={departingTime} onChange={(e) => setDepartingTime(e.target.value)} className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Event Pickup section */}
            {quoteType === "event" && (
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-center">
                  <div className="bg-white/5 border border-white/10 rounded-full p-1 flex">
                    <button type="button" onClick={() => setTripType("one-way")} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${tripType === "one-way" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-white/50 hover:text-white"}`}>
                      One Way
                    </button>
                    <button type="button" onClick={() => setTripType("round-trip")} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${tripType === "round-trip" ? "bg-[#c9a84c] text-[#0a0a0a]" : "text-white/50 hover:text-white"}`}>
                      Round Trip
                    </button>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Pick-up Address *</label>
                  <input type="text" placeholder="Street address" value={eventPickupAddress} onChange={(e) => setEventPickupAddress(e.target.value)} list="event-locations-list" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Drop-off Address *</label>
                  <input type="text" placeholder="Street address" value={eventDropoffAddress} onChange={(e) => setEventDropoffAddress(e.target.value)} list="event-locations-list" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Pick-up Time *</label>
                  <input type="time" value={eventPickupTime} onChange={(e) => setEventPickupTime(e.target.value)} className={inputClass} />
                </div>
                {tripType === "round-trip" && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <p className="text-white/60 text-sm">Return trip — pick-up and drop-off locations</p>
                    <div>
                      <label className={labelClass}>Return Pick-up Address *</label>
                      <input type="text" placeholder="Street address" value={eventReturnPickupAddress} onChange={(e) => setEventReturnPickupAddress(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Return Drop-off Address *</label>
                      <input type="text" placeholder="Street address" value={eventReturnDropoffAddress} onChange={(e) => setEventReturnDropoffAddress(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Estimated Hours *</label>
                      <select value={eventEstimatedHours} onChange={(e) => setEventEstimatedHours(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                        <option value="">Select hours (3 hr minimum)</option>
                        {Array.from({ length: 18 }, (_, i) => i + 3).map((n) => (
                          <option key={n} value={n} className="bg-[#1a1a1a]">{n} hours</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add ons & Travel agency (shared) */}
          <div className={formCard}>
            <h3 className="text-lg font-semibold text-white mb-4">Add ons & Travel agency</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Any stops?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                    <input type="radio" name="stops" value="yes" checked={stopsYesNo === "yes"} onChange={() => setStopsYesNo("yes")} className="accent-[#c9a84c]" />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                    <input type="radio" name="stops" value="no" checked={stopsYesNo === "no"} onChange={() => setStopsYesNo("no")} className="accent-[#c9a84c]" />
                    No
                  </label>
                </div>
                {stopsYesNo === "yes" && (
                  <input type="text" placeholder="Where? (addresses or locations)" value={stopsWhere} onChange={(e) => setStopsWhere(e.target.value)} className={inputClass + " mt-2"} />
                )}
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Car seats</label>
                  <select value={carSeats} onChange={(e) => setCarSeats(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                    <option value="" className="bg-[#1a1a1a]">None</option>
                    {Array.from({ length: 6 }, (_, i) => i).map((n) => (
                      <option key={n} value={n} className="bg-[#1a1a1a]">{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Boosters</label>
                  <select value={boosters} onChange={(e) => setBoosters(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                    <option value="" className="bg-[#1a1a1a]">None</option>
                    {Array.from({ length: 6 }, (_, i) => i).map((n) => (
                      <option key={n} value={n} className="bg-[#1a1a1a]">{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Add on</label>
                  <select value={addOn} onChange={(e) => setAddOn(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                    <option value="None" className="bg-[#1a1a1a]">None</option>
                    {ADD_ONS.filter((a) => a !== "None").map((opt) => (
                      <option key={opt} value={opt} className="bg-[#1a1a1a]">{opt}</option>
                    ))}
                    <option value="Other" className="bg-[#1a1a1a]">Other</option>
                  </select>
                  {addOn === "Other" && (
                    <input type="text" placeholder="Specify" value={addOnOther} onChange={(e) => setAddOnOther(e.target.value)} className={inputClass + " mt-2"} />
                  )}
                </div>
              </div>
              <div>
                <label className={labelClass}>Age of children</label>
                <input type="text" placeholder="Your answer" value={ageOfChildren} onChange={(e) => setAgeOfChildren(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Movie Choice</label>
                <input type="text" placeholder="Your answer" value={movieChoice} onChange={(e) => setMovieChoice(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Personalized Welcome/Birthday sign description</label>
                <input type="text" placeholder="Your answer" value={welcomeSignDescription} onChange={(e) => setWelcomeSignDescription(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Travel Agent</label>
                <select value={travelAgent} onChange={(e) => setTravelAgent(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="None" className="bg-[#1a1a1a]">None</option>
                  {TRAVEL_AGENTS.filter((a) => a !== "None").map((agent) => (
                    <option key={agent} value={agent} className="bg-[#1a1a1a]">{agent}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Travel Agency</label>
                <select value={travelAgency} onChange={(e) => setTravelAgency(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                  <option value="None" className="bg-[#1a1a1a]">None</option>
                  {TRAVEL_AGENCIES.filter((a) => a !== "None").map((agency) => (
                    <option key={agency} value={agency} className="bg-[#1a1a1a]">{agency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={sending} className="btn-gold w-full text-center text-lg disabled:opacity-60 disabled:cursor-not-allowed">
            {sending ? "Sending..." : "Get a Quote"}
          </button>
          <p className="text-white/30 text-xs text-center mt-4">We&apos;ll get back to you with a quote within a few hours.</p>
        </form>
      </div>
    </section>
  );
}

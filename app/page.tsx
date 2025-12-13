"use client";

import { useEffect, useState } from "react";

export default function SevenOhOneTires() {
  const [spinDeg, setSpinDeg] = useState(0);
  const [phone, setPhone] = useState("");

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.length > 10) digits = digits.slice(0, 10);
    const formatted =
      digits.length <= 3
        ? digits
        : digits.length <= 6
        ? `(${digits.slice(0, 3)}) ${digits.slice(3)}`
        : `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    setPhone(formatted);
  }

  useEffect(() => {
    const onScroll = () => setSpinDeg((window.scrollY / 6) % 360);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 sticky top-0 backdrop-blur bg-neutral-950/70 z-50">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SpinningTire deg={spinDeg} />
            <h1 className="text-xl font-semibold tracking-tight">701Tires</h1>
          </div>
          <a
            href="#quote"
            className="rounded-2xl px-4 py-2 bg-white text-black font-medium hover:bg-white/90 transition"
          >
            Get Instant Quote
          </a>
        </div>
      </header>

      {/* HERO + LOCATION */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid lg:grid-cols-2 gap-10 items-start">
        {/* Left side */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Tire Repair and Installation,{" "}
            <span className="text-white/70">on your time.</span>
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Fill out your vehicle and tire details. After you submit, you’ll be directed to call us for a live quote.
          </p>
          <ul className="mt-6 space-y-2 text-white/70">
            <li>Flexible scheduling available</li>
            <li>Free taxi service within 15 minutes of Watford</li>
          </ul>
          <div className="mt-8 flex gap-3">
            <a
              href="#quote"
              className="rounded-2xl px-5 py-3 bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              Get my quote
            </a>
          </div>
        </div>

        {/* Right side (Map + Location) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
          <h3 className="text-xl font-semibold">Located in Watford City, ND</h3>
          <div className="relative mt-4 rounded-xl overflow-hidden border border-white/10">
            <img
              src="/watford-map.jpg"
              alt="Map showing Watford City, ND"
              className="w-full h-auto grayscale"
              onError={(e) => {
                e.currentTarget.src =
                  "https://staticmap.openstreetmap.de/staticmap.php?center=47.8020,-103.2838&zoom=12&size=800x500";
              }}
            />
          </div>
          <div className="mt-3 text-sm text-white/70">
            Shop area: Watford City, ND • Call or text{" "}
            <a href="tel:+17015805567" className="underline">
              (701) 580-5567
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="bg-neutral-900 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h3 className="text-3xl font-bold">Our Services</h3>
          <p className="text-white/60 mt-2">
            Professional tire services when and where you need them.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-2">Tire Installation</h4>
              <p className="text-sm text-white/70">
                New tire mounting and balancing for all vehicle types.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-2">Tire Repair</h4>
              <p className="text-sm text-white/70">
                Quick, professional flat repair and patching.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-2">Tire Rotations</h4>
              <p className="text-sm text-white/70">
                Keep your tires lasting longer with proper rotation.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-2">Emergency Calls</h4>
              <p className="text-sm text-white/70">
                After-hours tire service for roadside or urgent needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" className="bg-white text-black mt-10">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h3 className="text-3xl font-bold">Instant tire quote</h3>
          <p className="text-black/60 mt-2">
            Enter your details below to start your quote. You’ll be redirected to call us for live pricing.
          </p>

          <form
            action="/api/quote"
            method="POST"
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <input type="text" name="name" placeholder="Full Name" required className="w-full rounded-xl border border-black/10 px-4 py-3" />
            <input type="tel" name="phone" value={phone} onChange={handlePhoneChange} placeholder="Phone Number (required)" required className="w-full rounded-xl border border-black/10 px-4 py-3" />
            <input type="email" name="email" placeholder="Email (optional)" className="md:col-span-2 w-full rounded-xl border border-black/10 px-4 py-3" />
            <input type="text" name="vehicle_year" placeholder="Vehicle Year" required className="w-full rounded-xl border border-black/10 px-4 py-3" />
            <input type="text" name="vehicle_make" placeholder="Vehicle Make" required className="w-full rounded-xl border border-black/10 px-4 py-3" />
            <input type="text" name="vehicle_model" placeholder="Vehicle Model" required className="w-full rounded-xl border border-black/10 px-4 py-3" />
            <input type="text" name="vehicle_trim" placeholder="Vehicle Trim (optional)" className="w-full rounded-xl border border-black/10 px-4 py-3" />
            <input type="text" name="tire_size" placeholder="Tire Size (example: 275/65R20)" required className="md:col-span-2 w-full rounded-xl border border-black/10 px-4 py-3" />
            <select name="tread_type" className="md:col-span-2 w-full rounded-xl border border-black/10 px-4 py-3">
              <option>All-Season</option>
              <option>All-Terrain</option>
              <option>Highway / Touring</option>
              <option>Mud-Terrain</option>
              <option>Winter / Snow</option>
              <option>Performance</option>
            </select>
            <textarea name="notes" placeholder="Custom notes or preferred tire brands" rows={3} className="md:col-span-2 w-full rounded-xl border border-black/10 px-4 py-3"></textarea>
            <button type="submit" className="md:col-span-2 mt-4 w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-neutral-800">
              Submit Quote Request
            </button>
          </form>

          {/* Tire Size Help */}
          <div className="mt-10 text-center">
            <h4 className="text-xl font-semibold mb-3">How to find your tire size</h4>
            <img src="/tire-size-guide.png" alt="Tire showing where to find size marking" className="mx-auto rounded-xl border border-black/10 w-full max-w-lg sm:max-w-xl md:max-w-2xl shadow-md" />
            <p className="text-sm text-black/60 mt-3">
              The tire size is printed on your sidewall (for example, 275/65R20).
              <br />
              If you’re still having trouble finding it, just give us a call and we’ll assist you.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-semibold flex items-center gap-2">
              <SpinningTire deg={spinDeg} small />
              701Tires
            </div>
            <div className="text-white/60 text-sm mt-2">
              Local tire concierge. Fair prices. Fast installs.
            </div>
          </div>
          <div>
            <div className="text-white/60 text-sm">Hours</div>
            <div className="mt-2 text-sm">
              Open 7 days a week, 9am–5pm (available for emergency calls)
            </div>
          </div>
          <div>
            <div className="text-white/60 text-sm">Contact</div>
            <div className="mt-2 text-sm">
              Call or text:{" "}
              <a href="tel:+17015805567" className="underline">
                (701) 580-5567
              </a>
              <br />
              Email:{" "}
              <a href="mailto:hunter701tires@yahoo.com" className="underline">
                hunter701tires@yahoo.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Spinning tire icon
function SpinningTire({ deg, small }: { deg: number; small?: boolean }) {
  const size = small ? "w-6 h-6" : "w-8 h-8";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={`${size} text-white fill-current`} style={{ transform: `rotate(${deg}deg)`, transition: "transform 0.2s linear" }}>
      <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="4" fill="none" />
      <circle cx="32" cy="32" r="10" fill="white" />
      <path d="M32 4 L32 12 M32 52 L32 60 M4 32 L12 32 M52 32 L60 32 M14 14 L20 20 M44 44 L50 50 M14 50 L20 44 M44 20 L50 14" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

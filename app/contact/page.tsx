export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Call now for a live price</h1>
        <p className="mt-4 text-white/70 text-lg">
          We’ve received your request. Call or text now and we’ll get you a total out-the-door price in minutes.
        </p>
        <a
          href="tel:+17015805567"
          className="inline-block mt-8 rounded-2xl bg-white text-black px-8 py-4 text-xl font-semibold hover:bg-white/90 transition"
        >
          Call (701) 580-5567
        </a>
        <div className="mt-6 text-white/70">
          Prefer text? <a className="underline" href="sms:+17015805567">(701) 580-5567</a>
        </div>
      </div>
    </div>
  );
}

import MembershipPlans from "../components/MembershipPlans.jsx";
import TrialBooking from "../components/TrialBooking.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-900 bg-black/80 px-4 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-2xl font-black">
            IRONPULSE
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-2xl border border-zinc-800 px-4 py-2 text-sm font-bold text-white hover:bg-zinc-900"
            >
              Login
            </a>

            <a
              href="/register"
              className="rounded-2xl bg-lime-400 px-4 py-2 text-sm font-bold text-black hover:bg-lime-300"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      <section className="flex min-h-screen items-center justify-center px-6 pt-20 text-center">
        <div>
          <p className="mb-4 inline-block rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm font-bold text-lime-300">
            Fully Automated Gym Website
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Build Strength. Automate Your Gym.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            A complete gym platform with online joining, class booking,
            membership plans, attendance, payments, and admin automation.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#plans"
              className="rounded-2xl bg-lime-400 px-6 py-3 font-bold text-black hover:bg-lime-300"
            >
              View Plans
            </a>

            <a
              href="#free-trial"
              className="rounded-2xl border border-zinc-800 px-6 py-3 font-bold text-white hover:bg-zinc-900"
            >
              Book Free Trial
            </a>
          </div>
        </div>
      </section>

      <MembershipPlans />
      <TrialBooking />
    </div>
  );
}
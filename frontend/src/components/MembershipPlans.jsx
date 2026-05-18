import { useEffect, useState } from "react";
import { Check, Loader2, Star } from "lucide-react";
import API from "../api/axios.js";
import Button from "./ui/Button.jsx";
import Card from "./ui/Card.jsx";

const fallbackPlans = [
  {
    _id: "fallback-1",
    name: "Monthly Basic",
    description: "Best for beginners who want normal gym access.",
    price: 1499,
    durationInDays: 30,
    features: [
      "Gym access",
      "QR attendance",
      "Basic workout plan",
      "Monthly progress report",
    ],
    isPopular: false,
  },
  {
    _id: "fallback-2",
    name: "Transformation Plan",
    description: "Best for weight loss and body transformation.",
    price: 4999,
    durationInDays: 90,
    features: [
      "Gym access",
      "Diet guidance",
      "Class booking",
      "Trainer review",
      "WhatsApp reminders",
    ],
    isPopular: true,
  },
  {
    _id: "fallback-3",
    name: "Personal Training",
    description: "Dedicated trainer with customized workout and diet.",
    price: 8999,
    durationInDays: 30,
    features: [
      "Dedicated trainer",
      "Custom workout plan",
      "Custom diet plan",
      "PT session booking",
      "Weekly measurement tracking",
    ],
    isPopular: false,
  },
];

export default function MembershipPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await API.get("/plans");

        if (response.data.plans.length > 0) {
          setPlans(response.data.plans);
        } else {
          setPlans(fallbackPlans);
          setUsingFallback(true);
        }
      } catch (error) {
        console.log(error);
        setPlans(fallbackPlans);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getDurationText = (days) => {
    if (days === 30) return "month";
    if (days === 90) return "quarter";
    if (days === 180) return "6 months";
    if (days === 365) return "year";
    return `${days} days`;
  };

  return (
    <section id="plans" className="bg-black px-4 py-20 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 inline-block rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm font-bold text-lime-300">
            Membership Plans
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Choose your fitness plan
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            Members can select a plan, pay online, receive invoice, and get
            membership activated automatically.
          </p>

          {usingFallback && (
            <p className="mt-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
              Showing demo plans. Add plans in backend to show live database
              data.
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-lime-300" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan._id}
                className={
                  plan.isPopular
                    ? "relative border-lime-400 bg-lime-400 p-7 text-black"
                    : "border-zinc-800 bg-zinc-950 p-7 text-white"
                }
              >
                {plan.isPopular && (
                  <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-black px-3 py-1 text-xs font-bold text-lime-300">
                    <Star className="h-4 w-4 fill-lime-300" />
                    Popular
                  </div>
                )}

                <h3 className="text-2xl font-black">{plan.name}</h3>

                <p
                  className={`mt-3 text-sm ${
                    plan.isPopular ? "text-black/70" : "text-zinc-400"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-black">
                    ₹{Number(plan.price).toLocaleString("en-IN")}
                  </span>
                  <span
                    className={
                      plan.isPopular ? "text-black/70" : "text-zinc-500"
                    }
                  >
                    /{getDurationText(plan.durationInDays)}
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check
                        className={
                          plan.isPopular
                            ? "h-5 w-5 text-black"
                            : "h-5 w-5 text-lime-300"
                        }
                      />
                      <span
                        className={
                          plan.isPopular ? "text-black/80" : "text-zinc-300"
                        }
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={
                    plan.isPopular
                      ? "mt-8 w-full bg-black text-white hover:bg-zinc-900"
                      : "mt-8 w-full bg-lime-400 text-black hover:bg-lime-300"
                  }
                >
                  Select Plan
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
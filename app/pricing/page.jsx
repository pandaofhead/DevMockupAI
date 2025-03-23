"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Github, Server } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started with AI-powered resume building",
    features: ["3 credits", "1 custom resume", "Basic analytics"],
    cta: "Get Started",
    href: "/signup",
  },
  {
    name: "Professional",
    price: "12.99",
    description: "Ideal for active job seekers",
    features: [
      "100 credits / month",
      "Advanced analytics",
      "Priority support",
      "PDF exports",
    ],
    cta: "Start Pro Plan",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Career Pro",
    price: "29.99",
    description: "For professionals seeking the ultimate career advantage",
    features: [
      "500 credits / month",
      "Custom interview scenarios",
      "Advanced performance analytics",
      "Resume performance tracking",
      "Priority support",
    ],
    cta: "Start Career Pro",
    href: "/signup?plan=career",
  },
];

export default function PricingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Choose the plan that best fits your needs
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {tiers.map((tier) => (
          <motion.div key={tier.name} variants={item}>
            <Card
              className={`relative flex flex-col p-8 h-full hover:scale-105 duration-300 ${
                tier.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-2xl font-bold">{tier.name}</h2>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  {tier.price !== "0" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="mt-4 text-muted-foreground">{tier.description}</p>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                variant={tier.popular ? "default" : "outline"}
                asChild
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-4 text-muted-foreground">
          - Or you can choose -
        </h2>
      </div>

      {/* Self-hosting Option */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 max-w-3xl mx-auto text-center"
      >
        <Card className="p-8 bg-white dark:bg-slate-800 border-none shadow-none">
          <div className="flex items-center justify-center mb-4">
            <Server className="h-8 w-8 text-primary mr-2" />
            <Github className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Self-Host DevMockupAI</h2>
          <p className="text-muted-foreground mb-6">
            Want to use your own API keys? Deploy DevMockupAI on your
            infrastructure and maintain full control over your data and costs.
          </p>
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-center">
              <Check className="h-4 w-4 text-primary mr-3" />
              <span className="text-sm">Use your own OpenAI API keys</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="h-4 w-4 text-primary mr-3" />
              <span className="text-sm">Full source code access</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="h-4 w-4 text-primary mr-3" />
              <span className="text-sm">
                Customize and extend functionality
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="https://github.com/pandaofhead/DevMockupAI">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

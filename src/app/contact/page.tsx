import React from "react";
import { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, MessageSquare, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Collaboration",
  description: "Connect with Thrilok M to discuss Data Science research, machine learning projects, or quantum club activities.",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email Address",
      value: "thrilokmanjunath@gmail.com", 
      sub: "Best for research & internship queries",
    },
    {
      icon: MessageSquare,
      label: "Social Networks",
      value: "thrilokmanjunath",
      sub: "LinkedIn & GitHub channels",
    },
    {
      icon: MapPin,
      label: "Location Base",
      value: "Bangalore, India",
      sub: "Christ University Yeshwanthpur",
    },
    {
      icon: Clock,
      label: "Response Timing",
      value: "Under 24 Hours",
      sub: "Active weekdays & weekends",
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="mb-16">
        <span className="text-xs font-semibold text-brand-purple uppercase tracking-widest">Get In Touch</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground mt-2">
          Connect with Thrilok M
        </h1>
        <p className="text-muted-foreground text-sm mt-3 max-w-2xl leading-relaxed">
          Have an interesting project opportunity, a research concept, or want to collaborate on quantum algorithms? Send a message directly or connect via social networks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Info Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <div key={info.label} className="glass p-5 rounded-2xl flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-secondary/80 text-brand-purple">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground block">
                    {info.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground block mt-1">
                    {info.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground/80 block mt-0.5">
                    {info.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

      </div>

    </div>
  );
}

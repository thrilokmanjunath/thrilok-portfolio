"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message content is required.";
    } else if (formData.message.length < 15) {
      newErrors.message = "Please write at least 15 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API network latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Setup successful response
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="glass p-8 sm:p-12 rounded-3xl text-center border-brand-cyan/20 animate-fade-in">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan mb-6 animate-scale-up">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">Message Dispatched!</h3>
        <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, Thrilok. Your message has been sent successfully. I will get back to you within 24 hours.
        </p>
        <Button
          onClick={() => setSubmitStatus("idle")}
          className="mt-8 rounded-full bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer font-medium px-6"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass p-6 sm:p-8 rounded-3xl border-border/40">
      {/* Alert on errors */}
      {submitStatus === "error" && (
        <div className="flex items-center space-x-2 text-destructive bg-destructive/10 border border-destructive/20 p-4 rounded-xl text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Something went wrong. Please check your inputs and try again.</span>
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name input */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Name <span className="text-brand-pink">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full bg-secondary/20 border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all ${
              errors.name ? "border-destructive/60" : "border-border/60"
            }`}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" /> {errors.name}
            </p>
          )}
        </div>

        {/* Email input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Email Address <span className="text-brand-pink">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full bg-secondary/20 border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all ${
              errors.email ? "border-destructive/60" : "border-border/60"
            }`}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject Input */}
      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Subject <span className="text-brand-pink">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={`w-full bg-secondary/20 border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all ${
            errors.subject ? "border-destructive/60" : "border-border/60"
          }`}
        />
        {errors.subject && (
          <p id="subject-error" className="text-xs text-destructive flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.subject}
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Message <span className="text-brand-pink">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full bg-secondary/20 border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all resize-y ${
            errors.message ? "border-destructive/60" : "border-border/60"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-destructive flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" /> {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground hover:bg-primary/95 px-8 py-5 cursor-pointer font-medium shadow-md flex items-center justify-center min-w-[160px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4.5 w-4.5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4.5 w-4.5 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

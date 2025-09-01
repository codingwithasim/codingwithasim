"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

// shadcn/ui components (assumes these are available in your project)
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactDialog({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", message: "" },
  });

  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function onSubmit(data: FormData) {
    setStatus(null);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to send message");
      }

      setStatus("success");
      setStatusMessage("Message sent — I will get back to you soon.");
      reset();

      // keep dialog open for a short moment so user sees confirmation, then close
      setTimeout(() => setOpen(false), 1000);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setStatus("error");
        setStatusMessage(err.message);
      } else {
        console.error("Unknown error", err);
        setStatus("error");
        setStatusMessage("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Contact me</Button>
      </DialogTrigger>
      <DialogContent className="dark sm:max-w-lg bg-black border-[#444444]">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl">Send me a message</span>
          </DialogTitle>
          <DialogDescription>
            Quick messages, project inquiries, or freelance requests — I usually reply within 48
            hours.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
          aria-live="polite"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              type="text"
              className=" border-gray-700"
              {...register("name", { required: "Please enter your name" })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className=" border-gray-700"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              className=" border-gray-700"
              placeholder="Tell me about your project or question"
              rows={6}
              {...register("message", {
                required: "Message can’t be empty",
                minLength: { value: 10, message: "Message is too short" },
              })}
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message && (
              <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
            )}
          </div>

          {statusMessage && (
            <div
              className={`rounded-md p-3 text-sm ${
                status === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`} 
            >
              {statusMessage}
            </div>
          )}

          <DialogFooter className="pt-2">
            <div className="flex w-full justify-between items-center gap-2">
              <div className="flex-1 text-sm text-muted-foreground">
                {isSubmitting ? "Sending…" : "All messages are private and sent to my inbox."}
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setOpen(false)} type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useEffect, useState } from "react";

const FALLBACK = "Avirat Seva Mahe — Devoted to the Seva of Humanity.";

export default function DailyMessage() {
  const [message, setMessage] = useState("Loading today's message…");

  useEffect(() => {
    let cancelled = false;

    fetch("/assets/data/daily-messages.json")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((messages: string[]) => {
        if (!messages || !messages.length) return Promise.reject();
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor(
          (now.getTime() - startOfYear.getTime()) / 86400000
        );
        if (!cancelled) setMessage(messages[dayOfYear % messages.length]);
      })
      .catch(() => {
        if (!cancelled) setMessage(FALLBACK);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <p id="daily-message-text">{message}</p>;
}

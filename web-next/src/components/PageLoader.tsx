"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "mabap-loader-shown";
const MIN_DISPLAY_MS = 3000;

/**
 * Shows the full animated loader once per browser session (first load only —
 * client-side navigation between pages never remounts this component since
 * it lives in the root layout, so it naturally won't replay on internal
 * links). The inline script rendered alongside this in layout.tsx hides the
 * loader synchronously on a hard refresh within the same session, before
 * React hydrates, to avoid a flash — same trick as the static site used.
 */
export default function PageLoader() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setIsHidden(true);
      return;
    }

    document.body.classList.add("is-loading");

    let done = false;
    function hideLoader() {
      if (done) return;
      done = true;
      setIsHidden(true);
      document.body.classList.remove("is-loading");
      sessionStorage.setItem(SESSION_KEY, "1");
    }

    let minTimer: ReturnType<typeof setTimeout>;
    if (document.readyState === "complete") {
      minTimer = setTimeout(hideLoader, MIN_DISPLAY_MS);
    } else {
      window.addEventListener(
        "load",
        () => {
          minTimer = setTimeout(hideLoader, MIN_DISPLAY_MS);
        },
        { once: true }
      );
    }

    const fallbackTimer = setTimeout(hideLoader, MIN_DISPLAY_MS + 3000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      className={`page-loader${isHidden ? " is-hidden" : ""}`}
      id="page-loader"
      role="status"
      aria-label="Loading MaBap Foundation"
    >
      <div className="page-loader-stage">
        <svg
          className="loader-mandala"
          viewBox="0 0 400 400"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="105" />
          <g>
            {Array.from({ length: 16 }, (_, i) => (
              <line
                key={i}
                x1="200"
                y1="30"
                x2="200"
                y2="95"
                transform={i === 0 ? undefined : `rotate(${i * 22.5} 200 200)`}
              />
            ))}
          </g>
        </svg>
        <div className="loader-embers" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/logo-mark.png"
          alt=""
          className="page-loader-logo"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

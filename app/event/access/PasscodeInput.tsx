"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasscodeInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name="passcode"
        required
        autoFocus
        placeholder="Masukin passcode"
        className="focus-ring w-full rounded-lg border border-black/10 px-4 py-3 pr-11 text-center text-sm"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-ink-soft transition-colors hover:bg-black/5"
        aria-label={show ? "Sembunyikan passcode" : "Tampilkan passcode"}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

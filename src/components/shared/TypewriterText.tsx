"use client";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // Optional typing speed
}

const TypewriterText = ({ text, speed = 100 }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let isCancelled = false;
    setDisplayedText("");

    let i = 0;
    function typeNextChar() {
      if (isCancelled) return;
      setDisplayedText(text.slice(0, i + 1));
      if (i < text.length - 1) {
        i++;
        setTimeout(typeNextChar, speed);
      }
    }

    if (text.length > 0) {
      typeNextChar();
    }

    return () => {
      isCancelled = true;
    };
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default TypewriterText;

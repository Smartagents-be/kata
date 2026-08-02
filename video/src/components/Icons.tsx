import React from "react";

/**
 * The three markers the kata drops into its prose, with the path data taken verbatim from
 * `front/src/shared/lib/icons.ts` and lucide's `Gem` / `Coins` / `Puzzle`. They are the video's
 * one piece of borrowed geometry, so a viewer who has read a unit recognises them on sight.
 */

const Svg: React.FC<{
  size: number;
  color: string;
  children: React.ReactNode;
  strokeWidth?: number;
  style?: React.CSSProperties;
}> = ({ size, color, children, strokeWidth = 2, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {children}
  </svg>
);

/** A hidden gem: something useful in day-to-day work that is easy to miss. */
export const GemIcon: React.FC<{
  size: number;
  color: string;
  style?: React.CSSProperties;
}> = ({ size, color, style }) => (
  <Svg size={size} color={color} style={style}>
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M11 3 8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </Svg>
);

/** A cost saver: the same result for fewer tokens. */
export const CoinIcon: React.FC<{
  size: number;
  color: string;
  style?: React.CSSProperties;
}> = ({ size, color, style }) => (
  <Svg size={size} color={color} style={style}>
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="m16.71 13.88.7.71-2.82 2.82" />
  </Svg>
);

/** An AI design pattern: a deliberate, repeatable way of working with an agent. */
export const PatternIcon: React.FC<{
  size: number;
  color: string;
  style?: React.CSSProperties;
}> = ({ size, color, style }) => (
  <Svg size={size} color={color} style={style}>
    <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
  </Svg>
);

/** The tick that marks a cleared exercise. */
export const CheckIcon: React.FC<{
  size: number;
  color: string;
  style?: React.CSSProperties;
}> = ({ size, color, style }) => (
  <Svg size={size} color={color} strokeWidth={3} style={style}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);

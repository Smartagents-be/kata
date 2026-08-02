import React from "react";
import { colors, fonts, hairline, radius, shadow } from "../theme";

/**
 * The pieces every scene reuses: the deep-teal stage the kata's UI hangs beneath, a browser frame
 * to put a real screenshot in, a terminal, and the section label that names what a scene is about.
 * Keeping them here means a scene file is only ever the thing it animates.
 */

/** The full-bleed backdrop. Every scene sits on this so cuts between scenes never flash. */
export const Stage: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
}> = ({ children, dark = false }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: dark ? colors.header : colors.background,
        fontFamily: fonts.sans,
        color: dark ? colors.headerFg : colors.foreground,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

/** The small mono label above a scene's heading, the same one the app puts above a unit title. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({ children, dark = false, style }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: 22,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: dark ? "oklch(0.75 0.06 185)" : colors.primary,
      ...style,
    }}
  >
    {children}
  </div>
);

/** A browser window to frame a screenshot in, so a capture reads as the running app. */
export const Browser: React.FC<{
  url: string;
  children: React.ReactNode;
  width: number;
  height: number;
  style?: React.CSSProperties;
}> = ({ url, children, width, height, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius.lg,
      backgroundColor: colors.card,
      boxShadow: shadow.float,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div
      style={{
        height: 52,
        flexShrink: 0,
        backgroundColor: colors.muted,
        borderBottom: hairline,
        display: "flex",
        alignItems: "center",
        gap: 10,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {["oklch(0.72 0.16 25)", "oklch(0.82 0.15 85)", "oklch(0.75 0.15 150)"].map((c) => (
        <div key={c} style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: c }} />
      ))}
      <div
        style={{
          marginLeft: 14,
          flex: 1,
          height: 30,
          borderRadius: 999,
          backgroundColor: colors.card,
          border: hairline,
          display: "flex",
          alignItems: "center",
          paddingLeft: 16,
          fontFamily: fonts.mono,
          fontSize: 15,
          color: colors.mutedFg,
        }}
      >
        {url}
      </div>
    </div>
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
  </div>
);

/** A terminal window. The kata's exercises are run in one, so several scenes need it. */
export const Terminal: React.FC<{
  title: string;
  children: React.ReactNode;
  width: number;
  height?: number;
  style?: React.CSSProperties;
}> = ({ title, children, width, height, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius.md,
      backgroundColor: "oklch(0.19 0.02 200)",
      boxShadow: shadow.float,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div
      style={{
        height: 44,
        flexShrink: 0,
        backgroundColor: "oklch(0.25 0.022 200)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.mono,
        fontSize: 15,
        color: "oklch(0.68 0.02 200)",
      }}
    >
      {title}
    </div>
    <div
      style={{
        flex: 1,
        padding: "22px 28px",
        fontFamily: fonts.mono,
        fontSize: 21,
        lineHeight: 1.7,
        color: "oklch(0.9 0.01 200)",
      }}
    >
      {children}
    </div>
  </div>
);

/** A flat card: separation here is a hairline, never a shadow. */
export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      backgroundColor: colors.card,
      border: hairline,
      borderRadius: radius.lg,
      padding: 32,
      ...style,
    }}
  >
    {children}
  </div>
);

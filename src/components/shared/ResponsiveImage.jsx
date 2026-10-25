import React from "react";

/**
 * ResponsiveImage
 * Supports:
 * - Single image URL string
 * - Responsive image object: { desktop: string, mobile: string, alt: string }
 * - Accessible picture/source element with media query when mobile variant exists
 * - Graceful fallback and accessibility alt text
 */
export default function ResponsiveImage({
  image,
  alt = "",
  className = "",
  loading = "lazy",
  style = {},
  fallback = "",
  width,
  height,
  fetchPriority,
}) {
  if (!image && !fallback) return null;

  let desktopSrc = "";
  let mobileSrc = "";
  let altText = alt;

  if (typeof image === "string") {
    desktopSrc = image;
  } else if (image && typeof image === "object") {
    desktopSrc = image.desktop || image.desktopImage || image.url || image.image || image.src || "";
    mobileSrc = image.mobile || image.mobileImage || image.mobileUrl || "";
    if (image.alt && !alt) {
      altText = image.alt;
    }
  }

  if (!desktopSrc && !mobileSrc) {
    desktopSrc = fallback;
  }

  // If no mobile-specific variant exists or both are identical, render standard <img>
  if (!mobileSrc || mobileSrc === desktopSrc) {
    return (
      <img
        src={desktopSrc || mobileSrc}
        alt={altText}
        className={className}
        loading={loading}
        style={style}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
      />
    );
  }

  // Render responsive <picture> with <source> for mobile viewport (up to 767px)
  return (
    <picture className="inline-block w-full h-full">
      <source media="(max-width: 767px)" srcSet={mobileSrc} />
      <source media="(min-width: 768px)" srcSet={desktopSrc} />
      <img
        src={desktopSrc}
        alt={altText}
        className={className}
        loading={loading}
        style={style}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

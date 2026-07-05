import { useMemo } from "react";

interface YouTubeEmbedProps {
  /** YouTube video URL or 11-char video ID */
  url: string;
  title?: string;
  /** Optional playlist ID to play this video within */
  playlistId?: string;
  className?: string;
}

/**
 * Extracts a YouTube video ID from common URL formats or returns the input
 * if it already looks like an 11-character video ID.
 */
export function getYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Already an ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      // /embed/ID or /shorts/ID
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch {
    // not a URL
  }
  return null;
}

export function getYouTubeWatchUrl(input: string, playlistId?: string): string {
  const id = getYouTubeId(input);
  if (!id) return input;
  const url = new URL(`https://www.youtube.com/watch`);
  url.searchParams.set("v", id);
  if (playlistId) url.searchParams.set("list", playlistId);
  return url.toString();
}

/**
 * Renders the official YouTube iframe embed. We never download, proxy, or
 * modify the stream — all playback and analytics stay with YouTube.
 */
const YouTubeEmbed = ({ url, title, playlistId, className }: YouTubeEmbedProps) => {
  const src = useMemo(() => {
    const id = getYouTubeId(url);
    if (!id) return null;
    const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
    if (playlistId) {
      params.set("list", playlistId);
    }
    return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
  }, [url, playlistId]);

  if (!src) {
    return (
      <div className="aspect-video flex items-center justify-center bg-muted text-muted-foreground text-sm rounded-lg">
        رابط الفيديو غير صالح
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-lg bg-black ${className ?? ""}`}>
      <iframe
        src={src}
        title={title ?? "YouTube video player"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
};

export default YouTubeEmbed;

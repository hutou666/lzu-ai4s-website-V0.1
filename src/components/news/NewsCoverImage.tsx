"use client";

import Image from "next/image";

interface NewsCoverImageProps {
  src?: string;
  alt: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  placeholder?: boolean;
}

export function NewsCoverImage({
  src,
  alt,
  aspect = "aspect-[16/10]",
  className = "",
  priority = false,
  placeholder = false,
}: NewsCoverImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-brand-700/10 to-brand-400/5 ${aspect} ${className}`}
    >
      {src && !placeholder ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
          封面图待替换
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ServiceGalleryProps {
  mainImage: string;
  photoCaption: string;
  gallery: { url: string; caption: string }[];
}

export const ServiceGallery: React.FC<ServiceGalleryProps> = ({
  mainImage,
  photoCaption,
  gallery,
}) => {
  const [selectedImg, setSelectedImg] = useState(mainImage);
  const [currentCaption, setCurrentCaption] = useState(photoCaption);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Frame */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-ink border border-line shadow-sm group">
        <Image
          src={selectedImg}
          alt={currentCaption}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-ink/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/15">
          <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse" />
          <span>{currentCaption}</span>
        </div>
      </div>

      {/* Thumbnails */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-3 gap-2.5">
          {gallery.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedImg(item.url);
                setCurrentCaption(item.caption);
              }}
              className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                selectedImg === item.url
                  ? "border-accent shadow-md opacity-100 scale-[1.02]"
                  : "border-transparent opacity-70 hover:opacity-100 bg-surface-2"
              }`}
            >
              <Image
                src={item.url}
                alt={item.caption}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


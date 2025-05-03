"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MovieCardProps {
  id: string;
  title: string;
  englishTitle?: string;
  posterUrl: string;
  releaseDate: string;
  rating?: number;
  featured?: boolean;
  isComingSoon?: boolean;
}

export function MovieCard({
  id,
  title,
  englishTitle,
  posterUrl,
  releaseDate,
  rating,
  featured = false,
  isComingSoon = false,
}: MovieCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-md border-0 shadow-none transition-all hover:shadow-lg">
      {/* Featured Label or Coming Soon */}
      {(featured || isComingSoon) && (
        <div className={`absolute left-0 top-0 z-10 px-3 py-1 text-xs font-medium text-white ${featured ? 'bg-moveek-red' : 'bg-moveek-gold'}`}>
          {featured ? 'ĐƯỢC TÀI TRỢ' : 'MỚI'}
        </div>
      )}

      {/* Poster with Link */}
      <Link href={`/lich-chieu/${id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          <Image
            src={posterUrl || "/images/no-poster.png"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold text-moveek-darkgray">
                Mua vé
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Movie Info */}
      <div className="mt-2 px-1">
        <Link href={`/lich-chieu/${id}`} className="block">
          <h3 className="line-clamp-2 text-sm font-medium text-moveek-darkgray group-hover:text-moveek-red">
            {title}
          </h3>
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-moveek-lightgray">{releaseDate}</span>

          {rating !== undefined && (
            <div className="flex items-center space-x-1">
              <span className="text-sm font-semibold text-moveek-darkgray">
                {rating}%
              </span>
              <div className="h-1 w-10">
                <Progress value={rating} className="h-1" indicatorClassName={`${
                  rating >= 70
                    ? 'bg-moveek-green'
                    : rating >= 50
                    ? 'bg-moveek-gold'
                    : 'bg-moveek-red'
                }`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieCard } from "@/components/movie-card";

interface Movie {
  id: string;
  title: string;
  englishTitle?: string;
  posterUrl: string;
  releaseDate: string;
  rating?: number;
  featured?: boolean;
  isComingSoon?: boolean;
}

interface MovieCarouselProps {
  title: string;
  viewAllLink?: string;
  movies: Movie[];
}

export function MovieCarousel({ title, viewAllLink, movies }: MovieCarouselProps) {
  return (
    <div className="w-full py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-moveek-darkgray">{title}</h2>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-sm text-moveek-lightgray hover:text-moveek-red"
          >
            Xem tất cả
          </Link>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                englishTitle={movie.englishTitle}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                rating={movie.rating}
                featured={movie.featured}
                isComingSoon={movie.isComingSoon}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}

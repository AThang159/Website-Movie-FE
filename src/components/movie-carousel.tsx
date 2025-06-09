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
import { useMoviesHome } from "@/hooks/useMoviesHome";
import { MovieCard } from "@/components/movie-card";
import { MovieResponse } from "@/types/movie-response";


interface MovieCarouselProps {
  title: string;
  viewAllLink?: string;
}

export function MovieCarousel({ title, viewAllLink}: MovieCarouselProps) {
  const { nowShowingMovies, comingSoonMovies, loading } = useMoviesHome();

  let movies: MovieResponse[] = [];

  if(viewAllLink == "/dang-chieu") {
    movies = nowShowingMovies;
  } else if (viewAllLink == "/sap-chieu"){
    movies = comingSoonMovies; 
  }
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
              key={movie.movieCode}
              className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <MovieCard
                id={movie.movieCode}
                title={movie.title}
                englishTitle={movie.englishTitle}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                rating={movie.rating}
                featured={movie.featured}
                isComingSoon={movie.status === "COMING_SOON"}
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

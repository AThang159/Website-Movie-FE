"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt?: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  large?: boolean;
}

export function NewsCard({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  author,
  date,
  large = false,
}: NewsCardProps) {
  return (
    <Card className="group overflow-hidden rounded-md border-0 shadow-none transition-all hover:shadow-md">
      <Link href={`/bai-viet/${id}`} className="block">
        <div className={`relative overflow-hidden rounded-t-md ${large ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-3">
        <div className="mb-2 flex items-center text-xs text-moveek-lightgray">
          <Link
            href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-moveek-red hover:underline"
          >
            {category}
          </Link>
          <span className="mx-1">·</span>
          <Link
            href={`/u/${author.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover:underline"
          >
            {author}
          </Link>
          <span className="mx-1">·</span>
          <span>{date}</span>
        </div>

        <Link href={`/bai-viet/${id}`} className="block">
          <h3 className={`${large ? 'text-xl' : 'text-base'} font-medium text-moveek-darkgray group-hover:text-moveek-red ${!excerpt ? 'line-clamp-3' : 'line-clamp-2'}`}>
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-moveek-lightgray">
            {excerpt}
          </p>
        )}
      </div>
    </Card>
  );
}

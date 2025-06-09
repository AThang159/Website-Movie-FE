import { MovieResponse } from "@/types/movie-response";
import { API_BACKEND_URL } from "../config";
import { ApiResponse } from "@/types/api-response";
import { MovieRequest } from "@/types/movie-request";

export async function fetchMovies(): Promise<MovieResponse[]> {
    const url = `${API_BACKEND_URL}/admin/movies/all`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch movies: ${res.status} - ${errorText}`);
    }
  
    const json: ApiResponse<MovieResponse[]> = await res.json();
  
    if (!json.success) throw new Error(`API error: ${json.message}`);
    if (!Array.isArray(json.data)) throw new Error("Invalid data format");
  
    return json.data;
  }
  
  export async function addMovie(movieData: MovieRequest): Promise<MovieResponse> {
    try {
      const response = await fetch(`${API_BACKEND_URL}/admin/movies/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(movieData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add movie');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding movie:', error);
      throw error;
    }
  }
  
  export async function updateMovie(movieId: string, movieData: Partial<MovieRequest>): Promise<MovieResponse> {
    try {
      const response = await fetch(`${API_BACKEND_URL}/admin/movies/update/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(movieData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update movie');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  }
  
  export async function deleteMovie(movieId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BACKEND_URL}/admin/movies/soft-delete/${movieId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  }
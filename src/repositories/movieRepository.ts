import { Movie } from "../models/Movie";

export class MovieRepository  {
  private movies: Movie[] = [];

  async create(movie: Movie): Promise<Movie> {
    this.movies.push(movie);
    return movie;
  }

  async findById(id: string): Promise<Movie | null> {
    return this.movies.find((movie) => movie.id === id) || null;
  }

  async update(id: string, movie: Partial<Movie>): Promise<Movie | null> {
    const index = this.movies.findIndex((m) => m.id === id);
    if (index === -1) return null;
    this.movies[index] = { ...this.movies[index], ...movie };
    return this.movies[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.movies.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.movies.splice(index, 1);
    return true;
  }

  async list(): Promise<Movie[]> {
    return this.movies;
  }
}


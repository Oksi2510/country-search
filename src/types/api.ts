export interface CountryApiResponse {
  name: string;
  flags: { svg: string };
  capital?: string;
  region: string;
  population: number;
  languages: { name: string }[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url?: string;
  additionalInfo?: string;
}

export interface Tribute {
  id: string;
  author: string;
  message: string;
  image_url?: string;
  created_at: string;
}

export interface SupabaseCredentials {
  apiUrl: string;
  anonKey: string;
}

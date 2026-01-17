export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface BookingRequest {
  serviceId?: string;
  name: string;
  email: string;
  date: string;
  notes?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
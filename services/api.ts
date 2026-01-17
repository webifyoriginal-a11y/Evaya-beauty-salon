import { ApiResponse, BookingRequest, ContactRequest } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async submitBooking(data: BookingRequest): Promise<ApiResponse<BookingRequest>> {
    await delay(1500); // Fake processing time
    
    // Simulate simple validation
    if (!data.name || !data.email || !data.date) {
      return {
        success: false,
        error: "Please fill in all required fields."
      };
    }

    // Simulate success
    return {
      success: true,
      message: "Booking request received. We will confirm shortly.",
      data
    };
  },

  async submitContact(data: ContactRequest): Promise<ApiResponse<ContactRequest>> {
    await delay(1200);

    if (!data.message || !data.email) {
      return {
        success: false,
        error: "Email and message are required."
      };
    }

    return {
      success: true,
      message: "Message sent. Thank you for reaching out.",
      data
    };
  }
};
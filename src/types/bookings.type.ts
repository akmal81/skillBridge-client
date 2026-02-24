export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  timeSlotId: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED'; // আপনার সম্ভাব্য স্ট্যাটাসগুলো দিন
  timeSlot: {
    id: string;
    tutorId: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    availability: boolean;
  };
  tutor: {
    id: string;
    userId: string;
    categoryId: string;
    bio: string;
    image: string;
    subject: string;
    experience: number;
    course_price: number;
    avg_rating: number;
    isFeatured: boolean;
  };
}
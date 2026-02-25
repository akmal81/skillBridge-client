export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  timeSlotId: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' |'CONFIRMED'; 
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


export interface MyBooking {
  id: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED' |'CONFIRMED';
  studentId: string;
  tutor: {
    id:string
    subject: string;
    image: string;
    user: { name: string; email: string };
  };
  timeSlot: {
    date: string;
    startTime: string;
    endTime: string;
  };
}
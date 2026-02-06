export interface Tutor {
    id:string
    userId: string,
    categoryId: string,
    name: string,
    bio: string,
    image: string,
    subject: string,
    experience: number,
    course_price: number,
    avg_rating: number,
    isFeatured: boolean,
    availability: boolean,
    reviews?: number,
    bookings?:number
}
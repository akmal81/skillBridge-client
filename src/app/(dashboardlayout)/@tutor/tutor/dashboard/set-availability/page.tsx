import TimeSlotPage from "@/components/module/dashboard/timeSlot";
import TutorReviewsTable from "@/components/module/dashboard/tutorReviews";
import TutorSessionsTable from "@/components/module/dashboard/tutorSession";

import { reviewsService } from "@/services/reviews.service";
import { studentService } from "@/services/student.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

export default async function SetAvailAbilityPage() {

    const {data:user} = await userService.getSession();

    const {data:tutor} = await tutorService.getTutorByUserId(user.user.id);

    const {data:timeSlots} = await tutorService.getTimeSlotsByTutorId(tutor.id);


    return(
        <div>
      <TimeSlotPage timeSlots={timeSlots} />
        </div>
    )
}
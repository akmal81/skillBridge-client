import TutorReviewsTable from "@/components/module/dashboard/tutorReviews";
import TutorSessionsTable from "@/components/module/dashboard/tutorSession";

import { reviewsService } from "@/services/reviews.service";
import { studentService } from "@/services/student.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

export default async function TutorReviewsPage() {

    const {data:user} = await userService.getSession();

    const {data:tutor} = await tutorService.getTutorByUserId(user.user.id);

    const {data: reviews} = await reviewsService.getReviewsByTutorId(tutor.id);

   


    return(
        <div>
        <TutorReviewsTable reviews={reviews}/>
        </div>
    )
}
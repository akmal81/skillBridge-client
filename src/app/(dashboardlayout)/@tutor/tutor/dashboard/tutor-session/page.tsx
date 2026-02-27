import TutorSessionsTable from "@/components/module/dashboard/tutorSession";
import { bookingService } from "@/services/bookings.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

export default async function TutorSessionPage() {

    const {data:user} = await userService.getSession();

    const {data:tutor} = await tutorService.getTutorByUserId(user.user.id);

    const {data} = await bookingService.getBookingBytutorId(tutor.id);

 

    return(
        <div>
         <TutorSessionsTable sessions={data}/>
        </div>
    )
}
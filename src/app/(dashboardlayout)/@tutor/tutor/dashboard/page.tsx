import { CreateTutorProfile } from "@/components/module/dashboard/createTutorProfile";
import TutorProfileDashboard from "@/components/module/dashboard/tutorProfile";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/category.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";


export default async function TutorDashboard(


) {

    const { data } = await userService.getSession();
    

    const {data:category} = await categoryService.getAllCagetories();
    

    const { data: tutor } = await tutorService.getTutorByUserId(data.user.id);

   

    return (
        <div>

            
            {
                !tutor ? <CreateTutorProfile  userInfo={data.user} categories={category}/> :
                    <TutorProfileDashboard tutor={tutor} user={data.user} />
            }
        </div>
    );
}




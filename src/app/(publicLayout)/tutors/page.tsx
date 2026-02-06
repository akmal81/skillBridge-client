
import TutorsPage from "@/components/module/tutors/alltutors";
import { tutorService } from "@/services/tutor.service";

interface TutorPageProps {
    searchParams: Promise<{ [key: string]: string | undefined }>
}


export default async function SearchTutor(
    { searchParams }: TutorPageProps
) {
    const params = await searchParams; //get params from url "subject=math"
    const { data } = await tutorService.getTutors(
        {
            subject: params.subject ||"",
            price: params.price ||"",
            rating:params.rating ||""
        },
        {
            revalidate:10
        }
    )
    return (
<TutorsPage tutors={data.data}/>
    )
} 
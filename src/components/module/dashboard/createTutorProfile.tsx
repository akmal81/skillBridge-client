"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import * as z from "zod"


import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { BookOpen, Edit3, Mail } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { CreateTurorCategory } from "@/types/category.type"
import { createTutorAction } from "@/actions/tutor.action"


const roles = [
    { label: "As Student", value: "STUDENT" },
    { label: "As Tutor", value: "TUTOR" }
] as const


// zod 

export const formSchema = z.object({
    bio: z
        .string()
        .min(20, { message: "Bio must be at least 20 characters." })
        .max(500, { message: "Bio cannot exceed 500 characters." }),

    image: z
        .string()
        .url({ message: "Please enter a valid image URL." })
        .min(1, { message: "Profile image is required." }),

    subject: z
        .string()
        .min(2, { message: "Subject name is too short." })
        .max(50, { message: "Subject name is too long." }),

    experience: z.coerce
        .number()
        .min(0, { message: "Experience cannot be negative." })
        .max(50, { message: "That's a lot of experience! Max 50 years." }),

    course_price: z.coerce
        .number()
        .min(1, { message: "Price must be at least 1 BDT." }),

    categoryId: z
        .string()

});




export function CreateTutorProfile({ userInfo, categories, ...props }: any) {

   


    const router = useRouter()


    const form = useForm({
        defaultValues: {

            bio: "",
            image: "",
            subject: "",
            experience: 0,
            course_price: 0,
            categoryId: "",
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading("User Creating");

            
            try {

                const res = await createTutorAction(value);
                // console.log(value)

                // if (error) {
                //     toast.error(error.message, { id: toastId })
                //     return
                // }

                toast.success("Tutor Created Successfully!!", { id: toastId })
                router.replace('/tutor/dashboard')

            } catch (error) {
                toast.error("Something went wrong, please try again later", { id: toastId })
            }
        }
    })



    return (
        <Card {...props} className="w-6/12 mx-auto">
            <CardHeader>
                {/* <h1 className="text-primary text-center font-bold text-4xl">
                    Skill
                    <span className="text-secondary">
                        bridge
                    </span>
                    <span className="">.</span></h1> */}
                <SelectSeparator />
                <CardTitle className="text-center">Create Your Tutor Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    id="create-tutor-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit()
                    }}>

                    <FieldGroup>
                        {/* name */}
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative">

                                    <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-6 h-6 rounded-full"></div>
                                </div>
                                <div className="text-center md:text-left">
                                    <h1 className="text-3xl font-extrabold text-gray-900">{userInfo.name}</h1>
                                    <p className="text-blue-600 font-medium flex items-center justify-center md:justify-start gap-2">
                                        {/* <BookOpen size={18} /> {tutor.subject} Instructor */}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2 text-gray-500">
                                        <Mail size={16} /> {userInfo.email}
                                    </div>
                                </div>
                            </div>
                            {/* <Button size="lg" className="rounded-full bg-primary hover:bg-secondary  text-white px-8 h-12 flex gap-2">
          <Edit3 size={18} /> Edit Profile
        </Button> */}
                        </div>


                        {/* bio */}
                        <form.Field
                            name="bio"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            // type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none"
                                        />
                                        {
                                            isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />
                                        }
                                    </Field>
                                )
                            }}
                        />



                        {/* image */}
                        <form.Field
                            name="image"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Imae URL</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none"
                                        />
                                        {
                                            isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />
                                        }
                                    </Field>
                                )
                            }}
                        />


                        {/* subject */}
                        <form.Field
                            name="subject"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none"
                                        />
                                        {
                                            isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />
                                        }
                                    </Field>
                                )
                            }}
                        />


                        {/* experience */}
                        <form.Field
                            name="experience"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Experience</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none"
                                        />
                                        {
                                            isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />
                                        }
                                    </Field>
                                )
                            }}
                        />


                        {/* course_price */}
                        <form.Field
                            name="course_price"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Course Price</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            className="focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none"
                                        />
                                        {
                                            isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />
                                        }
                                    </Field>
                                )
                            }}
                        />







                        {/* category */}


                        <form.Field
                            name="categoryId"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid} orientation="responsive" >
                                        <FieldContent>
                                            <FieldLabel htmlFor={field.name}>
                                                Category
                                            </FieldLabel>

                                        </FieldContent>
                                        <Select
                                            name={field.name}
                                            value={field.state.value}
                                            onValueChange={field.handleChange}
                                        >
                                            <SelectTrigger
                                                id="role"
                                                className="w-full h-12 rounded-xl border-gray-200 focus:ring-primary"
                                            >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="item-aligned">
                                                <SelectSeparator />
                                                {categories.data.map((category: CreateTurorCategory) => (
                                                    <SelectItem
                                                        className="focus:bg-primary focus:text-primary-foreground cursor-pointer"
                                                        key={category.catName}
                                                        value={category.id}
                                                    >
                                                        {category.catName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {
                                            isInvalid && <FieldError className="text-red-500" errors={field.state.meta.errors} />
                                        }
                                    </Field>
                                )
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full rounded-full bg-primary hover:bg-s font-semibold"
                    size="lg"
                    form="create-tutor-form" type="submit">Create Tutor profile</Button>
            </CardFooter>

        </Card>
    )
}






















// <FieldGroup>
//               <Field>
//                 <Button
//                 className="bg-primary hover:bg-primary/80 "
//                  type="submit">Create Account</Button>
//                 {/* <Button variant="outline" type="button">
//                   Sign up with Google
//                 </Button> */}
//                 <FieldDescription className="px-6 text-center">
//                   Already have an account? <Link href="/login">Login</Link>
//                 </FieldDescription>
//               </Field>
//             </FieldGroup>
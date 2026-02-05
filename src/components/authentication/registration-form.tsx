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


const roles = [
  { label: "As Student", value: "STUDENT" },
  { label: "As Tutor", value: "TUTOR" }
] as const


// zod 

const formSchema = z.object({
  name: z.string().min(4, "Your Name is Required"),
  email: z.email(),
  password: z.string().min(8, "Password must be 8 charector long"),
  role: z.string().min(1, "Please Select one option")
})




export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {


  const router = useRouter()


  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("User Creating")
      try {

        const { data, error } = await authClient.signUp.email(value)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success("User Created Successfully!!", { id: toastId })
        router.replace('/')

      } catch (error) {
        toast.error("Something went wrong, please try again later", { id: toastId })
      }
    }
  })



  return (
    <Card {...props}>
      <CardHeader>
        <h1 className="text-primary text-center font-bold text-4xl">
          Skill
          <span className="text-secondary">
            bridge
          </span>
          <span className="">.</span></h1>
        <SelectSeparator />
        <CardTitle className="text-center">Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="registration"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit()
          }}>

          <FieldGroup>
            {/* name */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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


            {/* emamil */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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



            {/* Password */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
            {/* role */}


            <form.Field
              name="role"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} orientation="responsive" >
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        Register as
                      </FieldLabel>

                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="role"
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectSeparator />
                        {roles.map((role) => (
                          <SelectItem 
                          className="focus:bg-primary focus:text-primary-foreground cursor-pointer"
                            key={role.value}
                            value={role.value}
                          >
                            {role.label}
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
          className="w-full rounded-full bg-secondary font-semibold"
          size="lg"
          form="registration" type="submit">Register</Button>
      </CardFooter>
      <FieldDescription className="px-6 text-center">
        Already have an account? <Link href="/login">Login</Link>
      </FieldDescription>
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
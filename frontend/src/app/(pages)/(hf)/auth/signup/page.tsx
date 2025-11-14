"use client";
import { Button } from "@/shared/ui/button";
import { TextField } from "@/shared/ui/textField";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/shared/api/auth";

const SignUpResolver = z.object({
  email: z.email({ message: "Incorrect email" }),
  password: z
    .string({ message: "password is string" })
    .min(8, "min length 8 characters"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpResolver) });
  const { mutate, error } = useSignUp();

  return (
    <>
      <header>
        <span className="text-xl text-accent">Sign up</span>
        <p className="opacity-50">Enter your details to register</p>
      </header>
      <form
        onSubmit={handleSubmit((data) => {
          mutate(data);
        })}
        className="h-full w-1/2 mx-auto flex flex-col gap-5 justify-center"
      >
        <TextField
          errorMessage={errors.email?.message}
          label="email"
          className="w-full"
          {...register("email")}
        />
        <TextField
          errorMessage={errors.password?.message}
          label="password"
          type="password"
          className="w-full"
          {...register("password")}
        />
        <Button variant={"accent"}>Sign up</Button>
        <div className="text-center pt-5">
          <span className="opacity-60">Already have an account? </span>
          <Link href={"/auth/login"} className="text-accent">
            Log in
          </Link>
        </div>
      </form>
    </>
  );
};
export default SignUp;

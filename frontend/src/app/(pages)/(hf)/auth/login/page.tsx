"use client";
import { useLogIn } from "@/shared/api/auth";
import { Button } from "@/shared/ui/button";
import { TextField } from "@/shared/ui/textField";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const LogInResolver = z.object({
  email: z.email({ message: "Incorrect email" }),
  password: z
    .string({ message: "password is string" })
    .min(8, "min length 8 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LogInResolver) });
  const { mutate } = useLogIn();
  return (
    <>
      <header>
        <span className="text-xl text-accent">Log in</span>
        <p className="opacity-50">Enter your details to log in</p>
      </header>
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
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
        <Button variant={"accent"}>Log in</Button>
        <div className="text-center pt-5 ">
          <span className="opacity-60">Don&apos;t have an account yet? </span>
          <Link href={"/auth/signup"} className="text-accent">
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
};
export default Login;

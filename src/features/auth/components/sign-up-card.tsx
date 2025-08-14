"use client";

import { DottedSeparator } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/features/auth/api";
import { signUpFormSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SignUpCard() {
  const { mutate, isPending } = useSignUp();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    mutate({
      json: values,
    });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Join us to start managing your tasks efficiently!
        </CardDescription>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              type="submit"
              disabled={isPending}
              size="lg"
            >
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      {/*
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          className="w-full"
          variant="secondary"
          size="lg"
          disabled={isPending}
          onClick={() => signUpWithGoogle()}
        >
          <FcGoogle className="mr-2 size-5" />
          Sign up with Google
        </Button>

        <Button
          className="w-full"
          variant="secondary"
          size="lg"
          disabled={isPending}
          onClick={() => signUpWithGithub()}
        >
          <FaGithub className="mr-2 size-5" />
          Sign up with GitHub
        </Button>
      </CardContent>
      */}
      <CardContent className="p-7 pt-0 flex items-center justify-center">
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>

      <CardFooter className="p-7 flex text-xs items-center justify-center w-full pt-0">
        By signing up, you agree to our&nbsp;
        <Link
          href="/privacy-policy"
          className="text-blue-500 text-center  hover:underline"
        >
          <span>Privacy Policy</span>
        </Link>
        <span>&nbsp;and&nbsp;</span>
        <Link
          href="/terms"
          className="text-blue-500 text-center hover:underline"
        >
          <span>Terms of Service</span>
        </Link>
      </CardFooter>
    </Card>
  );
}

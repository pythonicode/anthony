"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import EmailReveal from "./EmailReveal";

interface ContactFormValues {
    context?: string;
    name: string;
    athleteName?: string;
    email: string;
    message: string;
}

export default function ContactForm({ context }: { context?: string }) {
    const form = useForm<ContactFormValues>({
        defaultValues: {
            context,
        },
    });

    async function onSubmit(values: ContactFormValues) {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        console.log(response);

        if (response.ok) {
            alert("Thanks for reaching out! I will get back to you shortly.");
            form.reset();

        } else alert("Something went wrong. Please try again later.");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-5xl flex flex-col gap-4 w-full bg-white p-8 rounded">
                <div className="flex flex-col gap-2 mb-8 items-center lg:items-baseline">
                    <h2 className="font-bold text-3xl lg:ml-4">Contact Me</h2>
                    <div className="w-64 h-1 bg-black" />
                </div>
                <EmailReveal className="mx-auto w-full" />
                <div className="flex items-center justify-center gap-4 my-4">
                    <hr className="w-20 border-neutral-500" />
                    <p className="text-neutral-500">OR</p>
                    <hr className="w-20 border-neutral-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel className="text-xl">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First and Last Name" {...field} className="text-xl py-8" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="athleteName"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel className="text-xl">Athlete Name (optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="First and Last Name" {...field} className="text-xl py-8" />
                                </FormControl>
                                <FormDescription>
                                    If you are signing up for someone else, please include their name here.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormLabel className="text-xl">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="name@example.com" {...field} className="text-xl py-8" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormLabel className="text-xl">Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Please include any information you would like to share and I will get back to you promptly..." rows={5} {...field} className="text-xl" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mx-auto w-full text-xl p-8">Submit</Button>
            </form>
        </Form>
    )
}
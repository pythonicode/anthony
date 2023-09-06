import ContactForm from "@/components/core/ContactForm";
import Image from "next/image";

export const metadata = {
    title: "Anthony Riley | Contact",
    description: "Contact Anthony Riley about his coaching services.",
}

export default function ContactPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center lg:py-20">
            <div className="relative h-96 w-full lg:max-w-sm aspect-video mx-auto mb-16 p-8">
                <Image src="/images/coaching/triathlon2.jpg" alt="Highschool" layout="fill" objectFit="cover" className="rounded" />
            </div>
            <ContactForm />
        </main>
    )
}
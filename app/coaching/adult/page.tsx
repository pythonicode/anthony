import ContactForm from "@/components/core/ContactForm";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export const metadata = {
    title: "Anthony Riley | Adult Athletes",
    description: "Professional private running for adult athletes.",
}

export default function AdultPage() {
    return (
        <main>
            <section className="mx-auto min-h-screen flex flex-col items-center">
                <div className="relative h-96 mb-10 lg:mb-20 w-full">
                    <Image src="/images/coaching/boston.jpg" alt="Highschool" layout="fill" objectFit="cover" className="rounded" />
                </div>
                <h1 className="text-center font-bold text-3xl md:text-5xl lg:text-6xl mb-4 px-4">Adult Athletes</h1>
                <h2 className="text-center px-8">For anybody not currently enrolled in Highschool or University</h2>
                <div className="grid grid-cols-3 max-w-5xl mx-auto gap-8 p-8 w-full">
                    <div className="col-span-3 lg:col-span-1 border rounded p-8">
                        <h3 className="font-semibold text-xl mb-2"><span className="underline">ALL</span> Skill Levels</h3>
                        <p className="leading-tight text-neutral-500">
                            Whether you are completely new to running or a seasoned veteran, everyone is welcome to get in touch with me below!
                            Elite athletes please <Link href="/coaching/elite" className="text-neutral-700 hover:underline">contact me here.</Link>
                        </p>
                    </div>
                    <div className="col-span-3 lg:col-span-1 border rounded p-8">
                        <h3 className="font-semibold text-xl mb-2">For The Athlete</h3>
                        <p className="leading-tight text-neutral-500">
                            My goal is to understand <span className="italic">your</span> goals as an athlete and as a person.
                            I will jump into the process to help you develop and achieve those goals.
                        </p>
                    </div>
                    <div className="col-span-3 lg:col-span-1 border rounded p-8">
                        <h3 className="font-semibold text-xl mb-2">Long-Term Focus</h3>
                        <p className="leading-tight text-neutral-500">
                            Athletics is about the process. Creating a lifetime habit of development will not
                            only improve your race performances, but empower your life as well.
                        </p>
                    </div>
                </div>
                <div className="text-neutral-700 mx-auto text-center animate-pulse mb-8">
                    <p>Get Started</p>
                    <FaChevronDown size={20} className="mx-auto" />
                </div>
            </section>
            <section className="bg-neutral-100 lg:min-h-screen flex flex-col items-center justify-center lg:p-8">
                <ContactForm context="adult" />
            </section>
        </main>
    )
}
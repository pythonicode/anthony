import Image from "next/image";
import { FaArrowRight, FaChevronDown, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { Raleway } from "next/font/google";
import Link from "next/link";

const font = Raleway({
    subsets: ['latin'],
});

export const metadata = {
    title: 'Anthony Riley | Coaching',
    description: 'Professional online coaching for all skill levels.',
}

export default function CoachingPage() {
    return (
        <main>
            <section className="h-screen flex flex-col items-center justify-center max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8 p-8">
                    <div className="relative aspect-square max-w-md m-8">
                        <Image src="/images/coaching/goldengate.jpg" alt="Golden Gate Bridge" layout="fill" objectFit="cover" className="rounded" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <blockquote className={`relative leading-tight font-semibold md:text-xl text-neutral-700 ml-8 ${font.className}`}>
                            <FaQuoteLeft className="absolute -top-4 -left-10" />
                            Taking part in athletics is a choice that allows us to feel empowered. To show ourselves that we can
                            achieve the impossible, again and again without failure. It drives us to succeed in the face of great challenges,
                            and to overcome adversity. It is a personal choice, one that allows us to thrive in all aspects of life
                            as the best version of ourselves that we all want to be.
                            <p className="mt-4 text-right">Coach Anthony</p>
                        </blockquote>
                    </div>
                </div>
                <div className="text-neutral-700 mx-auto text-center animate-pulse">
                    <p>See coaching opportunities</p>
                    <FaChevronDown size={20} className="mx-auto" />
                </div>
            </section>
            <section className="min-h-screen flex flex-col items-center justify-center max-w-7xl mx-auto py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 p-8 w-full">
                    <div className="flex flex-col justify-center md:p-8 lg:p-16 mt-16 lg:mt-0">
                        <h2 className="text-3xl font-semibold text-center mb-4">Private Coaching</h2>
                        <h3 className="text-center text-neutral-500 mb-4">Professional online coaching for all skill levels</h3>
                        <ul className="flex flex-col gap-4 w-full mb-8">
                            <li className="flex items-center gap-4">
                                <FaChevronRight />
                                <p>Introductory call to discuss goals, training history, overall lifestyle and preferences</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <FaChevronRight />
                                <p>Personalized training plan updated weekly basis using real-time feedback from the athlete</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <FaChevronRight />
                                <p>Weekly meetings to check in with the athlete about training  and monitoring injury</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <FaChevronRight />
                                <p>24/7 availability for any questions related to training or lifestyle</p>
                            </li>
                        </ul>
                        <Link href="/coaching/contact" className="bg-neutral-50 text-neutral-700 hover:text-black hover:transition-colors p-4 text-center">
                            Get In Touch
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/coaching/highschool" className="p-4 rounded hover:bg-neutral-50 transition-colors">
                            <div className="relative w-full aspect-video mb-4">
                                <Image src="/images/coaching/highschool.jpg" alt="Highschool Coaching Photo" layout="fill" objectFit="cover" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Highschool Students</h2>
                            <p className="text-sm text-neutral-500 mb-2">
                                For ambitious highschool athletes of all levels. Whether you are looking to make the varsity team,
                                or to compete at the state level, working with a qualified coach can help you achieve your goals.
                            </p>
                            <div className="flex justify-end">
                                <FaArrowRight className="text-neutral-500" />
                            </div>
                        </Link>
                        <Link href="/coaching/college" className="p-4 rounded hover:bg-neutral-50 transition-colors">
                            <div className="relative w-full aspect-video mb-4">
                                <Image src="/images/coaching/college.jpg" alt="College Coaching Photo" layout="fill" objectFit="cover" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">College Students</h2>
                            <p className="text-sm text-neutral-500 mb-2">
                                For collegiate athletes that are not receiving coaching from their school and are looking to improve their health, fitness
                                or performance at local races, club meets, or elsewhere.
                            </p>
                            <div className="flex justify-end">
                                <FaArrowRight className="text-neutral-500" />
                            </div>
                        </Link>
                        <Link href="/coaching/adult" className="p-4 rounded hover:bg-neutral-50 transition-colors">
                            <div className="relative w-full aspect-video mb-4">
                                <Image src="/images/coaching/adult.jpg" alt="College Coaching Photo" layout="fill" objectFit="cover" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Adult Athletes</h2>
                            <p className="text-sm text-neutral-500 mb-2">
                                Whether you are looking to run your first 5k, or to qualify for the Boston Marathon, get your training on track with a
                                personalized training plan and professional coaching for all skill levels.
                            </p>
                            <div className="flex justify-end">
                                <FaArrowRight className="text-neutral-500" />
                            </div>
                        </Link>
                        <Link href="/coaching/elite" className="p-4 rounded hover:bg-neutral-50 transition-colors">
                            <div className="relative w-full aspect-video mb-4">
                                <Image src="/images/coaching/elite.jpg" alt="College Coaching Photo" layout="fill" objectFit="cover" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Elite Athletes</h2>
                            <p className="text-sm text-neutral-500 mb-2">
                                Post-collegiate athletes looking to compete professionally at the national or international level. Get the most out of your
                                career with advanced personal coaching tailored to your specific needs.
                            </p>
                            <div className="flex justify-end">
                                <FaArrowRight className="text-neutral-500" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            {/* <section className="min-h-screen flex-col items-center justify-center max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 p-8 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/coaching/highschool" className="p-4 rounded hover:bg-neutral-50 transition-colors">
                            <div className="relative w-full aspect-video mb-4">
                                <Image src="/images/coaching/highschool.jpg" alt="Highschool Coaching Photo" layout="fill" objectFit="cover" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Highschool Students</h2>
                            <p className="text-sm text-neutral-500 mb-2">
                                For ambitious highschool athletes of all levels. Whether you are looking to make the varsity team,
                                or to compete at the state level, working with a qualified coach can help you achieve your goals.
                            </p>
                            <div className="flex justify-end">
                                <FaArrowRight className="text-neutral-500" />
                            </div>
                        </Link>
                        <Link href="/coaching/college" className="p-4 rounded hover:bg-neutral-50 transition-colors">
                            <div className="relative w-full aspect-video mb-20">
                                <Image src="/images/coaching/college.jpg" alt="College Coaching Photo" layout="fill" objectFit="cover" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">College Students</h2>
                            <p className="text-sm text-neutral-500 mb-2">
                                For collegiate athletes that are not receiving coaching from their school and are looking to improve their health, fitness
                                or performance at local races, club meets, or elsewhere.
                            </p>
                            <div className="flex justify-end">
                                <FaArrowRight className="text-neutral-500" />
                            </div>
                        </Link>
                        <Link href="/coaching/adult" className="p-4 rounded hover:bg-neutral-50 transition-colors">
                            <div className="relative w-full aspect-video mb-4">
                                <Image src="/images/coaching/adult.jpg" alt="College Coaching Photo" layout="fill" objectFit="cover" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Adult Athletes</h2>
                            <p className="text-sm text-neutral-500 mb-2">
                                Whether you are looking to run your first 5k, or to qualify for the Boston Marathon, get your training on track with a
                                personalized training plan and professional coaching for all skill levels.
                            </p>
                            <div className="flex justify-end">
                                <FaArrowRight className="text-neutral-500" />
                            </div>
                        </Link>
                        <Link href="/coaching/elite" className="p-4 rounded hover:bg-neutral-50 transition-colors">
                            <div className="relative w-full aspect-video mb-4">
                                <Image src="/images/coaching/elite.jpg" alt="College Coaching Photo" layout="fill" objectFit="cover" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Elite Athletes</h2>
                            <p className="text-sm text-neutral-500 mb-2">
                                Post-collegiate athletes looking to compete professionally at the national or international level. Get the most out of your
                                career with advanced personal coaching tailored to your specific needs.
                            </p>
                            <div className="flex justify-end">
                                <FaArrowRight className="text-neutral-500" />
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center p-16">
                        <h2 className="text-3xl font-semibold text-center mb-4">Private Coaching</h2>
                        <h3 className="text-center text-neutral-500 mb-4">Professional online coaching for all skill levels</h3>
                        <ul className="flex flex-col gap-4 w-full mb-8">
                            <li className="flex items-center gap-4">
                                <FaChevronRight />
                                <p>Introductory call to discuss goals, training history, overall lifestyle and preferences</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <FaChevronRight />
                                <p>Personalized training plan updated weekly basis using real-time feedback from the athlete</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <FaChevronRight />
                                <p>Weekly meetings to check in with the athlete about training  and monitoring injury</p>
                            </li>
                            <li className="flex items-center gap-4">
                                <FaChevronRight />
                                <p>24/7 availability for any questions related to training or lifestyle</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section> */}
            <section className="min-h-screen flex flex-col items-center justify-center max-w-7xl mx-auto">
                <div className="relative m-8">
                    <h2 className="text-3xl font-bold">About Me</h2>
                    <div className="absolute border-t-4 border-l-4 w-16 h-8 border-black -top-4 -left-8" />
                    <div className="absolute border-b-4 border-r-4 w-16 h-8 border-black -bottom-4 -right-8" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8 p-8 w-full">
                    <div className="relative h-96">
                        <Image src="/images/coaching/beach.jpg" alt="Anthony Riley" layout="fill" objectFit="cover" />
                    </div>
                    <div className="flex flex-col gap-8 lg:p-8">
                        <h2 className={`${font.className} text-3xl font-semibold text-center`}>Hello 👋 <br /> my name is <span className="font-bold">Anthony</span></h2>
                        <p>
                            I am a <span className="font-semibold">USATF certified</span> running coach from Pennsylvania currently
                            finishing my degree at <span className="font-semibold">Stanford University</span>.
                        </p>
                        <p>
                            I have been a passionate runner from a young age and have competed at the national and international level.
                            Currently I am competing as member of the <span className="font-semibold">US National Orienteering Team</span>.
                        </p>
                        <p>
                            For many years I have <span className="font-semibold">studied training theory</span> to improve my own performance and have worked with many
                            athletes to help them achieve their goals.
                        </p>
                    </div>
                    <div className="flex flex-col gap-8 lg:p-8">
                        <h2 className={`${font.className} text-3xl font-semibold text-center`}>Coaching Philosophy</h2>
                        <p>
                            I want my athletes to feel energized, healthy, and perform at their best. My goal is to foster a <span className="font-semibold">lifelong relationship</span> with athletics
                            and to help my athletes consistently and sustainably improve.
                        </p>
                        <p>
                            Training is supposed to be <span className="font-bold">fun <span className="italic">and</span> effective</span>.
                            This means understanding the individual athlete and what makes them tick.
                        </p>
                        <p>
                            To achieve these goals I use a <span className="font-semibold">holistic approach</span> to training that takes into account the athlete&apos;s lifestyle, goals, and preferences.
                        </p>
                        <p>
                            My philosphy is inspired by the Ingebristen method of <span className="font-semibold">long-term aerobic development </span>
                            with a focus on developing metabolic efficiency and running economy while avoiding overtraining and injury.
                        </p>
                    </div>
                    <div className="relative h-96">
                        <Image src="/images/coaching/teamusa.jpg" alt="Anthony Riley" layout="fill" objectFit="cover" />
                    </div>
                </div>
            </section>
        </main >
    );
}
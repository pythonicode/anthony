"use client";

import Title from "@/components/typography/Title";
import { useMobile } from "@/lib/core";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function PerformLogo({ className }: { className?: string }) {
    return (
        <div className={`bg-white rounded-full`}>
            <svg viewBox="0 0 40 40" aria-hidden="true" fill="#f34f69" className={className}><path fillRule="evenodd" clipRule="evenodd" d="M20 40C31.0457 40 40 31.0449 40 20C40 8.95508 31.0457 0 20 0C8.95435 0 0 8.95508 0 20C0 31.0449 8.95435 40 20 40ZM19.2587 24.8496C23.8959 25.4316 28.1278 22.1465 28.7111 17.5078C29.2944 12.8711 26.0082 8.63867 21.371 8.05664C16.7339 7.47266 12.5018 10.7598 11.9186 15.3965C11.8684 15.7949 11.8468 16.1914 11.8525 16.5898L11.7244 30.2676C11.7222 30.5996 12.0128 30.9023 12.3424 30.9434H17.25C17.6517 30.9941 18.0029 30.6719 17.9873 30.2676L17.7908 25.0898C17.7803 24.8145 18.0465 24.6113 18.3148 24.6758C18.5322 24.7285 18.7532 24.7734 18.9775 24.8086L19.2587 24.8496ZM17.9625 15.2988L22.3359 13.1816C22.7366 12.9883 23.0323 13.4258 22.7621 13.8125L21.6823 15.3613C21.3961 15.7715 21.4967 16.3359 21.9071 16.623L22.7935 17.2402C23.0515 17.4199 22.954 17.8848 22.6239 18.0449L18.2504 20.1621C18.0419 20.2637 17.8617 20.1934 17.775 20.0488C17.6952 19.9141 17.6947 19.7168 17.8243 19.5312L18.9042 17.9824C19.1903 17.5723 19.0896 17.0078 18.6793 16.7207L17.793 16.1035C17.5352 15.9238 17.6327 15.459 17.9625 15.2988Z"></path></svg>
        </div>
    )
}

function AppleLogo({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="w-20 h-20 pulse bg-neutral-500" />

    return (
        <svg viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path fill={theme == "light" ? "#000" : "#FFF"} d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
        </svg>
    )
}

function StanfordLogo({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 162 248.022">
            <g>
                <path fill="#8c1515" d="m35.872 1.1236-34.558 33.832v90.907l30.041 30.665h13.776c-0.33541 0.92261-0.77516 2.3452 0.18119 3.7375 1.0401 1.5433 2.835 1.5433 3.5228 1.5433 0.80522 0 1.9291-0.10059 3.6571-0.33551h0.02027s0.72132 0.64079-1.4762 1.3621c-1.8117 0.63746-3.3919 1.6909-3.912 3.5025-0.03436 0.13399-0.04703 0.27196-0.08053 0.38918h-45.716l-0.013433 46.465 34.558 33.953h90.887l34.558-33.905v-87.077l-30.047-30.618h-25.478c-0.0172 0-0.0403-0.0134-0.0403-0.0134-1.1239-0.67099-2.2781-1.3789-3.3349-2.0667l-0.38917-0.24828-0.0671-0.04026c-0.57036-0.35214-1.1709-0.78508-1.8251-1.3554-0.57036-0.45294-1.0434-0.90584-1.3957-1.3085l-0.10066-0.10066c-0.67099-0.70459-1.2581-1.3789-1.7111-1.966 3.9756 1.1407 8.3071 1.4292 10.387 1.4963h0.24828c0.13399 0 0.27196 0.02027 0.38918 0.02027l0.18116 0.0134c0.50323 0.03436 0.88907 0.11712 1.1407 0.20129 0.26842 0.10049 0.5066 0.22159 0.72469 0.32208l1.0736 0.40261c0.25165 0.06699 0.52 0.08053 0.80522 0.08053 1.5601 0 3.0195-0.93941 3.6904-2.4156 0.21816-0.50327 0.5536-1.5064 0.30195-2.8316l45.442 0.03367v-50.76l-34.551-33.886h-90.887z" />
                <path fill="#fff" d="m157.19 36.804-32.1-31.487h-87.55l-32.108 31.436v87.382l27.628 28.182 17.815 0.0172c-1.9963 1.7949-2.6169 3.6569-2.9357 4.5628-0.68775 1.9962-1.4091 2.5665 4.8479 1.6943 1.9795-0.28515 5.5862-1.5601 7.2803-2.7008 1.6607-1.1407 4.9484-0.21816 4.6633 2.2479-1.5433 3.7743-5.502 6.1397-9.2768 6.6095-8.6893 1.0904-4.9317 4.3279-4.9317 4.3279 0.95619 0.65426 1.644 1.2917 2.1305 1.8621h-4.2273v-0.0172h-42.978l-0.017178 40.478 32.091 31.537h87.567l32.09-31.487v-83.539l-27.628-28.148h-22.327c-1.7781-1.1911-4.177-2.5163-6.3578-3.9421 0-0.01718 0-0.01718-0.0172-0.01718-0.83874-0.48647-1.6607-1.0903-2.4491-1.7781-0.65421-0.52001-1.2413-1.0736-1.7446-1.6272-1.9291-2.013-3.3717-4.1099-3.7576-5.0829-0.72133-1.7781-0.55355-4.026 1.0736-3.1034 4.1267 2.3821 10.904 2.835 13.42 2.9189 0.28515 0 2.3149 0.2349 2.8014 0.38564 0.50322 0.20141 1.2749 0.57034 1.2749 0.57034 1.0233 0.43614 2.8685-0.97294 0.73812-3.5731-0.55359-0.88907-1.3923-1.9124-2.3821-2.9524h47.354v-44.756" />
                <path d="m48.988 11.889l-37.05 36.297v104.79l31.537 32.17h29.607c5.053-2.22 6.123-2.03 7.527-4.86 0.21-0.45 0.418-1.75 0.44-3.02 0.063-0.36 0.693-4.18-1.153-3.25-3.166 1.59-9.562-2.61-14.343-0.11-4.781 2.47-1.279-3.27-0.608-4.26 0 0 2.558-3.37 6.416-5.6 0.147-0.08 0.273-0.16 0.377-0.25 0.378-0.21 0.756-0.39 1.155-0.58 2.935-1.37 11.3-6.94 12.81-8.68 0.902-1.01 2.496-3.32 2.559-4.6 0.272-1.11 0.483-2.87-0.586-3.56-1.594-1.05-2.874 1-5.369 2.12-2.496 1.11-4.383 1.57-6.606 1.65-2.138 0.07-4.193-0.75-5.472-0.56-1.28 0.21-2.035-0.76 0.314-3.13 1.069-1.07 1.532-1.55 2.035-1.91 5.578-3.58 10.589-3.62 13.399-9.98 0 0 2.181-5.7-2.034-3.27-2.306 1.34-3.564 3.27-10.17 3.27-6.584 0-9.164 3.13-10.275 4.49 0 0-4.486 6.27-3.375-2.52 1.133-8.76 2.83-13.23 6.961-16.65 3.564-2.93 12.412-6.87 15.6-11.21 1.635-1.62 5.746-6.32 3.355-10.299-1.007-1.678-3.459 2.669-5.996 3.229-2.894 0.76-6.563 1.7-9.373 1.13-3.481-0.69-5.704 0.63-7.004 1.22s-3.754-1.28-0.756-4.698c4.026-4.592 13.757-10.588 20.299-14.174 0.902-0.378 3.102-1.342 5.115-2.621 0.042-0.022 0.084-0.043 0.106-0.043 0.503-0.231 1.237-0.672 1.656-1.238 1.426-1.196 2.412-2.536 2.076-3.899-0.293-1.237-0.903-1.657-2.832-1.867-1.53-0.147-4.066 1.636-6.205 1.469-3.271-0.273-8.074 0.481-6.48-1.846 1.488-2.16 3.899-3.545 4.591-3.922 1.342-0.608 3.146-1.404 5.809-2.6 4.173-1.887 3.585-6.625 1.971-6.792-2.517-0.273-9.31 1.906-4.53-3.545 0 0 2.266-2.285 4.551-3.774 1.803-1.048 3.292-1.447 5.074-2.098 1.112-0.398 4.028-2.977-2.892-3.25 0 0-3.859 0.105-3.125-1.677 0.608-1.174 4.006-3.313 4.006-3.313s2.724-1.867 3.836-2.978c1.069-1.028 1.824-1.845 1.761-2.768-0.042-1.048-2.768-2.348-3.922-3.816-0.817-1.049-0.125-1.425 0.336-1.551 0.252-0.041 0.546-0.084 0.903-0.084 2.809 0.021 3.606-2.789 5.246-10.086 0.48-2.181 0.52-2.641 1.23-2.662 0.07 0 0.11 0.021 0.15 0.021 0 0 0.69 3.69 1.7 7.821 0.86 2.285 1.8 3.25 3.46 3.228 0.33 0 0.63 0.041 0.88 0.084 0.46 0.126 1.17 0.505 0.33 1.553-0.63 0.818-2.51 2.139-2.66 2.936-0.54 2.264 1.62 3.082 3.82 3.25 3.12 0.209 1.82 2.159-1.55 4.654-3.25 2.411 5.07 7.57 5.07 7.57 4.74 3.67 1.36 4.612 0.4 5.137-0.97 0.503-3.63 2.139-0.97 3.187 2.69 1.028 6.38 4.739 6.38 4.739 4.76 5.451-2.02 3.293-4.53 3.545-1.62 0.167-2.2 4.926 1.97 6.793 6.35 2.872 7.76 3.355 10 5.033 4.19 3.103 1.97 5.745-3.27 4.822 0 0-3.35-0.838-5.7-0.377-1.47 0.273-2.48 0.608-3.17 0.965-0.36 0.545-1.19 2.704 6.1 4.947 3.48 1.09 7.8 3.713 11.64 6.711l59.81-0.062-0.01-48.457-37.05-36.338h-105.3zm90.312 118.05c1.72 2.85 2.72 6.58 3.46 12.06 0.02 3.29-4.32 1.69-5.73 0.83-0.98-0.67-2.28-1.29-3.96-1.69-3.17-0.76-10.71-4.07-12.77-4.81-2.1-0.77-3.63 0.78-3.88 1.37h0.02c-0.54 1 0.57 3.02 0.57 3.02 2.96 6.71 8.41 6.35 14.4 10.65 8.24 5.87 3.84 7.11 2.14 6.23-1.67-0.9-4.44-0.34-4.44-0.34-6.65 1.83-8.64-0.94-12.54-1.97-3.88-1.05-0.69 3.78 0.71 5.39 1.49 1.74 9.88 7.32 12.79 8.68 6.36 2.96 9.67 7.76 11.64 13.86 1.87 5.77-0.17 4.51-1.68 3.8-1.51-0.72-1.95-2.27-5.7-2.18-3.77 0.08-5.89-0.19-8.58-2.31-0.71-0.55-1.28-1.18-1.76-1.7-0.04-0.02-0.06-0.04-0.08-0.06-2.58-1.97-2.08 4.57-1.55 5.64 1.86 3.75 3.12 2.22 13.86 7.95 5.09 2.72 6.29 6.37 6.83 7.9 0.86 2.48 1.74 3.19-6.06 2.1-2.49-0.34-6.98-1.93-9.12-3.38-2.05-1.42-6.18-0.27-5.81 2.81 1.93 4.72 6.88 7.68 11.6 8.26 4.13 0.53 6 1.43 6.75 2.35 2.26 2.58-1.93 6.36-1.93 6.36-2.1 2.43 0.17 5.28 1.72 6.12 2.52 1.28 7.4 4.21 9.02 8.41 8.47 21.8 0.27 15.55-3.74 13.06-4.02-2.5-11.68-8.91-18.66-8.35-6.98 0.55-9.31 0.93-13.46-2.37-4.13-3.29-3.73 2.04-3.73 2.04v26.29c0.25 5.89 1.34 11.51 6.02 16.27 3.83 3.93 6.75 3.19 12.16 9.8 2.49 3.04 10.63 6.31 16.06 6.37l10.42 0.02 37.05-36.34v-100.04l-31.51-32.1h-20.53zm-127.34 88.97l-0.021 43.09 37.05 36.36h11.91c11.198-0.55 15.391-9.23 18.788-14.57 2.558-4.05 7.088-7.49 9.961-10.43 3.04-3.08 3.586-10.13 3.669-17.76v-15.93l0.022 0.16v-3.81h0.021v-2.54h0.002v-0.59-6.87c0-1.6-1.845-1.72-5.871 2.64-4.047 4.34-10.819 3.98-14.74 4.34-3.921 0.35-15.202 6.23-18.432 10.44-1.992 2.62-4.823 0.46-3.67-4.7h-0.042c0.545-2.32 1.551-5.45 3.166-9.58 2.222-5.76 10.568-9.14 10.568-9.14s0.86-0.38 1.615-1.11h-53.996z" transform="matrix(.80001 0 0 .80001 -.00065308 0)" fill="#8c1515" />
            </g>
        </svg>

    )
}

type ExperienceProps = {
    href: string;
    logo: React.ReactElement,
    company: string,
    role: string,
    start: string,
    end: string,
    desc?: string,
}

function Experience({ href, logo, company, role, start, end, desc = "" }: ExperienceProps) {
    const mobile = useMobile();
    return <div className="p-2 md:p-4 flex items-center flex-col md:flex-row gap-4 md:gap-8">
        <Link href={href}>
            <motion.div whileHover={{ rotate: 5 }}>
                {logo}
            </motion.div>
        </Link>
        <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl md:text-2xl font-bold">{company}</h3>
            <div className="flex flex-col md:flex-row text-neutral-500 font-bold text-sm items-center my-4 md:my-0">
                <div>{role}</div>
                {!mobile && <div>&nbsp;|&nbsp;</div>}
                <div>{start} &rarr; {end}</div>
            </div>
            <div className="text-center md:text-left">{desc}</div>
        </div>
    </div >
}

export default function Resume() {
    return (
        <>
            <Title color="gold" id="portfolio">
                Resume
            </Title>
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <div className="w-full grid grid-cols-1 items-center gap-10 relative">
                <Experience href="https://joinperform.com/" logo={<PerformLogo className="w-20 h-20" />} company="Perform Inc." role="Software Contractor" start="September 2022" end="November 2022" desc="Modeling training plans as a constraint satisfaction problem using Google's ORTools to easily onboard hundreds of new customers." />
                <Experience href="https://www.apple.com/" logo={<AppleLogo className="w-20 h-20" />} company="Apple" role="Software Intern" start="June 2022" end="September 2022" desc="Protoyping new features using Nearby Interaction ultra-wideband API alongside Swift mobile app development." />
            </div>
            <h2 className="text-xl font-semibold my-4">Education</h2>
            <div className="w-full grid grid-cols-1 items-center gap-10 relative">
                <Experience href="https://www.stanford.edu/" logo={<StanfordLogo className="w-20 h-20" />} company="Stanford University" role="Computer Science" start="September 2019" end="June 2024" desc="Advised by Jerry Cain focusing on systems development and also attaining a minor in electrical engineering." />
            </div>
            <h2 className="text-xl font-semibold my-4">References</h2>
            <div className="w-full grid grid-cols-1 items-center gap-10 relative">
                <Experience href="https://profiles.stanford.edu/gerald-cain/" logo={<Image src="/images/resume/jerry.jpg" alt="Jerry Cain" width={80} height={80} className="rounded-xl" />} company="Jerry Cain" role="Senior Lecturer" start="jerry@cs.stanford.edu" end="(415) 205 2242" desc="Stanford faculty advisor. Ex-Facebook Senior Employee and senior lecturer for systems classes at Stanford." />
                <Experience href="https://www.linkedin.com/in/alexscammon/" logo={<Image src="/images/resume/alexscammon.jpg" alt="Alex Scammon" width={80} height={80} className="rounded-xl" />} company="Alex Scammon" role="Head of Open Source Development" start="alexscammon@gmail.com" end="" desc="Worked under Alex as an studio engineer at Soul Graffiti studios in Oakland. Worked together on improvements." />
            </div>
        </>
    );
}

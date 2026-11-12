'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tag: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    title: 'Data Center Infrastructure & Operations',
    description:
      'Mission-critical server management, optical fiber cabling, and 24/7 high-availability operations at AzInTelecom Tier III Data Center.',
    tag: 'AZINTELECOM · TIER III',
  },
  {
    number: '02',
    title: 'Full-Stack Web & 3D WebGL Experiences',
    description:
      'High-performance web applications, luxury e-commerce storefronts, and GPU physics simulations built with Next.js, Three.js, and React.',
    tag: 'NEXT.JS · WEBGL · THREE.JS',
  },
  {
    number: '03',
    title: 'Explainable AI & Machine Learning Research',
    description:
      'Transparent machine learning systems, credit risk evaluation models, and local feature attribution utilizing TreeSHAP and LIME.',
    tag: 'SHAP · LIME · IEEE RESEARCH',
  },
  {
    number: '04',
    title: 'Cloud Systems, Automation & DevOps',
    description:
      'Production deployment pipelines, containerized environments, and autonomous agentic workflows designed for resilience and velocity.',
    tag: 'DOCKER · CI/CD · CLOUD',
  },
];

export default function CoreDisciplines() {
  return (
    <section
      id="services"
      aria-label="Services Section"
      className="relative z-10 w-full rounded-t-[50px] md:rounded-t-[70px] bg-white text-neutral-900 py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-28 shadow-2xl transition-all"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-10">
          <div>
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
              WHAT I DO
            </span>
            <h2 className="mt-2 font-kanit font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl text-neutral-950">
              SERVICES
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
            Delivering robust engineering across physical data centers, modern web products, and cutting-edge machine learning.
          </p>
        </div>

        {/* Minimalist Rows */}
        <div className="flex flex-col">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.number}
              className="group border-b border-neutral-200 py-10 md:py-14 transition-colors duration-300 hover:bg-neutral-50/80 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Numeral */}
              <div className="flex items-center gap-6 md:w-1/4">
                <span className="font-kanit font-black text-4xl sm:text-5xl md:text-6xl text-neutral-300 transition-colors duration-300 group-hover:text-neutral-950">
                  {service.number}
                </span>
                <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                  {service.tag}
                </span>
              </div>

              {/* Center Content */}
              <div className="md:w-3/5">
                <h3 className="font-kanit font-bold text-2xl sm:text-3xl text-neutral-950 transition-colors duration-300 group-hover:text-cyan-600">
                  {service.title}
                </h3>
                <p className="mt-2 font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right Action Arrow */}
              <div className="md:w-auto flex justify-end">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-all duration-300 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white group-hover:scale-110">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

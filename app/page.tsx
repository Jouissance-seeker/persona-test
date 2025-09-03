'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Likert } from './_components/Likert';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const data = [
  'شما مرتب دوستان جدیدی پیدا می‌کنید.',
  'شما از تنهایی لذت می‌برید.',
  'شما به راحتی با دیگران ارتباط برقرار می‌کنید.',
  'شما ترجیح می‌دهید در گروه‌های کوچک باشید.',
  'شما انرژی خود را از تعامل با دیگران دریافت می‌کنید.',
  'شما مرتب دوستان جدیدی پیدا می‌کنید.',
  'شما از تنهایی لذت می‌برید.',
  'شما به راحتی با دیگران ارتباط برقرار می‌کنید.',
  'شما ترجیح می‌دهید در گروه‌های کوچک باشید.',
  'شما انرژی خود را از تعامل با دیگران دریافت می‌کنید.',
];

export default function Home() {
  const swiperRef = useRef<SwiperType>(null);

  const handleAnswer = (_value: number) => {
    setTimeout(() => {
      if (
        swiperRef.current &&
        swiperRef.current.activeIndex < data.length - 1
      ) {
        swiperRef.current.slideNext();
      }
    }, 500);
  };

  return (
    <main className="flex w-full flex-col gap-8 py-5">
      <Swiper
        direction="vertical"
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={30}
        allowTouchMove={false} // کاربر نمی‌تواند درگ کند
        mousewheel={false} // اسکرول موس غیر فعال
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSetTranslate={(swiper) => {
          swiper.slides.forEach((slideEl) => {
            const progress = (slideEl as any).progress;
            const scale = 1 - Math.min(Math.abs(progress) * 0.3, 0.6);
            const blur = Math.min(Math.abs(progress) * 6, 15);
            const el = slideEl.querySelector('._slide-inner') as HTMLElement;
            if (el) {
              el.style.transform = `scale(${scale})`;
              el.style.filter = `blur(${blur}px)`;
              el.style.transition = 'transform 0.3s, filter 0.3s';
            }
          });
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex h-64 w-auto items-center justify-center"
          >
            <div className="_slide-inner flex h-full w-full items-center justify-center px-4">
              <Likert text={item} onChange={handleAnswer} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

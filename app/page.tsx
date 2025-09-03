import { Likert } from './_components/Likert';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تست شخصیت شناسی شینودا بولن',
  description: 'طراحی و توسعه توسط حمید شاهسونی',
};

export default function Home() {
  return (
    <main className="w-full px-6 py-10">
      <h1 className="mb-8 text-center text-2xl font-bold">
        شما مرتب دوستان جدیدی پیدا می‌کنید.
      </h1>
      <div className="flex w-full justify-center">
        <Likert />
      </div>
    </main>
  );
}

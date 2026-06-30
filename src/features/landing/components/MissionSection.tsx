import flowIconUrl from '../../../assets/icon/flow.svg';
import rigorIconUrl from '../../../assets/icon/rigor.svg';
import communityIconUrl from '../../../assets/icon/community.svg';

export function MissionSection() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
          Our Mission
        </h2>
        <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-primary-500"></div>
        <p className="mt-6 text-lg leading-relaxed text-neutral-700">
          We believe learning to code shouldn't be a chore. Our mission is to
          transform technical education into a high-engagement experience that
          mirrors the flow state of your favorite video games, ensuring
          knowledge sticks and skills grow.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Cognitive Flow */}
        <div className="flex flex-col items-start rounded-[24px] bg-shade-white p-8 text-left shadow-sm border border-neutral-100 transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
            <img
              src={flowIconUrl}
              alt="Flow Icon"
              className="h-6 w-6 object-contain"
            />
          </div>
          <h3 className="mb-3 text-xl font-bold text-neutral-900">
            Cognitive Flow
          </h3>
          <p className="text-sm leading-relaxed text-neutral-700">
            Designed to keep you in the perfect balance of challenge and
            achievement.
          </p>
        </div>

        {/*Professional Rigor */}
        <div className="flex flex-col items-start rounded-[24px] bg-shade-white p-8 text-left shadow-sm border border-neutral-100 transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
            <img
              src={rigorIconUrl}
              alt="Rigor Icon"
              className="h-6 w-6 object-contain"
            />
          </div>
          <h3 className="mb-3 text-xl font-bold text-neutral-900">
            Professional Rigor
          </h3>
          <p className="text-sm leading-relaxed text-neutral-700">
            We teach real-world syntax and best practices used by world-class
            engineers.
          </p>
        </div>

        {/* Community Driven */}
        <div className="flex flex-col items-start rounded-[24px] bg-shade-white p-8 text-left shadow-sm border border-neutral-100 transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
            <img
              src={communityIconUrl}
              alt="Community Icon"
              className="h-6 w-6 object-contain"
            />
          </div>
          <h3 className="mb-3 text-xl font-bold text-neutral-900">
            Community Driven
          </h3>
          <p className="text-sm leading-relaxed text-neutral-700">
            Connect with a global cohort of learners who push you to be your
            best self.
          </p>
        </div>
      </div>
    </section>
  );
}

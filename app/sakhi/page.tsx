import type { Metadata } from 'next'
import siteData, { getSakhi } from '@/lib/data'
import PaithaniBand from '@/components/sakhi/PaithaniBand'
import SakhiRegisterButton from '@/components/sakhi/SakhiRegisterButton'
import ShareButton from '@/components/sakhi/ShareButton'
import DistanceCard from '@/components/sakhi/DistanceCard'
import RunnerPhotos from '@/components/sakhi/RunnerPhotos'
import SakhiJsonLd from '@/components/sakhi/SakhiJsonLd'
import { container, rise, Marathi, HeroMarathi } from '@/components/sakhi/shared'

const { site, seo } = siteData
const page = seo.pages.sakhi
const sakhi = getSakhi()
const pageUrl = `https://${site.domain}${sakhi.path}`

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    url: pageUrl,
    title: page.openGraph?.title ?? page.title,
    description: page.openGraph?.description ?? page.description,
  },
  twitter: {
    title: page.openGraph?.title ?? page.title,
    description: page.openGraph?.description ?? page.description,
  },
}

const formatInr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export default function SakhiPage() {
  const { hero, distances, prizes, keyDates } = sakhi

  return (
    <main className="flex-1 text-white">
      <SakhiJsonLd />
      {/* ── Hero (teal); pt-[82px] clears the fixed header and its strip ───── */}
      <section className="bg-sakhi pt-[82px]">
        <div className={container}>
          <div className="grid gap-x-6 pb-11 pt-10 md:pt-16 lg:grid-cols-12 lg:items-end lg:pb-[72px]">
            {/* Centred on phones; the left column aligns left from lg up. */}
            <div className="flex flex-col items-center gap-3.5 text-center lg:col-span-7 lg:items-start lg:text-left">
              <p
                className="sakhi-rise text-lg font-semibold leading-snug text-sakhi-cream md:text-xl"
                style={rise(0)}
              >
                <HeroMarathi>{hero.kicker}</HeroMarathi>
              </p>
              <h1
                className="sakhi-rise whitespace-nowrap font-sakhi-display text-[52px] font-normal leading-none md:text-8xl"
                style={rise(1)}
              >
                <span className="block">{hero.title.line1}</span>{' '}
                <em>{hero.title.emphasis}</em> {hero.title.rest}
              </h1>
              <p
                className="sakhi-rise max-w-[560px] text-[17px] leading-relaxed text-sakhi-cream md:text-xl"
                style={rise(2)}
              >
                {hero.intro}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3.5 text-center lg:col-span-5 lg:col-start-8 lg:mt-0 lg:pb-2">
              <div className="sakhi-rise flex flex-col gap-0.5" style={rise(4)}>
                <p className="text-[19px] font-bold lg:text-[22px]">{hero.date}</p>
                <p className="text-[17px] font-semibold text-sakhi-cream lg:text-lg">
                  <HeroMarathi>{hero.dateMr}</HeroMarathi>
                </p>
              </div>
              <p className="hidden text-base text-sakhi-cream lg:block">{hero.summary}</p>
              <div
                className="sakhi-rise mt-2 flex w-full flex-col items-center gap-2.5"
                style={rise(5)}
              >
                <SakhiRegisterButton
                  registrationUrl={sakhi.registrationUrl}
                  label={hero.cta.label}
                  labelMr={hero.cta.labelMr}
                  closedLabel={sakhi.registrationClosedLabel}
                  location="sakhi_hero"
                />
                <p className="text-center text-sm text-sakhi-cream">{hero.earlyBirdNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PaithaniBand tone="teal" next="white" id="band-hero" />

      {/* ── Distances (white, styled like the main site's "Choose Your Challenge") ── */}
      <section id="categories" className="scroll-mt-24 bg-white">
        <div className={`${container} py-14 lg:py-24`}>
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="text-4xl font-black text-balance text-zinc-900 sm:text-5xl">
              {distances.heading}
            </h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-2 sm:gap-6">
            {distances.items.map((d) => (
              <DistanceCard
                key={d.id}
                distance={d}
                ageGroups={distances.ageGroupsShort}
                deadline={distances.earlyBirdDeadline}
                earlyBirdLabel={distances.earlyBirdLabel}
                regularLabel={distances.regularLabel}
                registrationUrl={sakhi.registrationUrl}
              />
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-1.5 text-center">
            <p className="text-base font-bold text-zinc-900">{distances.ageGroups}</p>
            <p className="text-base text-zinc-600">
              <Marathi>{distances.ageGroupsMr}</Marathi>
            </p>
          </div>
        </div>
      </section>
      <PaithaniBand tone="white" next="black" id="band-distances" />

      {/* ── Bring your sakhi (black): women of the club, then the invitation ── */}
      <section className="bg-[#0a0a0a] pt-11 lg:pt-[72px]">
        <RunnerPhotos photos={sakhi.sakhi.photos} label={sakhi.sakhi.photosLabel} />
        <div className={`${container} grid gap-3.5 py-11 lg:grid-cols-12 lg:gap-x-6 lg:py-[72px]`}>
          <div className="flex flex-col gap-1 text-center lg:col-span-5 lg:text-left">
            <h2 className="font-sakhi-display text-4xl font-normal leading-tight lg:text-5xl">
              {sakhi.sakhi.heading}{' '}
              <em className="text-sakhi-gold">{sakhi.sakhi.headingEmphasis}</em>
            </h2>
            <p className="text-lg text-zinc-300 lg:text-xl">
              <Marathi>{sakhi.sakhi.headingMr}</Marathi>
            </p>
          </div>
          <div className="flex flex-col items-center gap-5 text-center lg:col-span-6 lg:col-start-7 lg:items-start lg:text-left">
            <p className="text-base leading-relaxed text-zinc-300 lg:text-lg">{sakhi.sakhi.body}</p>
            <ShareButton
              label={sakhi.sakhi.shareLabel}
              text={sakhi.sakhi.shareText}
              url={pageUrl}
            />
          </div>
        </div>
      </section>
      <PaithaniBand tone="black" next="white" id="band-sakhi" />

      {/* ── Prizes (white) ───────────────────────────────── */}
      <section id="prizes" className="scroll-mt-24 bg-white text-sakhi-night">
        <div
          className={`${container} grid gap-[18px] py-11 lg:grid-cols-12 lg:gap-x-6 lg:py-[72px]`}
        >
          <div className="flex flex-col gap-1 text-center lg:col-span-5 lg:text-left">
            <h2 className="font-sakhi-display text-[38px] font-normal leading-tight lg:text-5xl">
              <span className="text-sakhi">{prizes.total}</span>
              <br />
              {prizes.headingRest}
            </h2>
            <p className="text-lg text-sakhi-muted">
              <Marathi>{prizes.headingMr}</Marathi>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-sakhi-muted">{prizes.intro}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <table className="w-full border-collapse text-base">
              <thead>
                <tr className="border-b-2 border-sakhi-night text-[13px] font-semibold text-sakhi-muted">
                  <th scope="col" className="py-2.5 text-left font-semibold">
                    {prizes.columns.place}
                  </th>
                  <th scope="col" className="py-2.5 text-right font-semibold">
                    <span className="block text-sakhi-night">{prizes.columns.first}</span>
                    <span className="block text-xs font-normal">{distances.ageGroupsShort}</span>
                  </th>
                  <th scope="col" className="py-2.5 text-right font-semibold">
                    <span className="block text-sakhi-night">{prizes.columns.second}</span>
                    <span className="block text-xs font-normal">{distances.ageGroupsShort}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {prizes.rows.map((row, i) => (
                  <tr key={row.place} className="border-b border-sakhi-rule last:border-b-0">
                    <th
                      scope="row"
                      className="py-3 text-left font-sakhi-display text-[22px] font-normal text-sakhi"
                    >
                      {row.place}
                    </th>
                    <td className={`text-right ${i === 0 ? 'font-bold' : ''}`}>
                      {formatInr(row.first)}
                    </td>
                    <td className={`text-right ${i === 0 ? 'font-bold' : ''}`}>
                      {formatInr(row.second)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <PaithaniBand tone="white" next="teal" id="band-prizes" />

      {/* ── Key dates (teal) ─────────────────────────────── */}
      <section id="key-dates" className="scroll-mt-24 bg-sakhi">
        <div className={`${container} flex flex-col gap-5 py-11 lg:py-[72px]`}>
          <div className="flex flex-col items-center gap-0.5 md:flex-row md:items-baseline md:gap-5">
            <h2 className="font-sakhi-display text-4xl font-normal lg:text-5xl">
              {keyDates.heading}
            </h2>
            <p className="text-lg text-sakhi-cream lg:text-xl">
              <Marathi>{keyDates.headingMr}</Marathi>
            </p>
          </div>
          <ul className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-16">
            {keyDates.items.map((item) => (
              <li
                key={item.date}
                className="flex flex-col items-center gap-0.5 md:items-start md:gap-1"
              >
                <span className="whitespace-nowrap font-sakhi-display text-[28px] lg:text-4xl">
                  {item.date}
                </span>
                <span className="text-base">{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 border-t border-white/30 pt-5 text-center text-[15px] leading-relaxed text-sakhi-cream md:text-left">
            {keyDates.tba} <Marathi>{keyDates.tbaMr}</Marathi>
          </p>
        </div>
      </section>
      <PaithaniBand tone="teal" next="black" id="band-dates" />
    </main>
  )
}

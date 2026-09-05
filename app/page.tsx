import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { AboutHospital } from '@/components/about-hospital'
import { AboutDoctor } from '@/components/about-doctor'
import { CommunityOutreach } from '@/components/community-outreach'
import { Services } from '@/components/services'
import { VideoShowcase } from '@/components/video-showcase'
import { Technology } from '@/components/technology'
import { Gallery } from '@/components/gallery'
import { MediaGallery } from '@/components/media-gallery'
import { Testimonials } from '@/components/testimonials'
import { Appointment } from '@/components/appointment'
import { SiteFooter } from '@/components/site-footer'
import { AppointmentModal } from '@/components/appointment-modal'
import { getHomepage } from '@/sanity/lib/homepage'
import { JsonLd } from '@/components/json-ld'
import { medicalClinicSchema, physicianSchema, breadcrumbSchema } from '@/lib/structured-data'
import { CLINIC } from '@/lib/clinic'
import { DOCTORS } from '@/lib/doctors'

// Keep the deployed Vercel site in sync with published Sanity content.
export const dynamic = 'force-dynamic'

export default async function Page() {
  const content = await getHomepage()
  const doctors = content?.team?.members?.length
    ? content.team.members.map((member, index) => ({
        name: member.name ?? DOCTORS[index % DOCTORS.length].name,
        role: member.role,
        qualifications: member.qualifications,
        slug: DOCTORS[index % DOCTORS.length].slug,
      }))
    : DOCTORS
  return (
    <>
      <JsonLd
        data={[
          medicalClinicSchema(),
          ...doctors.map((doctor) => physicianSchema(doctor)),
          breadcrumbSchema([{ name: 'Home', url: CLINIC.url }]),
        ]}
      />
      <SiteHeader />
      <main>
        <Hero content={content?.hero} />
        <AboutHospital content={content?.about} />
        <AboutDoctor content={content?.team} />
        <CommunityOutreach content={content?.community} />
        <Services content={content?.services} />
        <VideoShowcase content={content?.videos} />
        <Technology content={content?.technology} />
        <Gallery content={content?.gallery} />
        <MediaGallery content={content?.media} />
        <Testimonials content={content?.testimonials} />
        <Appointment content={content?.contact} />
      </main>
      <SiteFooter content={content?.footer} />
      <AppointmentModal />
    </>
  )
}

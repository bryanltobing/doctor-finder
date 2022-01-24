import { useMemo } from 'react'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { HiShieldCheck } from 'react-icons/hi'

import DoctorCard from 'components/Cards/DoctorCard'

import { DoctorListType } from 'types/swr'
import { fetcher } from 'lib/helpers'
import DoctorFilterSection from 'components/Sections/HomePage/DoctorFilterSection'

type HomePageProps = {
  fallback: {
    [key: string]: DoctorListType
  }
}

const HomePage: NextPage<HomePageProps> = (props) => {
  const router = useRouter()
  const search = router.query.search as string
  const hospitalName = router.query.hospitalName as string
  const specializationName = router.query.specializationName as string

  const { data } = useSWR<DoctorListType>(
    '/c9a2b598-9c93-4999-bd04-0194839ef2dc',
    {
      fallback: props.fallback,
    }
  )

  const doctors = useMemo(() => data?.data || [], [data?.data])

  return (
    <div>
      <header className="bg-gradient-to-r from-primary-500 py-8 to-primary-50">
        <div className="layout">
          <h1 className="flex gap-2 items-center text-white w-full sm:gap-4">
            Doctor Finder <HiShieldCheck />
          </h1>
          <DoctorFilterSection doctors={doctors} />
        </div>
      </header>

      <section className="py-8">
        <div className="layout">
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2">
            {doctors.map((doctor) => {
              if (
                search &&
                !doctor.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return null
              }

              if (hospitalName && hospitalName !== doctor.hospital?.[0].name) {
                return null
              }

              if (
                specializationName &&
                specializationName !== doctor.specialization.name
              ) {
                return null
              }

              return <DoctorCard doctor={doctor} key={doctor.doctor_id} />
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export const getStaticProps = async () => {
  const doctorList = await fetcher('/c9a2b598-9c93-4999-bd04-0194839ef2dc')

  return {
    props: {
      fallback: {
        '/c9a2b598-9c93-4999-bd04-0194839ef2dc': doctorList,
      },
    },
  }
}

export default HomePage

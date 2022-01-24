import { useMemo } from 'react'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { HiSearch, HiShieldCheck, HiArrowCircleDown } from 'react-icons/hi'

import DoctorCard from 'components/Cards/DoctorCard'
import Button from 'components/_base/Button'
import Select from 'components/_base/Select'

import { DoctorListType } from 'types/swr'
import { fetcher } from 'lib/helpers'

type HomePageProps = {
  fallback: {
    [key: string]: DoctorListType
  }
}

const HomePage: NextPage<HomePageProps> = (props) => {
  const { data } = useSWR<DoctorListType>(
    '/c9a2b598-9c93-4999-bd04-0194839ef2dc',
    {
      fallback: props.fallback,
    }
  )

  const doctors = useMemo(() => data?.data || [], [])

  return (
    <div>
      <section className="py-8 bg-primary-500">
        <div className="layout">
          <h1 className="flex gap-2 items-center w-full text-white sm:gap-4">
            Doctor Finder <HiShieldCheck />
          </h1>
          <div className="mt-8 space-y-4">
            <div className="flex overflow-hidden items-center bg-white rounded-md">
              <div className="text-muted py-2 pl-4 text-xl">
                <HiSearch />
              </div>
              <input
                className="px-4 w-full bg-transparent border-none"
                type="search"
                placeholder="Type to search..."
              />
              <Button
                variant="secondary"
                className="gap-2 rounded-l-none border-none"
              >
                <HiSearch /> Cari
              </Button>
            </div>
            <div className="flex flex-col gap-4 mx-auto sm:flex-row">
              <div className="relative w-full">
                <HiArrowCircleDown className="absolute right-4 top-1/2 bottom-1/2 z-50 text-secondary-500 -translate-y-1/2" />
                <Select
                  className="text-muted"
                  placeholder="Hospital"
                  options={[
                    ...new Set(
                      doctors.map((doctor) => doctor.hospital?.[0].name) || []
                    ),
                  ].map((hospitalName) => ({
                    label: hospitalName,
                    value: hospitalName,
                  }))}
                />
              </div>
              <div className="relative w-full">
                <HiArrowCircleDown className="absolute right-4 top-1/2 bottom-1/2 z-50 text-secondary-500 -translate-y-1/2" />
                <Select
                  className="text-muted"
                  placeholder="Specialization"
                  options={[
                    ...new Set(
                      doctors.map((doctor) => doctor.specialization.name) || []
                    ),
                  ].map((specializationName) => ({
                    label: specializationName,
                    value: specializationName,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="layout">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {doctors.map((doctor) => {
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

import { useMemo } from 'react'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { HiSearch, HiShieldCheck, HiArrowCircleDown } from 'react-icons/hi'
import qs from 'querystringify'

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
          <div className="mt-8 space-y-4">
            <div className="bg-white flex items-center overflow-hidden rounded-md">
              <div className="pl-4 py-2 text-muted text-xl">
                <HiSearch />
              </div>
              <input
                className="bg-transparent border-none px-4 w-full"
                type="search"
                placeholder="Type to search..."
                onChange={(evt) => {
                  const inputValue = evt.target.value

                  router.push(
                    `/?${qs.stringify({
                      ...router.query,
                      search: inputValue,
                    })}`,
                    undefined,
                    { shallow: true }
                  )
                }}
              />
              <Button
                variant="secondary"
                className="border-none gap-2 rounded-l-none"
              >
                <HiSearch /> Cari
              </Button>
            </div>
            <div className="flex flex-col gap-4 mx-auto sm:flex-row">
              <div className="relative w-full">
                <HiArrowCircleDown className="-translate-y-1/2 absolute bottom-1/2 right-4 text-secondary-500 top-1/2 z-50" />
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
                  onChange={(evt) => {
                    const selectValue = evt.target.value

                    router.push(
                      `/?${qs.stringify({
                        ...router.query,
                        hospitalName: selectValue,
                      })}`,
                      undefined,
                      { shallow: true }
                    )
                  }}
                />
              </div>
              <div className="relative w-full">
                <HiArrowCircleDown className="-translate-y-1/2 absolute bottom-1/2 right-4 text-secondary-500 top-1/2 z-50" />
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
                  onChange={(evt) => {
                    const selectValue = evt.target.value

                    router.push(
                      `/?${qs.stringify({
                        ...router.query,
                        specializationName: selectValue,
                      })}`,
                      undefined,
                      { shallow: true }
                    )
                  }}
                />
              </div>
            </div>
          </div>
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

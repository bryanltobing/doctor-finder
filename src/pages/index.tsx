import type { NextPage } from 'next'
import useSWR from 'swr'
import { HiSearch } from 'react-icons/hi'

import DoctorCard from 'components/Cards/DoctorCard'

import { DoctorListType } from 'types/swr'
import { fetcher } from 'lib/helpers'
import Button from 'components/_base/Button'

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

  return (
    <div className="space-y-8">
      <section className="bg-primary-500 py-8">
        <div className="layout">
          <h1 className="text-white">Doctor Finder</h1>
          <div className="mt-8 space-y-4">
            <div className="bg-white flex items-center overflow-hidden rounded-md">
              <div className="pl-4 py-2 text-muted text-xl">
                <HiSearch />
              </div>
              <input
                className="bg-transparent border-none px-4 w-full"
                type="search"
                placeholder="Type to search..."
              />
              <Button
                variant="secondary"
                className="border-none gap-2 rounded-l-none"
              >
                <HiSearch /> Cari
              </Button>
            </div>
            <div className="flex flex-col gap-4 mx-auto sm:flex-row">
              <select className="border focus:outline-none focus:ring-2 focus:ring-secondary px-4 py-2 rounded-md w-full">
                <option>Hospital</option>
              </select>
              <select className="border focus:outline-none focus:ring-2 focus:ring-secondary px-4 py-2 rounded-md w-full">
                <option>Specialization</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="layout">
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2">
            {data?.data.map((doctor) => {
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

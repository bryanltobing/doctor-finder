import type { NextPage } from 'next'
import useSWR from 'swr'

import DoctorCard from 'components/Cards/DoctorCard'

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

  return (
    <div className="space-y-8">
      <section className="bg-transparent py-8">
        <div className="layout">
          <h1 className="text-primary text-center">Doctor Finder</h1>
          <div className="space-y-4 mt-8">
            <div className="max-w-xl mx-auto">
              <input
                className="w-full border border-muted rounded-lg px-4 py-2 focus:ring-secondary focus:ring-2 focus:outline-none shadow-muted shadow-sm"
                type="search"
                placeholder="Type to search..."
              />
            </div>
            <div className="flex gap-4 max-w-xl mx-auto flex-col sm:flex-row">
              <select className="w-full border border-muted rounded-lg px-4 py-2 focus:ring-secondary focus:ring-2 focus:outline-none shadow-muted shadow-sm">
                <option>Hospital</option>
              </select>
              <select className="w-full border border-muted rounded-lg px-4 py-2 focus:ring-secondary focus:ring-2 focus:outline-none shadow-muted shadow-sm">
                <option>Specialization</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="layout">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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

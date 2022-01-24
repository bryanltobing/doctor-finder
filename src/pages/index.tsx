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
      <section className="bg-primary / py-8">
        <div className="layout">
          <h1 className="text-white">Doctor Finder</h1>
          <div className="mt-8 space-y-4">
            <div className="flex overflow-hidden bg-white rounded-md">
              <div>
                <img src="/static/icons/search.svg" />
              </div>
              <input
                className="focus:outline-none focus:ring-2 focus:ring-secondary shadow-muted / px-4 py-2 w-full bg-transparent border shadow-sm"
                type="search"
                placeholder="Type to search..."
              />
            </div>
            <div className="flex flex-col gap-4 mx-auto sm:flex-row">
              <select className="focus:outline-none focus:ring-2 focus:ring-secondary shadow-muted / px-4 py-2 w-full rounded-md border shadow-sm">
                <option>Hospital</option>
              </select>
              <select className="focus:outline-none focus:ring-2 focus:ring-secondary shadow-muted / px-4 py-2 w-full rounded-md border shadow-sm">
                <option>Specialization</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="layout">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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

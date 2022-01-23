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
      <section>
        <div className="layout">
          <div>
            <h1>Doctor Finder</h1>
            <input type="search" placeholder="Keyword" />
            <select>
              <option>Hospital</option>
            </select>
            <select>
              <option>Specialization</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <div className="layout">
          {data?.data.map((doctor) => {
            return <DoctorCard doctor={doctor} key={doctor.doctor_id} />
          })}
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

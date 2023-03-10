import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'

interface Props {
  img: { id: number; location: string }[]
}

export default function SwiperComponents({ img }: Props) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      pagination={true}
      modules={[Pagination, Navigation]}
    >
      {img.map((item, idx) => (
        <SwiperSlide key={item.id}>
          <div className="min-h-[300px] w-full">
            <Image fill alt="" src={`${item.location}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

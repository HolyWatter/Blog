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
      {img.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="">
            <Image
            width={400}
            height={200}
              alt=""
              className="max-h-[400px] w-full bg-cover"
              src={`${item.location}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

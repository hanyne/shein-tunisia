import HeroSection from '@/components/home/HeroSection'
import PromoSection from '@/components/home/PromoSection'
import NewArrivals from '@/components/home/NewArrivals'
import BestSellers from '@/components/home/BestSellers'
import Categories from '@/components/home/Categories'
import Testimonials from '@/components/home/Testimonials'
import InstagramFeed from '@/components/home/InstagramFeed'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <Categories />
      <NewArrivals />
      <BestSellers />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  )
}

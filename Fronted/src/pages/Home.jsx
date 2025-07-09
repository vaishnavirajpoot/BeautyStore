import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import NewsLetter from '../components/NewsLetter'
import WhyChooseUs from '../components/WhyChooseUs'

const Home = () => {
  return (
    <div className='mt-4 w-full bg-yellow'>
<MainBanner/>
<Categories/>
<BestSeller/> 
<WhyChooseUs/>
<NewsLetter/>
    </div>
  )
}

export default Home
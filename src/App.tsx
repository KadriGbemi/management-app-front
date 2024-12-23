import Logo from './assets/logo.svg'
import EmployeesList from './component/employees/EmployeesList'
import InfluencersList from './component/influencers/InfluencersList'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const navigation = [
  { name: 'Influencers', href: '/influencers' },
  { name: 'Employees', href: '/employees' },
]

export default function App() {
  return (
    <BrowserRouter>
      <div className='bg-custom-gradient font-nunito font-extralight'>
        <header className='absolute inset-x-0 top-0 z-40'>
          <nav aria-label='Global' className='flex items-center justify-between p-6 lg:px-8'>
            <div className='flex lg:flex-1'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Adcash management</span>
                <img alt='Logo' src={Logo} className='h-8 w-auto text-secondary' />
              </a>
            </div>
            <div className='flex gap-x-12'>
              {navigation.map((item, index) => (
                <Link to={item.href} key={index} className='text-sm/6 font-semibold text-secondary'>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className='pt-28 px-8 md:px-20 grid gap-8 mx-auto text-secondary'>
          <Routes>
            <Route path='/' element={<InfluencersList />} />
            <Route path='/influencers' element={<InfluencersList />} />
            <Route path='/employees' element={<EmployeesList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

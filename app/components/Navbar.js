'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { usePathname } from 'next/navigation'



const navigation = [
  { name: 'Create Post', href: '/create', current: false },
  { name: 'Home', href: '/', current: true },
  { name: 'Posts', href: '/posts', current: false },
  { name: 'About me', href: '/about-me', current: false },
  { name: 'Subscribe', hrsf: '/subscribe', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function handleRouteChange(href) {
  for (let nav of navigation) {
    if (nav.href === href) {
      nav.current = true
    } else {
      nav.current = false
    }
  }
}



export default function Navbar() {
  handleRouteChange(usePathname())


  return (
    <div as="nav" className="">
      <div className="mx-auto px-2">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
            <div className="flex flex-start text-5xl font-bold pl-5 pr-12 ">
              <a href='/' className='font-[Caveat] text-accent drop-shadow-md'>
                <text>
                  Tiana Montez
                </text>
              </a>
            </div>
            <div className="hidden sm:ml-0 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-accent text-white  hover:bg-secondary' : 'text-gray-700 hover:bg-secondary hover:text-white',
                      'rounded-md px-3 py-2 text-lg font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          </div>
        </div>
      </div>
    </div>
  )
}
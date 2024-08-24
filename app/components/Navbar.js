'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { usePathname } from 'next/navigation'



const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Posts', href: '/posts', current: false },
  { name: 'About me', href: '/about-me', current: false },
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
    <div as="nav" className="bg-cyan-950">
      <div className="mx-auto px-2">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className='flex flex-start text-4xl pl-5 pr-12 text-pink-400'>
              <a href='/'>
                Tiana's Blog
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
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-lg font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <a
              key="Subscribe"
              href="/subscribe"
              aria-current={false ? 'page' : undefined}
              className={classNames(
                false ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-lg font-medium',
              )}
            >
              Subscribe
            </a>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          </div>
        </div>
      </div>
    </div>
  )
}
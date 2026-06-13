'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { classNames } from '../utils'
import { useAuth } from '../hooks/useAuth'


const navigation = [
  { name: 'Create Post', href: '/create', current: false, adminOnly: true },
  { name: 'Home', href: '/', current: true },
  { name: 'Posts', href: '/posts', current: false },
  { name: 'About me', href: '/about-me', current: false },
  { name: 'Subscribe', href: '/subscribe', current: false }
]



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
  const { isAuthenticated, isAdmin, previewMode, enterPreviewMode, exitPreviewMode } = useAuth()
  handleRouteChange(usePathname())


  return (
    <Disclosure as="nav" className="">
      <div className="mx-auto px-2">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-postBorderColor focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-7 w-7 group-data-[open]:hidden" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className="hidden h-7 w-7 group-data-[open]:block" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex items-center text-4xl sm:text-5xl font-bold sm:pl-5 sm:pr-12 gap-4">
              <a href='/' className='font-[Caveat] text-postBorderColor drop-shadow-md'>
                <text>
                  Tiana's Blog
                </text>
              </a>
              {isAdmin && !previewMode && (
                <button
                  type="button"
                  onClick={enterPreviewMode}
                  className="hidden sm:block text-sm font-medium normal-case rounded-md px-3 py-2 text-gray-700 hover:bg-buttonHoverColor hover:text-white"
                >
                  Preview Blog
                </button>
              )}
              {isAdmin && previewMode && (
                <button
                  type="button"
                  onClick={exitPreviewMode}
                  className="hidden sm:block text-sm font-medium normal-case rounded-md px-3 py-2 bg-postBorderColor text-white hover:bg-buttonSelectedColor"
                >
                  Admin Mode
                </button>
              )}
            </div>
            <div className="hidden sm:ml-0 sm:block">
              <div className="flex space-x-4">
                {navigation.filter(item => !item.adminOnly || isAuthenticated).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-postBorderColor text-white  hover:bg-buttonSelectedColor' : 'text-gray-700 hover:bg-buttonHoverColor hover:text-white',
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
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.filter(item => !item.adminOnly || isAuthenticated).map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-postBorderColor text-white' : 'text-gray-700',
                'block rounded-md px-3 py-2 text-lg font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          {isAdmin && !previewMode && (
            <button
              type="button"
              onClick={enterPreviewMode}
              className="block w-full text-left text-lg font-medium normal-case rounded-md px-3 py-2 text-gray-700"
            >
              Preview Blog
            </button>
          )}
          {isAdmin && previewMode && (
            <button
              type="button"
              onClick={exitPreviewMode}
              className="block w-full text-left text-lg font-medium normal-case rounded-md px-3 py-2 bg-postBorderColor text-white"
            >
              Admin Mode
            </button>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

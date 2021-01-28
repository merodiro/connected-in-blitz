import { Menu, Transition } from '@headlessui/react'
import logout from 'app/auth/mutations/logout'
import { Link, useMutation } from 'blitz'
import { Suspense } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { useCurrentUser } from '../hooks/useCurrentUser'

function ProfileDropdown() {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (!user) {
    return (
      <a
        href="/login"
        className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
      >
        Login
      </a>
    )
  }

  return (
    <Menu>
      {({ open }) => (
        <div className="relative ml-3">
          <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <>
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={`https://avatar.oxro.io/avatar.svg?name=${user.name}`}
                alt=""
              />
            </>
          </Menu.Button>

          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
              aria-orientation="vertical"
              static
            >
              <Menu.Item
                as="a"
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Your Profile
              </Menu.Item>
              <Menu.Item
                as="a"
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                Settings
              </Menu.Item>
              <Menu.Item
                as="button"
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200"
                onClick={() => logoutMutation()}
              >
                Sign out
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  )
}

function Navbar() {
  return (
    <nav className="bg-gray-800">
      <Menu>
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Menu.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                  </Menu.Button>
                </div>
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <Link href="/">
                    <a className="flex items-center flex-shrink-0 text-white uppercase">
                      Connected-in
                    </a>
                  </Link>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <a
                        href="#"
                        className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md"
                      >
                        Dashboard
                      </a>
                      <a
                        href="#"
                        className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                      >
                        Team
                      </a>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <HiOutlineBell className="w-6 h-6" />
                    </button> */}
                  {/* Profile dropdown */}
                  <Suspense fallback={null}>
                    <ProfileDropdown />
                  </Suspense>
                </div>
              </div>
            </div>

            <Menu.Items className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Menu.Item>
                  <a
                    href="#"
                    className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                  >
                    Dashboard
                  </a>
                </Menu.Item>

                <Menu.Item>
                  <a
                    href="#"
                    className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Team
                  </a>
                </Menu.Item>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </nav>
  )
}

export default Navbar

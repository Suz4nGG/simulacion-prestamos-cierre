
export default function Layout({children}) {
  return (
    <div className='bg-white'>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="bg-pink-900 w-full flex items-center justify-center p-6 lg:px-8 md:px-9" aria-label="Global">
          <div className="lg:flex lg:gap-x-12 w-full flex items-center justify-center ">
            <div className="lg:flex lg:gap-x-12 h-20 w-[25.125rem] sm:w-[72.1875rem] bg-center	bg-contain bg-no-repeat bg-[url('./assets/logos-header.png')]"></div>
          </div>
        </nav>
      </header>
      {children}
    </div>
  )
}

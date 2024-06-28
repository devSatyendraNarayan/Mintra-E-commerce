import React from 'react'

function Header() {
  return (
   <>
   <div className="">
      <div className="absolute top-5 left-10">
        <img
          className="w-14 cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/128/3670/3670333.png"
          alt="Mintra-logo"
          onClick={() => {
            window.location.href = "/home";
          }}
        />
      </div>
      <div className="flex gap-5 absolute right-10 top-5">
        <p
          onClick={() => {
            window.location.href = "/men+category";
          }}
          className="font-semibold text-white hover:scale-105 transition-all ease-out cursor-pointer"
        >
          MEN
        </p>
        <p
          onClick={() => {
            window.location.href = "/women+category";
          }}
          className="font-semibold text-white hover:scale-105 transition-all ease-out cursor-pointer"
        >
          WOMEN
        </p>
      </div>
      </div>
   </>
  )
}

export default Header
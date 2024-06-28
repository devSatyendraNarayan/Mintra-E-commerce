import React from 'react'

function Footer() {
  return (
   <>
   <footer className="footer footer-center bg-base-200 text-base-content p-10 ">
  <nav className="grid grid-flow-col gap-4">
    <a className="link link-hover"  onClick={() => {
            window.location.href = "/about-us";
          }}>About us</a>
    <a  onClick={() => {
            window.location.href = "/contact-us";
          }} className="link link-hover">Contact Us</a>
    <a   onClick={() => {
            window.location.href = "/site-map";
          }} className="link link-hover">Site Map</a>
    
  </nav>
 
  <aside className='pb-11'>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by XYZ Ltd.</p>
  </aside>
</footer>
   </>
  )
}

export default Footer
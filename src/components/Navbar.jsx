import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-400 flex justify-between items-center p-3 px-14 h-16 text-white mb-1'>

            <div className="logo font-bold sm:text-2xl text-xl">
                <span className='text-green-800'>&lt;</span>
                Pass
                <span className='text-green-800'>Hub/&gt;</span>
            </div>

            <a 
                href="https://github.com/vikhyatcharak" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <button className='rounded-full sm:p-2 p-[6px] bg-green-700 flex items-center gap-1 hover:bg-green-600 border-2 border-green-900'>
                    <img src="/Pass-Hub/github-logo.png" alt="g-logo" className='sm:w-7 w-5 mix-blend-multiply'/> 
                    GitHub
                </button>
            </a>
        </nav>

    )
}

export default Navbar

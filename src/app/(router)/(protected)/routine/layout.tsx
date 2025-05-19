import React from 'react'

const Layout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className='mt-22'>
            {children}
        </div>
    )
}

export default Layout

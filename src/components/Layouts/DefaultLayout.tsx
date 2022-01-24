import React from 'react'

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div>
      {children}

      <footer className="py-8">
        <div className="layout">
          <p className="text-center">
            Created by{' '}
            <a href="https://github.com/bryantobing12">Bryan Lumbantobing</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default DefaultLayout

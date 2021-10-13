import React from 'react'

const Link = ({ href, className, children }) => {

  const onClick = (e) => {
    if (e.metakey || e.ctrlKey) {
      return
    }
    e.preventDefault()
    window.history.pushState({}, '', href)

    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  return (
    <a
      onClick={onClick}
      href={href}
      className={className}
      style={{color: 'white'}}
    >
      {children}
    </a>
  )
}

export default Link

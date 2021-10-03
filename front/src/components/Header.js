import React  from 'react'
import Connected from './Header/Connected'
import NotConnected from './Header/NotConnected'

const Header = ({ user, disconnectUser }) => {
  const renderContent = () =>  {
    if (user) {
      return <Connected disconnectUser={disconnectUser} />
    } else {
      return <NotConnected />
    }
  }

  return (
    <div>
      {renderContent()}
    </div>
  )
}

export default Header

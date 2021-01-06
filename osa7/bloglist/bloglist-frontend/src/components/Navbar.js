import React from 'react'
import styled from 'styled-components'
import {
  Link
} from "react-router-dom"

const Navbar = ({ user, handleLogOut }) => {

  const Navigation = styled.div`
    background: BurlyWood;
    padding: 0.25em;
  `

  const Text = styled.span`
    color: white;
    padding: 0.25em;
  `

  const Button = styled.button`
    background: Bisque;
    font-size: 1em;
    padding: 0.25em 0.25em;
    border: 2px solid Chocolate;
    border-radius: 3px;
  `
  const NavbarLink = styled(Link)`
    padding: 0.25em;
    font-size: 1em;
    color: white;
    font-weight: bold;
  `

    return(
      <Navigation>
        <NavbarLink Link to="/">BLOGS</NavbarLink>
        <NavbarLink to="/users">USERS</NavbarLink>
        <Text>{user.name} logged in</Text>
        <Button type="submit" onClick={handleLogOut}>logout</Button>
      </Navigation>
    )
}

export default Navbar
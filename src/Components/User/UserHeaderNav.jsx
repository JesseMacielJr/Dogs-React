import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg'
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg'
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg'
import { ReactComponent as Sair } from '../../Assets/sair.svg'
import styles from './UserHeaderNav.module.css'
import useMedia from '../../Hooks/useMedia'

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext)
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const menuRef = React.useRef(null);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname])

  function handleMobileMenu() {
    setMobileMenu(!mobileMenu)
  }

  const handleClickOutsideMobileMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMobileMenu(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutsideMobileMenu);

    return () => {
      document.removeEventListener('click', handleClickOutsideMobileMenu);
    };
  }, []);

  return (
    <>
      {mobile && <button ref={menuRef} aria-label='Menu' className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={handleMobileMenu}></button>}
      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to="/conta" end><MinhasFotos />{mobile && "Minhas fotos"}</NavLink>
        <NavLink to="/conta/estatisticas"><Estatisticas />{mobile && "Estatísticas"}</NavLink>
        <NavLink to="/conta/postar"><AdicionarFoto />{mobile && "Adicionar Foto"}</NavLink>
        <button onClick={userLogout}><Sair />{mobile && "Sair"}</button>
      </nav>
    </>
  )
}

export default UserHeaderNav
import LogoDark from 'src/assets/images/logos/dark-logo.png'; // Adjust the path to your SVG file
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '180px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
  padding: '20px',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={LogoDark} alt="Logo" height={80} />
    </LinkStyled>
  )
};

export default Logo;

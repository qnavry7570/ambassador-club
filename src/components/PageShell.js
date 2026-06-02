import Navbar from './Navbar';
import Footer from './Footer';

export default function PageShell({children}){
  return <><Navbar /><div style={{paddingTop:72}}>{children}</div><Footer /></>;
}

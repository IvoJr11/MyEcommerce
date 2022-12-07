import Navbar from "../components/Navbar";
import { getToken } from "../services/SecurityService";

export default function Home() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Navbar />
      <h1>Home</h1>
    </div>
  )
}
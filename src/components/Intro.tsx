import { Link } from "react-router-dom"
export default function Intro() {
    return <main style={{
        height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{color: '#293264'}}>Welcome to quizzical!</h1>
        <p>Put your mind to the test by answering some quickfire questions!</p>
        <Link to='/quiz' style={{ borderRadius: '15px', fontWeight: 'bold' }}
            className="btn btn-info px-5 py-1 text-light">Start</Link>
        <div className="w-5 h-5 bg-dark position-absolute top-0 right-0"></div>
         </main>    
}
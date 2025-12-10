import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Menu_jeu() {
    const Navigate = useNavigate();
    return (
        <>
            <div>
                <h1>Menu jeu</h1>
                <button onClick= {() => Navigate('/')}>Jouer</button>
            </div>
        </>
    )
}
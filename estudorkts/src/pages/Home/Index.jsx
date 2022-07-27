import React, { useState, useEffect } from 'react';
import './styles.css';
import { Card } from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudents(prevState => [...prevState, newStudent]);

  }
  
  useEffect(() => {
    
    // Corpo do useEffect
    /* Tudo o que estiver dentro do corpo do useEffect,
    será as ações ou aquilo que eu quero executar */

    async function fetchData(){
    const response = await fetch('https://api.github.com/users/Leozinho11')
    const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    }
    
    fetchData();

    /* MANEIRA DE USAR O fetch SEM SER ASSINCRONO:
    
    fetch('<link da API>')
    .then ( response => response.json())
    .then (data => 
      <entrada de dados, obj, funções etc.>
    )

    */

  }, []);

  return (
    <div className="container">
      <header>
      <h1>Lista de Presença </h1>

      <div>
        <strong>{user.name}</strong>
        <img src={ user.avatar } alt='Foto de Perfil'></img>
      </div>
      </header>

      <input 
      type="text" 
      placeholder="Digite o nome..."
      onChange={e => setStudentName(e.target.value)}
       />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
        <Card 
        key={student.time}
        name= {student.name}
        time={student.time}
         />
         ))
      }
    </div>
  );
}



import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [koltData, setKoltData] = useState(_ => {
    const sKolt = localStorage.getItem('kolts');
    return sKolt ? JSON.parse(sKolt) : [];
  });

  useEffect(_ => {
    localStorage.setItem('kolts', JSON.stringify(koltData));
  }, [koltData]);

  return (
    <>
      <div>

      </div>
    </>
  )
}

export default App

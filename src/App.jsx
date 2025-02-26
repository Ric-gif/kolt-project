import { useEffect, useState } from 'react'
import './App.css'
import './sass/styles.scss'
import CreateKolt from './Components/Create/CreateKolt';


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
        <CreateKolt koltData={koltData} setKoltData={setKoltData} /> 
      </div>
    </>
  )
}

export default App

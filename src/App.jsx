import { useEffect, useState } from 'react'
import './App.css'
import './sass/styles.scss'
import CreateKolt from './Components/Create/CreateKolt';
import ReadKolt from './Components/Read/ReadKolt';
import ReadInfo from './Components/Read/ReadInfo';


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
      <div className='app-container'>
        <h1>Kolt Management</h1>
        <div className='container'>
          <div className='left-column'>
            <CreateKolt koltData={koltData} setKoltData={setKoltData} />
            <ReadInfo koltData={koltData}/>
            
          </div>
          <div className='right-column'>
            <ReadKolt koltData={koltData} setKoltData={setKoltData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

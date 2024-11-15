// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


//chatgpt

import React from 'react';
import EmailForm from './components/EmailForm';
import WarmupConfigForm from './components/WarmupConfigForm';
import Report from './components/Report';

function App() {
  return (
    <div className="App">
      <h1>Email Warmup System</h1>
      <EmailForm />
      <WarmupConfigForm />
      <Report />
    </div>
  );
}

export default App;

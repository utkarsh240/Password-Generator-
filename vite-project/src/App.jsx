import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Copy, Lock, ShieldCheck, RefreshCw } from 'lucide-react'

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyStatus, setCopyStatus] = useState('Copy');

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$^&*-_+=[]{}~";
    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
    
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus('Copy'), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-10 h-10 text-white mr-3" />
          <h1 className="text-4xl font-bold text-white">Password Generator</h1>
        </div>
        
        <div className="flex mb-4">
          <input 
            type="text"
            value={password}
            className="flex-grow p-3 bg-white/20 text-white rounded-l-lg outline-none placeholder-gray-300"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors flex items-center"
          >
            <Copy className="mr-2" />
            {copyStatus}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-white flex items-center">
              <ShieldCheck className="mr-2" />
              Password Length: {length}
            </label>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-1/2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex justify-between">
            <label className="flex items-center text-white">
              <input 
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="mr-2 accent-blue-500"
              />
              Include Numbers
            </label>

            <label className="flex items-center text-white">
              <input 
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="mr-2 accent-blue-500"
              />
              Include Special Chars
            </label>
          </div>

          <button 
            onClick={passwordGenerator} 
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
          >
            <RefreshCw className="mr-2" />
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
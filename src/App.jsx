import { useState ,useEffect,useCallback,useRef } from 'react'
import './App.css'

function App() {
   
   const [password, setpassword] = useState("");
   const [length, setlength] = useState(8);
   const [numberAllowed, setnumberAllowed] = useState(false);
   const [characterAllowed, setcharacterAllowed] = useState(false);
   const [Copy , setcopy] = useState("Copy");
   const passwordRef = useRef(null);
     
     const passwordgenerator = useCallback(
      ()=>{
          let pass = "" 
          let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 

          if(numberAllowed) str+= "1234567890"
          if(characterAllowed) str+= "!@#$%^&*({-=})_+><``/~" 

          for(let i=1 ; i<=length ; i++){
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
          }

          setpassword(pass)
         
     },[numberAllowed,characterAllowed,length,setpassword]
    )

    const copyPassword = useCallback(()=>{

      passwordRef.current?.select();
      // passwordRef.current?.setSelectionRange(0,10);
      window.navigator.clipboard.writeText(password)
    },[password] )

    useEffect(()=>{
       passwordgenerator()
    },[length,numberAllowed,characterAllowed,passwordgenerator])

  return (
    <>
      <div className=" w-full max-w-2xl mt-24 mb-24 mx-auto rounded-lg bg-slate-700 text-white p-5">
        <h1 className="text-3xl text-center">Password Generator</h1>
        <div className="w-full py-4 text-center"> 
              <input
                type="text"
                placeholder='Password'
                value={password}
                readOnly
                ref={passwordRef}
                className="w-[80%] px-3 py-3 mt-3 text-orange-600 border border-none outline-none rounded-xl"
              />
              <button onClick={copyPassword} className=" px-6 py-3 bg-blue-600 hover:bg-blue-800  rounded-xl font-bold -ml-5">{Copy}</button>
        </div>

         <div className="w-full mt-3 flex items-center justify-start ">
            <input 
            type="range"
             min={6}
              max={100}
              value={length}
              className="w-32 ml-8 mr-2"
              onChange={(e)=>{setlength(e.target.value)}} 
              />
            <span className="text-orange-500">Length: {length}</span>

            <input
             type="checkbox"
             defaultChecked={numberAllowed}
             id='numInput'
             onChange={()=>{
              setnumberAllowed((prev) => !prev)
              }}
              className="w-5 ml-8"
             />

              <label htmlFor="numInput" className="text-orange-500 pl-2">Number</label>

            <input 
              type="checkbox"
              defaultChecked={characterAllowed}
              id='charInput'
              onChange={()=>{
              setcharacterAllowed((prev) => !prev)}} 
              className="w-5 ml-5"
           />

            <label htmlFor="charInput" className="text-orange-500 pl-2">Character</label>
         </div>

      </div>

    </>
  )
}

export default App

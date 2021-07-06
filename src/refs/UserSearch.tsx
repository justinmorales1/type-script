import { useState, useRef, useEffect } from 'react';

const users = [
  { name: "Elvira", age: 30},
  { name: "Stewie", age: 30},
  { name: "Max", age: 30},
  { name: "Rupert", age: 30},
  { name: "Millie", age: 30}
]

const UserSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState<{name: string, age:number} | undefined>();

  useEffect(() => {
    //This is known as a type guard.
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus()
  },[])

  const onClick = () => {
     const foundUser = users.find((user) => {
        return user.name === name;
     })

     setUser(foundUser);
  } 

  return (
    <div>
      User Search
      <input ref={inputRef} value={name} onChange={ e => setName(e.target.value)} />
      <button onClick={onClick} > Find User</button>
      <div>
        {user?.name}
        {user?.age}
      </div>
    </div>
  )
}

export default UserSearch;
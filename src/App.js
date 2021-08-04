import React, { useRef, useReducer, useMemo, useCallback, createContext } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./useInputs";
import produce from 'immer';

function countActiveUsers(users) {
  console.log('활성 사용자 수 세는 중');
  return users.filter(user => user.active).length
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'herrakam',
      email: 'fm1003@naver.com',
      active: true,
    },
    {
      id: 2,
      username: 'herrakam2',
      email: 'fm10033@naver.com',
      active: false,
    },
    {
      id: 3,
      username: 'herrakam3',
      email: 'fm100333@naver.com',
      active: false,
    },
  ]
}

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, draft =>{
        draft.users.push(action.user)
      })
    case 'TOGGLE_USER':
      return produce(state, draft =>{
        const user = draft.users.find(user=>user.id===action.id)
        user.active = !user.active
      })
    case 'REMOVE_USER':
      return produce(state, draft =>{
        const index = draft.users.findIndex(user=> user.id === action.id)
        draft.users.splice(index,1)
      })
    default:
      throw new Error('unhandled action');
  }
}

export const UserDispatch = createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  })
  const { username, email } = form;
  const nextId = useRef(4)
  const { users } = state



  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    })
    nextId.current += 1
    reset()
  }, [username, email, reset])

  const count = useMemo(() => countActiveUsers(users), [users])
  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: '',
  // });

  // const { username, email } = inputs
  // const onChange = useCallback( e => {
  //   const { name, value } = e.target
  //   setInputs({
  //     ...inputs,
  //     [name]: value,
  //   })
  // },[inputs])
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     username: 'herrakam',
  //     email: 'fm1003@naver.com',
  //     active: true,
  //   },
  //   {
  //     id: 2,
  //     username: 'herrakam2',
  //     email: 'fm10033@naver.com',
  //     active: false,
  //   },
  //   {
  //     id: 3,
  //     username: 'herrakam3',
  //     email: 'fm100333@naver.com',
  //     active: false,
  //   },
  // ]);                    



  // const nextId = useRef(4)

  // const onCreate = useCallback( () => {
  //   const user = {
  //     id: nextId.current,
  //     ...inputs
  //   }
  //   setUsers(users=> users.concat(user))
  //   setInputs({
  //     username: '',
  //     email: ''
  //   })
  //   console.log(nextId.current);
  //   nextId.current += 1
  // },[username, email])
  // const onRemove = useCallback( (id) => {
  //   setUsers(users=> users.filter(user => user.id !== id))
  // },[])
  // const onToggle = useCallback( id => {
  //   setUsers(users=>users.map(user => user.id === id
  //     ? { ...user, active: !user.active }
  //     : user 
  //   ))
  // },[])
  // const count = useMemo(()=>countActiveUsers(users),[users]) 





  return (
    <>
      <UserDispatch.Provider value={dispatch}>
        <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}></CreateUser>
        <UserList users={users}></UserList>
        <div className="count">활성사용자 수:{count}</div>
      </UserDispatch.Provider>
    </>
  )


}

export default App;

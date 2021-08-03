import React, { useEffect, useContext } from 'react'
import { UserDispatch } from './App'

const User = React.memo(function User({ user}) {
    const { username, id, email, active } = user
    const dispatch = useContext(UserDispatch)
    useEffect(() => {
        console.log('user값이 형성됨');
        return () => {
        console.log('user값 바뀌기 전');
        }
    }, [user])
    return (
        <div>
            <b style={{
                color: active ? 'blue' : 'black',
                cursor: 'pointer'
            }}
                onClick={() => dispatch({
                    type:'TOGGLE_USER',
                    id
                })}>
                {username}
            </b>
            <span>({email})</span>
            <button onClick={() => dispatch({
                type:'REMOVE_USER',
                id
            })}>삭제</button>
        </div>
    )
})

function UserList({ users, }) {

    return (
        <div>
            {
                users.map(
                    user => (<User
                        user={user}
                        key={user.id}
                    />)
                )
            }
        </div>
    )
}

export default React.memo(UserList);
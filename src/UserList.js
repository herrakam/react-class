import React, { useEffect } from 'react'

const User = React.memo(function User({ user, onRemove, onToggle }) {
    const { username, id, email, active } = user
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
                onClick={() => onToggle(id)}>
                {username}
            </b>
            <span>({email})</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    )
})

function UserList({ users, onRemove, onToggle }) {

    return (
        <div>
            {
                users.map(
                    user => (<User
                        user={user}
                        key={user.id}
                        onRemove={onRemove}
                        onToggle={onToggle}
                    />)
                )
            }
        </div>
    )
}

export default React.memo(UserList);
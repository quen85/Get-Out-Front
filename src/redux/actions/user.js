export async function loadUser(dispatch, id){
    let res = await fetch(
        `https://back-get-out.herokuapp.com/users/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
    res = await res.json()
    dispatch({type: "LOAD_USER", user: res})
}

export async function unsubscribeUser(dispatch, user, event){
    let events = user.events
    let indexUser = events.indexOf(event.id)
    events.splice(indexUser, 1)
    let paramUser = {userId: user._id, events: events}
    await fetch(
        `https://back-get-out.herokuapp.com/users/${user._id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paramUser)
        }
    )
    user.events = events
    dispatch({type: "UNSUBSCRIBE_USER", user: user})
}

export async function subscribeUser(dispatch, event, user){
    let events = user.events
    events.push(event.id)
    let param = {userId: user._id, events: events}
    await fetch(
        `https://back-get-out.herokuapp.com/users/${user._id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }
    )
    user.events = events
    dispatch({type: "SUBSCRIBE_USER", user: user})
}

export async function createUser(dispatch, param){
    let res = await fetch(
        `https://back-get-out.herokuapp.com/users`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }
    )
    res = await res.json()

    dispatch({type: "CREATE_USER", user: res})
}

export async function updateUser(dispatch, userId, param){
    let res = await fetch(
        `https://back-get-out.herokuapp.com/users/${userId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }
    )
    res = await res.json()

    dispatch({type: "UPDATE_USER", user: res})
}
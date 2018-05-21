export async function loadUserEvents(dispatch, user){

    let allEvents = []
    let events = user.events.map(async (item, index) => {
        let event = await fetch(
            `https://back-get-out.herokuapp.com/events/${item}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        event = await event.json()

        allEvents.push(event)

    })

    Promise.all(events).then(() => {
        dispatch({type: "LOAD_EVENTS", events: allEvents})
    });
}

export async function loadSingleEvent(dispatch, id, img, user){
    let result = await fetch(
        `https://api.paris.fr/api/data/2.0/QueFaire/get_activity/?token=f7f4c0c6692d9d81e1ea763b4ebe0bafb0598b5f3643feb442ad933f71d2b800&id=${id}`
    )

    result = await result.json()

    let event = result.data[0]

    event.description = JSON.parse(event.description)

    for (let i = 0;i < event.description.length;i++){
        if(event.description[i].type === "text"){
            event.description.text = event.description[i].data.block
            break;
        }
    }

    event.image = img

    let eventApi = await fetch(
        `https://back-get-out.herokuapp.com/events/api/${event.idactivites}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )


    eventApi = await eventApi.json()

    let param

    if(!eventApi.length){
        param = {idApi: event.idactivites, image: img, title: event.nom}
        let result = fetch(
            `https://back-get-out.herokuapp.com/events`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(param)
            }
        )
        result = await result.json()
        event.id = result._id
        event.participants = result.participants
    }
    else{
        event.id = eventApi[0]._id;
        event.participants = eventApi[0].participants
    }

    event.userParticipate = event.participants.indexOf(user._id) !== -1 ? true : false;
    console.log(event)

    dispatch({type: "LOAD_SINGLE_EVENT", event: event})
}

export async function unsubscribeToEvent(dispatch, user, event, events) {
    let participants = event.participants;
    let indexEvent = participants.indexOf(user._id)
    participants.splice(indexEvent, 1)
    let paramEvent = { eventId: event.id, participants: participants }

    await fetch(
        `https://back-get-out.herokuapp.com/events/${event.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paramEvent)
        }
    )

    let index

    for(let i=0;i < events.length;i++){
        for(let j=0;j < events[i].participants.length;j++){
            if(events[i].participants[j] === user._id){
                index = i
            }
        }
    }
    events.splice(index, 1)
    event.participants = participants
    event.userParticipate = false

    dispatch({type: "UNSUBSCRIBE_EVENT", event: event, events: events})
}

export async function subscribeEvent(dispatch, event, user, events){
    let participants = event.participants;

    participants.push(user._id);
    let param = { eventId: event.id, participants: participants }
    await fetch(
        `https://back-get-out.herokuapp.com/events/${event.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }
    )

    let apiEvent = await fetch(
        `https://back-get-out.herokuapp.com/events/${event.id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    apiEvent = await apiEvent.json()

    event.participants = participants
    event.userParticipate = true

    events.push(apiEvent)

    dispatch({type: "SUBSCRIBE_EVENT", event: event, events: events})
}
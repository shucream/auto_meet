/*global chrome*/
import React from 'react'

export const MeetingList = () => {
    const [events, setEvents] = useState([])
    chrome.alarms.getAll((alarms) => {
        setEvents(alarms.filter((alarm) => alarm.name.split('--')[0] == 'autoJoinMeet-meeting'))
    })
    return (
        <div className="App">
        {
            events.map((alarm) => {
                const [_, time, id, title] = alarm.name.split('--')

                return (<Meeting time={parseInt(time)} id={id} title={title} name={alarm.name} />)
            })
        }
        </div>
    );
}

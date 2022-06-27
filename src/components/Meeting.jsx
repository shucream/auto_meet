/*global chrome*/
import React from 'react'

export const Meeting = (props) => {
    const { time, id, title, name } = props
    const date = new Date(time)

    const handleDelete = () => {
        chrome.alarms.chrome.alarms.clear(name)
    }

    return (
        <button onClick={onDelete} style={{ display: 'flex', alignItems: 'center', padding: '20px 10px' }}>
            <div style={{ marginRight: 10 }}>{`${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`}</div>
            <div>{title}</div>
            <button onClick={handleDelete} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: 'red', textAlign: 'center' }}>×</button>
        </button>
    )
}

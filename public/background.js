const before = 5// 5分前に開く

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name == 'auto_join_meet-meeting') {
        const date = parseInt(request.time) - 5 * 60 * 1000
        chrome.alarms.create(`${request.name}--${request.time}--${request.id}`, { when: date })
    }
    if (request.name == 'auto_join_meet-clearMeeting') {
        chrome.alarms.clearAll()
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    const [name, time, id] = alarm.name.split('--')
    if (name == 'auto_join_meet-meeting') {
        const url = `https://meet.google.com/${id}`
        chrome.tabs.query({ url: url }, (tabs) => {
            if (tabs.length === 0) {
                chrome.tabs.create({ url: url, active: true });
            } else {
                chrome.tabs.update(tabs[0].id, { active: true });
            }
        });
    }
})

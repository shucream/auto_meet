document.getElementsByXPath = function(expression, parentElement) {
    var r = []
    var x = document.evaluate(expression, parentElement || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    for (var i = 0, l = x.snapshotLength; i < l; i++) {
        r.push(x.snapshotItem(i))
    }
    return r
}

window.onload = () => {
    var table = document.getElementsByXPath("/html/body/c-wiz/div/div[2]/div/div[2]/c-wiz/c-wiz/div[1]/div[1]/div/div[5]/c-wiz/div")[0]
    if (table) {
        chrome.runtime.sendMessage({name: 'auto_join_meet-clearMeeting'})    
        Array.prototype.slice.call(table.children).filter((_, i) => i%2 === 0).forEach((meeting) => {
            const time = meeting.children[0].children[0].dataset.beginTime
            const id = meeting.children[0].children[0].dataset.callId
            const title = meeting.children[0].children[0].dataset.ariaLabelStatic.split(' ').slice(1, -1).join(' ').slice(0,-1)
            chrome.runtime.sendMessage({name: 'auto_join_meet-meeting', time: time, id: id, title: title})
        })
    }
}

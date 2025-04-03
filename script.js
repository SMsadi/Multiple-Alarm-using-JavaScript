let alarms = {};

function setAlarm(alarmId) {
    if (alarms[alarmId]) {
        clearTimeout(alarms[alarmId]);
    }

    const alarmInput = document.getElementById(`alarmTime${alarmId}`).value;
    if (!alarmInput) {
        alert("Please select a time");
        return;
    }

    const now = new Date();
    let alarmTime = new Date(now.toDateString() + ' ' + alarmInput);

    if (alarmTime < now) {
        alarmTime.setDate(alarmTime.getDate() + 1);
    }

    const timeToAlarm = alarmTime - now;

    alarms[alarmId] = setTimeout(() => {
        document.getElementById("alarmSound").play();
        document.getElementById(`alarmMessage${alarmId}`).textContent = "⏰ Alarm is ringing!";
        document.getElementById(`alarmMessage${alarmId}`).style.color = "red";
    }, timeToAlarm);

    alert(`Alarm ${alarmId} set for: ${alarmTime.toLocaleTimeString()}`);
    document.getElementById(`alarmMessage${alarmId}`).textContent = `✅ Alarm set for ${alarmTime.toLocaleTimeString()}`;
    document.getElementById(`alarmMessage${alarmId}`).style.color = "green";
}

function stopAlarm(alarmId) {
    if (!alarms[alarmId]) {
        alert("No active alarm to stop");
        return;
    }

    document.getElementById("alarmSound").pause();
    document.getElementById("alarmSound").currentTime = 0;
    clearTimeout(alarms[alarmId]);
    delete alarms[alarmId];

    document.getElementById(`alarmMessage${alarmId}`).textContent = "⏹️ Alarm stopped.";
    document.getElementById(`alarmMessage${alarmId}`).style.color = "red";
}

function refreshAlarm(alarmId) {
    stopAlarm(alarmId);
    document.getElementById(`alarmTime${alarmId}`).value = "";
    document.getElementById(`alarmMessage${alarmId}`).textContent = "🔄 Alarm reset.";
}

function snoozeAlarm(alarmId) {
    if (!document.getElementById("alarmSound").paused) {
        stopAlarm(alarmId);
        alarms[alarmId] = setTimeout(() => {
            document.getElementById("alarmSound").play();
            document.getElementById(`alarmMessage${alarmId}`).textContent = "⏰ Alarm ringing again!";
            document.getElementById(`alarmMessage${alarmId}`).style.color = "red";
        }, 5 * 60 * 1000);

        document.getElementById(`alarmMessage${alarmId}`).textContent = "⏳ Snoozed for 5 min.";
        document.getElementById(`alarmMessage${alarmId}`).style.color = "orange";
    } else {
        alert("Snooze only works when the alarm is ringing!");
    }
}

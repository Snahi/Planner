let calendar;

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        plugins: [ 'resourceTimeline', 'interaction' ],
        defaultView: 'resourceTimelineWeek',
        editable: true,
        eventStartEditable: true,
        eventResourceEditable: true,
        slotDuration: {day: 1},
        resourceLabelText: 'Categories',
    });
    calendar.render();

});

function getDay(daysSinceToday) {
    let day = new Date();
    day.setDate(day.getDate() + daysSinceToday);
    const dd = String(day.getDay() + 1).padStart(2, '0');
    const mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = day.getFullYear();

    day = yyyy + '-' + mm + '-' + dd;
    return day
}

function addEvent(id, title, start, end, resourceId) {
    calendar.addEvent({
        id: id,
        title: title,
        start: start,
        end: end,
        resourceId: resourceId,
        fullDay: true
    })
}

function addResource(category) {
    calendar.addResource({
        id: category.id,
        title: category.name,
        eventBackgroundColor: category.color
    })
}
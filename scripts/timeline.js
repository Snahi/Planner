document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        plugins: [ 'resourceTimeline', 'interaction' ],
        defaultView: 'resourceTimelineWeek',
        editable: true,
        eventStartEditable: true,
        eventResourceEditable: true,
        resources: [
            {
                id: 'balloons',
                title: 'Balloons',
                eventBackgroundColor: '#ff0000'
            },
            {
                id: 'music',
                title: 'Music',
                eventBackgroundColor: '#18be00'
            }
        ],
        slotDuration: {day: 1},
        resourceLabelText: 'Categories',
        events: [
            {
                id: 1,
                title: 'Inflate the balloons',
                start: getDay(0),
                end: getDay(1),
                resourceId: 'balloons'
            },
            {
                id: 2,
                title: 'New song mixing',
                start: getDay(0),
                end: getDay(2),
                resourceId: 'music'
            }
        ]
    });
    calendar.render();
    console.log(calendar.getEvents());

});

function getDay(daysSinceToday) {
    var day = new Date();
    day.setDate(day.getDate() + daysSinceToday);
    var dd = String(day.getDay() + 1).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = day.getFullYear();

    day = yyyy + '-' + mm + '-' + dd;
    console.log(day);
    return day
}
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'resourceTimeline' ],
        defaultView: 'resourceTimelineWeek',
        resources: [
            {
                id: 'ballons',
                title: 'Baloons'
            },
            {
                id: 'music',
                title: 'Music'
            }
        ],
        slotDuration: {day: 1},
        resourceLabelText: 'Categories'
    });

    calendar.render();
});
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
        //resourceAreaWidth: "0%",
        resourcesInitiallyExpanded: false,
        eventClick: function(info) {
            showTaskDetails(getTaskById(info.event.id));
        },
        eventResize: function(info) {
            let event = info.event;
            let task = getTaskById(event.id);
            updateTask(task, event.title, task.description, event.start, event.end, task.hashTags, task.category);
            updateSearchInputDataSource();
        },
        eventDrop: function(info) {
            let event = info.event;
            let task = getTaskById(event.id);
            let oldDate = new Date(task.end);
            let newDate = new Date(oldDate.setDate(oldDate.getDate() + info.delta.days));
            updateTask(task, event.title, task.description, event.start, oldDate, task.hashTags, info.newResource._resource.id);
            updateSearchInputDataSource();
        }

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

function hideEventsByResource(resourceId) {
    console.log(resourceId);
    let eventsToHide = calendar.getResourceById(resourceId).getEvents();
    eventsToHide.forEach(event => {
        event.eventColor = 'rgba(0,0,0,0)';
        event.eventTextColor = 'rgba(0,0,0,0)';
    });
}

function showEventsByResource(resourceId) {
    console.log(resourceId);
    let resource = calendar.getResourceById(resourceId);
    resource.getEvents().forEach(event => {
        event.eventBackgroundColor = resource.eventBackgroundColor;
        event.eventBorderColor = resource.eventBorderColor;
        event.eventTextVolor = resource.eventTextColor;
    });
}
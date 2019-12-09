let calendar;
//
// document.addEventListener('DOMContentLoaded', function() {createCalendar()});

function createCalendar()
{
    let calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        plugins: [ 'resourceTimeline', 'interaction' ],
        defaultView: 'resourceTimelineWeek',
        editable: true,
        eventStartEditable: true,
        events: function(info, successCallback, failureCallback) {
            successCallback(getAllTasks().filter(task => task.tableId == currTableId).map(function(task)
            {
                let bg = getCategoryById(task.category).color;

                return {
                    id: task.id,
                    title: task.title,
                    start: task.start,
                    end: task.end,
                    resourceId: task.category,
                    backgroundColor: bg,
                    fullDay: true,
                    category: task.category
                };
            }))
        },
        eventResourceEditable: true,
        slotDuration: {day: 1},
        resources: function(fetchInfo, successCallback, failureCallback)
        {
            successCallback(selectedCategories.filter(selCat => selCat.tableId == currTableId).map(function(categoryObj) {
                return {id: categoryObj.id, title: categoryObj.name};
            }));
        },
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

            updateTask(task, event.title, task.description, event.start, event.end, task.hashTags, event._def.resourceIds[0]);
            updateSearchInputDataSource();
        }

    });
    calendar.render();
}

function refreshEvents()
{
    calendar.getEventSources()[0].refetch();
}

import { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import './Calendar.css';

const ExternalEvent: React.FC<EventInput> = ({ event }) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const draggable = new Draggable(elRef.current, {
      eventData: () => {
        return { ...event, create: true };
      },
    });

    return () => draggable.destroy();
  }, [event]);

  return (
    <div
      ref={elRef}
      style={{
        backgroundColor: event.color,
      }}
      className="event"
    >
      {event.title}
    </div>
  );
};

const events: EventInput[] = [
  {
    id: '1',
    title: 'event 1',
    color: 'hotpink',
  },
  {
    id: '2',
    title: 'event 2',
    color: 'plum',
  },
  {
    id: '3',
    title: 'event 3',
    color: 'aquamarine',
  },
];

const Calendar: React.FC = () => {
  return (
    <>
      <div id="external-events" className="external-events">
        <p>Drag these events to the calendar:</p>
        <div className="events-wrapper">
          {events.map((event) => (
            <ExternalEvent event={event} key={event.id} />
          ))}
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        editable={true}
        droppable={true}
      />
    </>
  );
};

export default Calendar;

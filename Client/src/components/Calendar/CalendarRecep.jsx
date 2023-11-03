import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from 'fullcalendar';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import FormDialog from './popupAddRecep';
import TaskDialog from './popupEdRecep';

moment.locale('pt-br');

function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const idRecep = window.localStorage.getItem('userId');
  const nomeRecep = window.localStorage.getItem('userName');

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const fetchEvents = () => {
    axios
      .get(`http://localhost:3001/getTarefa`)
      .then((response) => {
        setCurrentEvents(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter os eventos:', error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(selectInfo);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsDialogOpen2(false);
  };

  const handleDialogSave = (title, descricao, idAdvogado, nomeAdvogado) => {
    setIsDialogOpen(false);

    const newEvent = {
      title,
      start: selectedEvent.startStr,
      end: selectedEvent.endStr,
      allDay: selectedEvent.allDay,
      idRecep: idRecep,
      nomeRecep: nomeRecep,
      descricao: descricao,
      nomeRecep: nomeRecep,
      nomeAdvogado: nomeAdvogado,
      idAdvogado: idAdvogado,
    
    };

    axios
      .post('http://localhost:3001/registerTarefa', newEvent)
      .then((response) => {
        if (response.status === 200) {
          newEvent.id = response.data.id;
          setCurrentEvents([...currentEvents, newEvent]);
        }
      })
      .catch((error) => {
        console.error('Erro ao criar o evento:', error);
      });
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo);
    setIsDialogOpen2(true);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent || !selectedEvent.event) {
      return;
    }
  
    const eventId = selectedEvent.event.id;
    axios
      .delete(`http://localhost:3001/deleteTarefa/${eventId}`)
      .then((response) => {
        if (response.status === 200) {
          fetchUpdatedEvents();
          setIsDialogOpen2(false);
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir o evento:', error);
      });
  };
  

  const handleEditEvent = (title, descricao) => {
    if (!selectedEvent || !selectedEvent.event) {
      return;
    }
  
    const eventId = selectedEvent.event.id;
    const newStart = moment(selectedEvent.event.start).format('YYYY-MM-DD HH:mm:ss');
    const newEnd = moment(selectedEvent.event.end).format('YYYY-MM-DD HH:mm:ss');
    const allDay = selectedEvent.event.allDay;
    
  
    const updatedEvent = {
      title,
      start: newStart,
      end: newEnd,
      allDay,
      descricao,
      
    };
  
    axios
      .put(`http://localhost:3001/editTarefa/${eventId}`, updatedEvent)
      .then((response) => {
        if (response.status === 200) {
          fetchUpdatedEvents();
          setIsDialogOpen2(false);
        }
      })
      .catch((error) => {
        console.error('Erro ao editar o evento:', error);
      });
  };
  
  const fetchUpdatedEvents = () => {
    axios
      .get(`http://localhost:3001/getTarefa`)
      .then((response) => {
        setCurrentEvents(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter os eventos:', error);
      });
  };
  
  

  const handleEventDrop = (dropInfo) => {
    const eventId = dropInfo.event.id;
    const title = dropInfo.event.title;
    const newStart = dropInfo.event.startStr;
    const newEnd = dropInfo.event.endStr;
    const allDay = dropInfo.event.allDay;
    const descricao = dropInfo.event.extendedProps.descricao; // Adicione esta linha para obter a descrição do evento
  
    const updatedEvent = {
      title,
      start: newStart,
      end: newEnd,
      allDay,
      descricao, // Inclua a descrição no objeto updatedEvent
    };
  
    axios
      .put(`http://localhost:3001/editTarefa/${eventId}`, updatedEvent)
      .then((response) => {
        if (response.status === 200) {
          console.log('Evento atualizado com sucesso');
        }
      })
      .catch((error) => {
        console.error('Erro ao atualizar o evento:', error);
      });
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };


  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          locale="pt-br"
          timeZone="America/Sao_Paulo"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          events={currentEvents}
        />
      </div>
      {isDialogOpen && (
        <FormDialog open={isDialogOpen} onClose={handleDialogClose} onSave={handleDialogSave} />
      )}
      {isDialogOpen2 && (
        <TaskDialog
          open={isDialogOpen2}
          onClose={handleDialogClose}
          onDelete={handleDeleteEvent}
          onSave={handleEditEvent}
          props={selectedEvent}
        />
      )}
    </div>
  );
}

export default Calendar;

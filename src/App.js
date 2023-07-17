import "./App.css";
import add from "./images/Vector.png";
import arrow from "./images/Vector.svg";
import deleteButton from "./images/Vector2.svg";
import circle from "./images/akar-icons_circle.svg";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function formatSelectedDate(selectedDate) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (selectedDate.toDateString() === today.toDateString()) {
    return `Today ${selectedDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else if (selectedDate.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow ${selectedDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else if (selectedDate.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${selectedDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else {
    return selectedDate.toLocaleString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
}

function App() {
  const [time, setTime] = useState(new Date());
  const [elements, setElements] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const options2 = { weekday: "short", day: "numeric" };
  const dateString = time.toLocaleDateString(undefined, options2);

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const timeString = time.toLocaleTimeString([], options);

  function addElement() {
    if (inputText !== "") {
      const newElement = {
        id: Date.now(),
        plan: inputText,
        time: selectedTime || new Date(),
      };

      setElements([...elements, newElement]);
      setInputText("");
      setSelectedTime(null);
    }
  }

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function handleDelete(id) {
    const updatedElements = elements.filter((element) => element.id !== id);
    setElements(updatedElements);
  }

  function handleDateSelection(date) {
    setSelectedTime(date);
    setShowDatePicker(false);
  }

  function toggleDatePicker() {
    setShowDatePicker(!showDatePicker);
  }
  return (
    <div className="container">
      <h1>Todo</h1>
      <div className="card">
        <div className="image-div">
          <div className="time">
            <p className="day">{dateString}</p>
            <p className="hour">{timeString}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="input-div">
            <input
              type="text"
              className="input"
              placeholder="Note"
              onChange={handleInputChange}
              value={inputText}
            />
            <div className="add-calendar">
              <div className="add" onClick={addElement}>
                <img src={add} alt="add-logo" />
              </div>
              <div className="arrow" onClick={toggleDatePicker}>
                <img src={arrow} alt="arrow" />
              </div>
            </div>
          </div>
          {showDatePicker && (
            <DatePicker
              selected={selectedTime}
              onChange={handleDateSelection}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
            />
          )}
          <div className="list">
            {elements.map((element) => (
              <ListComponent
                key={element.id}
                plan={element.plan}
                time={formatSelectedDate(element.time)}
                onDelete={() => handleDelete(element.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
function ListComponent(props) {
  return (
    <div className="component">
      <div className="texts">
        <p className="plan">{props.plan}</p>
        <p className="todo-time">{props.time}</p>
      </div>
      <div className="delete-circle">
        <img src={circle} alt="circle" className="circle" />
        <img
          src={deleteButton}
          alt="delete"
          className="delete"
          onClick={props.onDelete}
        />
      </div>
    </div>
  );
}

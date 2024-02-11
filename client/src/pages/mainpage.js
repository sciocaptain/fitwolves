import React, { useState, useEffect } from 'react';

const Mainpage = () => {

    // Dummy data for the calendar grid
    const calendarData = [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, null, null, null],
    ];

    const calendarLabels = [
        ['29', '30', '31', '01', '02', '03', '04'],
        ['05', '06', '07', '08', '09', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18'],
        ['19', '20', '21', '22', '23', '24', '25'],
        ['26', '27', '28', '29', '01', '02', '03'],
    ];



    // State to keep track of the selected day
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);

    // Function to handle day click
    const handleDayClick = (day, weekIndex) => {
        if (day !== null) {
            setSelectedDay(day);
            setSelectedWeek(weekIndex);
        }
    };

    // Array of day labels
    const dayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const dayAbbreviations = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];


    // Month and year
    const month = 'February';
    const year = 2024;

    // Calculate the start date of the selected week
    const startDate = selectedDay !== null ? selectedDay - (new Date().getDay() - 1) : null;

    // Generate an array of dates for the selected week
    var weekDates = [];

    if (startDate !== null) {
        weekDates = calendarLabels[selectedWeek]
    }

    const calendarDates = weekDates.map((date, index) => (
        <div key={index} className="calendar-date">
            {date}
            <div className="day-of-week">
                {dayAbbreviations[index]}
            </div>
        </div>
    ));

    // Reset selectedDay and selectedWeek on component mount
    useEffect(() => {
        setSelectedDay(null);
        setSelectedWeek(null);
    }, []);

    return (
        <div id = "calendar-bg">
            <div id="calendar-sidebar">
                <div id = "mini-calendar">
                    <div id = "calendar-month">{month} {year}</div>
                    <div id="calendar-header" className="calendar-week">
                        {dayLabels.map((label, index) => (
                            <div key={index} className="calendar-day">{label}</div>
                        ))}
                    </div>
                    <div id="calendar-grid">
                        {calendarData.map((week, weekIndex) => (
                            <div
                                key={weekIndex}
                                className={`calendar-week ${selectedWeek === weekIndex ? 'selected' : ''}`}
                            >
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className={`calendar-day ${day === null ? 'empty' : ''} ${selectedDay === day ? 'selected' : ''}`}
                                        onClick={() => handleDayClick(day, weekIndex)}
                                    >
                                        {day}
                                        {selectedDay === day && <div className="circle"></div>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id = "major-calendar-header">
                <div id="major-calendar-label-holder">
                    {calendarDates}
                </div>
            </div>
            <div id = "major-calendar-timesheet">
                <img id = "timesheet-template"></img>
            </div>
        </div>
    );
};

export default Mainpage;

import React, { useState, useEffect } from 'react';
import mealData from './greenwich.json';
const Mainpage = () => {

    const [jsonData, setJsonData] = useState(null);

    // Dummy data for the calendar grid
    const calendarData = [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, null, null, null],
    ];
      
    const heightOffsets = [
        [0.123, 0.456, 0.789, 0.321, 0.654, 0.987, 0.135],
        [0.246, 0.579, 0.912, 0.345, 0.678, 0.012, 0.345],
        [0.678, 0.901, 0.234, 0.567, 0.890, 0.123, 0.456],
        [0.789, 0.012, 0.345, 0.678, 0.901, 0.234, 0.567],
        [0.901, 0.234, 0.567, 0.890, 0.123, 0.456, 0.789],
    ];
    const translateDay = new Map();
    translateDay.set('MON','Monday');
    translateDay.set('TUE','Tuesday');
    translateDay.set('WED','Wednesday');
    translateDay.set('THU','Thursday');
    translateDay.set('FRI','Friday');
    translateDay.set('SAT','Saturday');
    translateDay.set('SUN','Sunday');



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
    const [currentDay, setCurrentDay] = useState(null);
    const [currentMeal, setCurrentMeal] = useState(null);

    const [foodName, setFoodName] = useState(null);
    const [foodCarbs, setFoodCarbs] = useState(null);
    const [foodProtein, setProtein] = useState(null);
    const [foodFat, setFat] = useState(null);
    const [foodCalories, setCalories] = useState(null);

    const [foodName2, setFoodName2] = useState(null);
    const [foodCarbs2, setFoodCarbs2] = useState(null);
    const [foodProtein2, setProtein2] = useState(null);
    const [foodFat2, setFat2] = useState(null);
    const [foodCalories2, setCalories2] = useState(null);

    const [foodName3, setFoodName3] = useState(null);
    const [foodCarbs3, setFoodCarbs3] = useState(null);
    const [foodProtein3, setProtein3] = useState(null);
    const [foodFat3, setFat3] = useState(null);
    const [foodCalories3, setCalories3] = useState(null);

    // Function to handle day click
    const handleDayClick = (day, weekIndex) => {
        if (day !== null) {
            setSelectedDay(day);
            setSelectedWeek(weekIndex);
        }
    };

    const handleMealClick = (meal, day) => {
        setCurrentMeal(meal);
        setCurrentDay(day);
        setFoodName(getMealArray(meal, translateDay.get(day))[0]["name"]);
        setFoodCarbs(evenSpace("Carbohydrates:",20) + getMealArray(meal, translateDay.get(day))[0]["carbs"]);
        setProtein(evenSpace("Protien:",20) + getMealArray(meal, translateDay.get(day))[0]["protein"]);
        setFat(evenSpace("Fat:",20) + getMealArray(meal, translateDay.get(day))[0]["fat"]);
        setCalories(evenSpace("Calories:",20) + getMealArray(meal, translateDay.get(day))[0]["calories"]);

        setFoodName2(getMealArray(meal, translateDay.get(day))[1]["name"]);
        setFoodCarbs2(evenSpace("Carbohydrates:",20) + getMealArray(meal, translateDay.get(day))[1]["carbs"]);
        setProtein2(evenSpace("Protien:",20) + getMealArray(meal, translateDay.get(day))[1]["protein"]);
        setFat2(evenSpace("Fat:",20) + getMealArray(meal, translateDay.get(day))[1]["fat"]);
        setCalories2(evenSpace("Calories:",20) + getMealArray(meal, translateDay.get(day))[1]["calories"]);

        setFoodName3(getMealArray(meal, translateDay.get(day))[2]["name"]);
        setFoodCarbs3(evenSpace("Carbohydrates:",20) + getMealArray(meal, translateDay.get(day))[2]["carbs"]);
        setProtein3(evenSpace("Protien:",20) + getMealArray(meal, translateDay.get(day))[2]["protein"]);
        setFat3(evenSpace("Fat:",20) + getMealArray(meal, translateDay.get(day))[2]["fat"]);
        setCalories3(evenSpace("Calories:",20) + getMealArray(meal, translateDay.get(day))[2]["calories"]);
    };

    function getMealArray(meal, day){
        for(let i = 0; i < mealData.length; i++){
            if(mealData[i]["date"] == day){
                return mealData[i][meal]
            }
        }
    }

    function evenSpace(text, length) {
        const spacesToAdd = length - text.length;
        return text + " ".repeat(spacesToAdd);
    }
    
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

    const breakfastOption = weekDates.map((date, index) => (
        <div className="calendar-date">
            <div className="breakfastOption" style = {{top: heightOffsets[date % 4][index]*5 + "vw", height: heightOffsets[date % 4][index]*7 + 4 + "vw" }} onClick={() => handleMealClick('breakfast', dayAbbreviations[index])}>
                Breakfast
            </div>
            <div className="lunchOption" style = {{top: heightOffsets[date % 4][index]*10 + 30 + "vw", height: heightOffsets[date % 4][index]*7 + 4 + "vw" }} onClick={() => handleMealClick('lunch', dayAbbreviations[index])}>
                Lunch
            </div>
            <div className="dinnerOption" style = {{top: heightOffsets[date % 4][index]*5 + 50 + "vw", height: heightOffsets[date % 4][index]*7 + 4 + "vw"  }} onClick={() => handleMealClick('dinner', dayAbbreviations[index])}>
                Dinner
            </div>
        </div>
    ));
    
    const getMeal = () => {
        if (!mealData || !currentDay || !currentMeal) {
            return null; // Return null if mealData, currentDay, or currentMeal is not available
        }

        const day = currentDay.toLowerCase();
        const meal = currentMeal.toLowerCase();
        if (!(day in mealData) || !(meal in mealData[day])) {
            return 'Meal not found'; // Handle case when day or meal is not found
        }

        return mealData[day][meal];
    };

    // Call getMeal() to retrieve the meal based on currentDay and currentMeal
    const selectedMeal = getMeal();
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
                <div id = "Show-info">
                    <div id = "titleShow">{foodName}</div>
                    <div id = "infoFood">
                        <br></br>
                        {foodCalories}
                        <br></br>
                        {foodFat}
                        <br></br>
                        {foodCarbs}
                        <br></br>
                        {foodProtein}
                    </div>
                    <br></br>
                    <br></br>
                    <div id = "titleShow">{foodName2}</div>
                    <div id = "infoFood">
                        <br></br>
                        {foodCalories2}
                        <br></br>
                        {foodFat2}
                        <br></br>
                        {foodCarbs2}
                        <br></br>
                        {foodProtein2}
                    </div>
                    <br></br>
                    <br></br>
                    <div id = "titleShow">{foodName3}</div>
                    <div id = "infoFood">
                        <br></br>
                        {foodCalories3}
                        <br></br>
                        {foodFat3}
                        <br></br>
                        {foodCarbs3}
                        <br></br>
                        {foodProtein3}
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
                <div id = "timesheet-boundary">
                    {breakfastOption}
                </div>
            </div>
        </div>
    );
};

export default Mainpage;

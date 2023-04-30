"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: christopher
   Date:  

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

// set the date diplayed in the calendar
let thisDay = new Date();

// write the calendar table to the element with the id of "calendar"
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// definition of the function that generates the calendar table
function createCalendar(calDate) {
   let calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   // return statement that hands data off to the script
   return calendarHTML;
} // end of createCalendar()

// definition of the function to write the calendar caption
function calCaption(calDate) {
   // monthName array contains the list of month names
   let monthName = ["january", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   // determine the numeric value of the current month
   let thisMonth = calDate.getMonth();
   // determine the current yaer of the date given
   let thisYear = calDate.getFullYear();
   // use those variable to write the table caption
   return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
} // end of the calCaption() function

// definition of a function to write a table row with the weekday abbreviations
function calWeekdayRow() {
   // array of weekday abbreviations
   let dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   let rowHTML = "<tr>";

   // loop through the dayName array
   for(let i = 0; i < dayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   } // end of for loop


   rowHTML += "</tr>";
   // send the rowHTML data that this function built back to the rest of the script
   return rowHTML;
} // end of calWeekdayRow() function

// definition of the function to calculate the number of days in the month
function daysInMonth(calDate) {
   // array of days in each month
   let dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   // extract he four digit year and month values
   let thisYear = calDate.getFullYear();
   let thisMonth = calDate.getMonth();

   // revise the days for february for leap years
   if (thisYear % 4 === 0) {
      if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
         dayCount[1] = 29;
      }
   }
   // return the number of days for the given month
   return dayCount[thisMonth];
} // end of the daysInMonth() function

// definition of the function to write the table rows for each day in the month
function calDays(calDate) {
   // determine the starting day of the month
   let day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   let weekDay = day.getDay();

   // write blank cells preceding the starting day
   let htmlCode = "<tr>";
   for(let i = 0; i < weekDay; i++) {
      htmlCode += "<td></td>"
   }
   // write cells for each actual day in the month
   let totalDays = daysInMonth(calDate);
   let highlightDay = calDate.getDate();
   for(let i = 1; i <= totalDays; i++) {
      day.setDate(i);
      weekDay = day.getDay();
      // loop must decide to end a <tr> when its saturday and start a new <tr> when its sunday
      if(weekDay === 0) {
         htmlCode += "<tr>";
      }

     if(i === highlightDay) {
       htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";
     } else {
        htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
     }

      if(weekDay === 6) {
         htmlCode += "</tr>";
      }
   } // end of totalDays loop
   return htmlCode;
} // end of calDays() function
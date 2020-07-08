import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
          selectedDay: undefined,
        };
      }
    
    handleDayClick(day, { selected, disabled }) {
        if (disabled) {          
          return;
        }
        if (selected) {
          
          this.setState({ selectedDay: undefined });
          return;
        }
        this.setState({ selectedDay: day});
        this.props.selectChapter(day);
    }
    
    render() {
        const{sendDates}=this.props
        let newDates=[]; let markedDate=[]
          
          sendDates.map((x)=>{
              let subDates=x.start_time;
              newDates.push(subDates.substr(0,11))
            
          })

          newDates.map((x)=>{
             let pushDate=[]
             let year=[],day=[],month=[]
             year=x.substr(7,10);
            day=x.substr(4,2);
            month=x.substr(0,3);
            
            if(month == "Jan")
            {
                month=0;
               
            }
            else if(month == "Feb")
            {
                month=1;
            }
            else if(month == "Mar")
            {
                month=2;
            } else if(month == "Apr")
            {
                month=3;
            } else if(month == "May")
            {
                month=4;
            } else if(month == "Jun")
            {
                month=5;
            } else if(month == "Jul")
            {
                month=6;
            } else if(month == "Aug")
            {
                month=7;
            }else if(month == "Sep")
            {
                month=8;
            }else if(month == "Oct")
            {
                month=9;
            }else if(month == "Nov")
            {
                month=10;
            }else if(month == "Dec")
            {
                month=11;
            }
            
         markedDate.push(new Date(year, month, day))
            
          })

        const birthdayStyle = `.DayPicker-Day--highlighted {
            background-color: orange;
            color: white;
        }`
        const modifiers = {
            highlighted: markedDate
          };
        
        return (
          <div>
          <style>{birthdayStyle}</style>
            <DayPicker
             modifiers={modifiers}
             selectedDays={this.state.selectedDay}
             onDayClick={this.handleDayClick}/>
            {this.state.selectedDay ? (
              <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
            ) : (
              <p>Please select a day.</p>
            )}
          </div>
        );
      }
}
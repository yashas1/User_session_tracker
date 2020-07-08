import React, { Component } from 'react'
import axios from 'axios'
import Calendar from "./Calendar"
 class Login_Details extends Component {
   
    constructor(props){
        super(props)
       
           this.state={
             User_Id:[],
             activity_periods:[],
             Members:[],
             ClanderDate:[],
             dateSelected:false,
             isActive:false,
             isShow:true
                        
           }
       }
      
    componentWillReceiveProps(nextProps) {
       
        this.setState({ isShow: !this.state.isShow});
            if (nextProps.User_Id !== this.state.User_Id) {
                this.setState({ User_Id: nextProps.User_Id});
            
                    axios({
                    url: 'http://localhost:9000/api/user/',
                    method: 'get'
                    })
                    .then(response => {
             
                    this.setState({Members: response.data.members})
                    }) 
                    .catch(err => {
                
            })
    
            }
   
        }
     
    handleDayClick=(day)=>{
        var x=String(day)
       
        this.setState({dateSelected:!this.state.dateSelected})
        this.setState({ClanderDate:x.substr(4, 11)})
     
        }
       handleShow = ()=>{
            this.setState({
                isActive: true
            })
        }
         

    render() {
        let{activity_periods,User_Id,Members,ClanderDate,dateSelected} = this.state;
        let sendDates=[]
        var today = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
        const dyasNames = ["01", "02", "03", "04", "05", "06",
             "07", "08", "09", "10", "11", "12","13","14","15","16","17","18","19","20",
             "21","22","23","24","25","26","27","28","29","30","31"
            ];     
        var Today= monthNames[today.getMonth()]+' '+dyasNames[today.getDate()-1]+' '+today.getFullYear();    
        let Clicked_User=[];let User_name=[];
        Clicked_User= Members.filter((User)=> {           
            return User.id == User_Id;
         })
        
        Clicked_User.map((x)=>{
            User_name=x.real_name;
            activity_periods=x.activity_periods;
            sendDates=x.activity_periods;
        })

        activity_periods= activity_periods.filter((dates)=>{              
            if(dateSelected)
            {             
                return dates.start_time.includes(ClanderDate)
            }
           else{
            return dates.start_time.includes(Today)
           }
                        
        })
   
        return (
            
            <div>
            <div><h3>Session Details</h3></div>   
            <div><h5> {User_name}</h5></div>   
            <ul style={{listStyleType: "none",paddingLeft:"10px"}}>

                {activity_periods.map(x => (
                      
                <li style={{paddingTop:"10px"}} value={x.id} key={x.id}>
                    <div className="card" style={{ borderRadius:"1.25rem",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "}}>
                        <div className="card-body" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "}}>
       
                            <div style={{fontFamily:"Arial",fontSize:"14px",color:"#1569C7" }}><span style={{color:"#ff3399"}}><b>Start Time: {x.start_time} -- </b></span> <b>End Time: {x.end_time}</b> </div>

                        </div>
                    </div>
                </li>
                ))}


            </ul>
            
            {this.state.isActive ? (<Calendar selectChapter ={this.handleDayClick} sendDates={sendDates}/>) : null }

            {this.state.isShow ? (<button className="btn btn-success" onClick={this.handleShow}>Show Calendar</button>): null}
         
            
            </div>
        )
    }
}
export default Login_Details;

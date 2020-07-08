import React, { Component } from 'react'
import axios from 'axios'
import Calendar from "./Calendar"
 class Login_Details extends Component {
   
    constructor(props){
        super(props)
       
           this.state={
             User_Id:[],
             activity_periods:[],
             Members:[]
            
           }
       }

    componentWillReceiveProps(nextProps) {
        
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
                console.log(err);
            })
    
       }
   
        }

    render() {
        let{activity_periods,User_Id,Members} = this.state;
        var today = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
             ];
        var date = monthNames[today.getMonth()]+' '+today.getDate()+' '+today.getFullYear(); 
        
        let Clicked_User=[];let User_name=[];
 
        Clicked_User= Members.filter((User)=> {
            return User.id == User_Id;
        })
        
        Clicked_User.map((x)=>{
            User_name=x.real_name;
            activity_periods=x.activity_periods;
            activity_periods= activity_periods.filter((dates)=>{
                
               return dates.start_time.includes(date)
                
                  
            })
            
        })
        return (
            <div>
            <div><h3>Today Session Details</h3></div>   
            <div><h5> {User_name}</h5></div>   
            <ul style={{listStyleType: "none",paddingLeft:"10px"}}>

                {activity_periods.map(x => (
                      
                <li style={{paddingTop:"10px"}} value={x.id} key={x.id} onClick={e=>this.handleChange(x.id)}>
                    <div className="card" style={{ borderRadius:"1.25rem",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "}}>
                        <div className="card-body" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "}}>
       
                            <div style={{fontFamily:"Arial",fontSize:"10px",color:"#1569C7" }}><span style={{color:"#ff3399"}}>Start Time: <b>{x.start_time} -- </b></span> End Time <b>{x.end_time}</b> </div>

                        </div>
                    </div>
                </li>
                ))}


            </ul>
            <Calendar/>
            </div>
        )
    }
}
export default Login_Details;
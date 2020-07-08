import React, { Component } from 'react'
import axios from 'axios'
import Header from './Template/Header'
import Login_Details from "./Login_Details"
 class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }
    state={
       User_Id:[],
       User_Name:[],
       Members:[],
       activity_periods:[]
        }


    componentDidMount()
    {
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
    
    handleChange=(e)=>{
        this.setState({User_Id:e})
         
     }
    render() {

        const{Members,User_Id} = this.state;
       
        return (
             <div>
               <div className="container" >
                  <Header/>  
                    <div className="row">  
                        <div className="col-md-6">  
                            <ul style={{listStyleType: "none",paddingLeft:"10px"}}>

                                {Members.map(User_data => (
              
                                <li style={{paddingTop:"10px"}} value={User_data.id} key={User_data.id} onClick={e=>this.handleChange(User_data.id)}>
                                    <div className="card" style={{ borderRadius:"1.25rem",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "}}>
                                        <div className="card-body" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "}}>
                                            <img  className="rounded-circle" src="https://www.advantageschools.co.uk/wp-content/uploads/2018/11/Generic-Male-Avatar-No-Profile-Picture.png" style={{width:'45px'}}></img>
     
                                            <div style={{fontFamily:"Arial",fontSize:"10px",color:"#1569C7" }}><span style={{color:"#ff3399"}}><b>User Name - </b></span><b>{User_data.real_name}</b> </div>
                
                                            <div style={{fontFamily:"Arial",fontSize:"15px" ,color:"#7575a3" }}><i className="fa fa-clock-o" style={{color:"#3399ff"}}></i> User Id -  {User_data.id} </div>
                              
                                        </div>
                                    </div>
                                </li>
                                ))}

      
                            </ul>
            
                        </div>
           
                    <div className="col-md-6"> 
                     <Login_Details User_Id={User_Id}/>
                    </div>
                    </div> 
                </div>
            </div>
            )
    }
}
export default MainComponent
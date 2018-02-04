import PropTypes from 'prop-types'
import React from "react";

var taskListUrl = "http://localhost:8080/ToDoAppServer/ShowTask/";
var deleteTaskUrl = "http://localhost:8080/ToDoAppServer/DeleteTask";
var updateTaskUrl = "http://localhost:8080/ToDoAppServer/UpdateTask";
var addTaskUrl = "http://localhost:8080/ToDoAppServer/AddNewTask";

export class Task extends React.Component{
    
    constructor(props){
        super();
        this.state = { 
            data: [],
            value: "",
            isActive: "1"
        }
    }

    componentDidMount() {
      this.getTask(taskListUrl+"A");
    }

    updateTask(taskID, taskType){
        fetch(updateTaskUrl,{
            method: "post",
            body: JSON.stringify({taskID: taskID,taskType: taskType})
          })
          .then(response => {
            
            if(this.state.isActive == "1")
                this.getTask(taskListUrl+"A");
            else if(this.state.isActive == "2")
                this.getTask(taskListUrl+"P");
            else
                this.getTask(taskListUrl+"C");
          })
          .catch((error) => {
              console.log(error);
        });
    }

    deleteTask(taskID){
        fetch(deleteTaskUrl,{
            method: "post",
            body: taskID
          })
          .then(response => {
            if(this.state.isActive == "1")
                this.getTask(taskListUrl+"A");
            else if(this.state.isActive == "2")
                this.getTask(taskListUrl+"P");
            else
                this.getTask(taskListUrl+"C");
          })
          .catch((error) => {
              console.log(error);
        });
    }

    getTask(url){
        var activeLine = "";

        if(url.slice(-1) == "A")
            activeLine ="1";
        else if(url.slice(-1) == "P")
            activeLine ="2";
        else
            activeLine ="3";

        fetch(url,{
          method: "post",
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
                     
            this.setState({
                data: json,
                isActive: activeLine
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleChange(event) {
                
        this.setState({
            value: event.target.value
        });
    }
    
    addTask(event) {
        fetch(addTaskUrl,{
            method: "post",
            body: this.state.value
          })
          .then(response => {
            
            if(this.state.isActive == "1")
                this.getTask(taskListUrl+"A");
            else if(this.state.isActive == "2")
                this.getTask(taskListUrl+"P");
            else
                this.getTask(taskListUrl+"C");

            this.setState({
            value: ""
        });
            
          })
          .catch((error) => {
              console.log(error);
        });
        event.preventDefault();
    }
     
    render(){

        const TaskRow = (props) => {

            var imageType = "";
            if(props.data.taskType == "P")
                imageType = require('../images/pending.png');
            else
            imageType = require('../images/completed.png');
            
            return (
              <tr className="trStyle">
                <td className="tdStyle">
                <img src={imageType} className="imgStyle" name="taskStatus" id="taskStatus" width="20px" height="20px" onClick={() =>this.updateTask(props.data.taskID, props.data.taskType)}/>
                </td>
                <td className="tdStyle" width="800px">
                  { props.data.taskDescription }
                </td>
                <td className="tdStyle">
                <img src={require('../images/remove.png')} name="delete" id="delete" width="20px" className="imgStyle" height="20px" onClick={() =>this.deleteTask(props.data.taskID)}/>
                </td>
              </tr>
            );
        }

        let rows = this.state.data.map(task => {
            return <TaskRow key = {
              task.taskID
            }
            data = {
              task
            }
            />
        })

        return(
            <div>
                <div className="flex" align="center">
                    <div id="add-task" className="container">
                        <form onSubmit={this.addTask.bind(this)}>
                            <div>
                                <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} className="textBoxStyle" placeholder="What's on your mind..."/>
                            </div>
                            <button type="submit" className="submitStyle">Submit</button>
                        </form>
                    </div>
                </div>
                <header className="headerStyle" align="center">
                    <nav style={{width:235+'px'}}>
                        <a href="#" className={this.state.isActive =="1" ? 'activeClass' : 'linkStyle'}  onClick={() => this.getTask('http://localhost:8080/ToDoAppServer/ShowTask/A')}>All Task</a><label className="linkStyle">&nbsp;/&nbsp;</label>
                        <a href="#" className={this.state.isActive =="2" ? 'activeClass' : 'linkStyle'}  onClick={() => this.getTask('http://localhost:8080/ToDoAppServer/ShowTask/P')}>Pending</a><label className="linkStyle">&nbsp;/&nbsp;</label>
                        <a href="#" className={this.state.isActive =="3" ? 'activeClass' : 'linkStyle'}  onClick={() => this.getTask('http://localhost:8080/ToDoAppServer/ShowTask/C')}>Completed</a>
                    </nav>
                </header>
                <div className="taskListStyle" align="center">
                    <table className="tableStyle">
                        <tbody>{rows}</tbody> 
                    </table>
                </div>       
            </div>
        ); 
    }
}
 
/* Home.PropTypes = {
    greet: React.PropTypes.func,
} */
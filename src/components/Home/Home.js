import React, { useState,useEffect } from "react";
import { 
  Container,
  Grid, 
  Form, 
  Segment, 
  Input, 
  Button, 
  Header, 
  Table, 
  Icon
} from "semantic-ui-react";
import firebase from "../../firebase";
import "./Home.css";

const Home = () => {

  const [aFirstName, setAFirstName] = useState("");
  const [aLastName, setaLastName] = useState("");
  const [userData,setUserData] = useState([]);
  const [uFirstName, setuFirstName] = useState("");
  const [uLastName, setuLastName] = useState();
  const [userId, setuserId] = useState("")

  useEffect(() => {
    const firestore = firebase.database().ref("/UserInfo");
    firestore.on("value",(response)=>{
      const data = response.val();
      let userInfo = [];
      for(let id in data){
        userInfo.push({
          id:id,
          FirstName:data[id].FirstName,
          LastName:data[id].LastName,
        });
      }
      setUserData(userInfo);
      console.log(userInfo);
    });
  },[])

  const handleAddUser = () => {
      const firestore = firebase.database().ref("/UserInfo");
      let data = {
        FirstName: aFirstName,
        LastName: aLastName
      } 
      firestore.push(data);
      setAFirstName("");
      setaLastName("");
  }

  const handleUpdateUser = () => {
    const firestore = firebase.database().ref("/UserInfo").child(userId);
    firestore.update({
      FirstName:uFirstName,
      LastName:uLastName
    })
    setuFirstName("");
    setuLastName("");
  };

  const handleUpdateClick = (data) => {
    setuFirstName(data.FirstName);
    setuLastName(data.LastName);
    setuserId(data.id);

  }

  const handleDelete = (id) => {
    const firestore = firebase.database().ref("/UserInfo").child(id);
    firestore.remove();

  }


  return (
    // <div class="ui hidden divider">
      <div className="container">
      <Container>
        <Header><h1>Data Entry</h1></Header>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
              <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>FirstName</label>
                    <Input 
                      placeholder="FirstName" 
                      focus 
                      value={aFirstName} 
                      onChange={(e)=>{
                        setAFirstName(e.target.value);
                      }} 
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>LastName</label>
                    <Input 
                    placeholder="LastName" 
                    focus 
                    value={aLastName} 
                    onChange={(e)=>{
                      setaLastName(e.target.value);
                      }} 
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={()=>{handleAddUser()}} positive>
                      <Icon name="add circle"></Icon>
                      Add User</Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
            <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>FirstName</label>
                    <Input 
                      placeholder="FirstName" 
                      focus 
                      value={uFirstName} 
                      onChange={(e)=>{
                        setuFirstName(e.target.value);
                      }} 
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>LastName</label>
                    <Input 
                    placeholder="LastName" 
                    focus 
                    value={uLastName} 
                    onChange={(e)=>{
                      setuLastName(e.target.value);
                      }} 
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={()=>{handleUpdateUser()}} primary>
                      <Icon name="edit"></Icon>
                      Update User</Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="1">
            <Grid.Column>
              {
                userData.length == 0 ? (<Segment padded="very">
                  <Header textAlign="center">
                    Oops! There is no data available. Please Enter some data.
                  </Header>
                </Segment>) : 
                (<Segment padded="very">
                    <Table celled fixed singleLine>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>FirstName</Table.HeaderCell>
                          <Table.HeaderCell>LastName</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      {
                        userData.map((data,index)=>{
                          return <Table.Body>
                            <Table.Cell>{data.FirstName}</Table.Cell>
                            <Table.Cell>{data.LastName}</Table.Cell>
                            <Table.Cell>
                              <Button onClick={()=>{handleUpdateClick(data)}} primary>
                                <Icon name="edit" ></Icon>
                                Update
                              </Button>
                              <Button color="red" onClick={()=>{handleDelete(data.id)}}>
                                <Icon name="delete"></Icon>
                                Delete
                              </Button>
                            </Table.Cell>
                          </Table.Body>
                        })
                      }
                    </Table>
                </Segment>)
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../auth';
import { Container, Table, Select, Button, Modal, Form, Input, Grid } from 'semantic-ui-react'
import DeleteIcon from '@material-ui/icons/Delete';

export const Home = () => {
    const history = useHistory();
    const {user} = useAuthState();
    const dispatch = useAuthDispatch();

    const [open, setOpen] = useState(false)
    const [todos,setTodos] = useState([]);
    const [description,setDescription] = useState("");

    useEffect(() => {
        if(user){
            axios.get('/todos')
                .then((res) => setTodos(res.data))
                .catch(err => console.log(err))
        }
    },[user])

    const options = [
        {key:'todo', value: 'To Do', text: 'To Do'},
        {key:'inprogress',value: 'In Progress', text: 'In Progress'},
        {key: 'done', value: 'Done', text: 'Done'}
    ]


    const handleCreate = async (e) => {
        e.preventDefault();

        const res = await axios.post('/todos',{description});
        setDescription("");

        if(res.data && res.data.description){
            setTodos([...todos,res.data]);
        }
    }

    const handleUpdate = async (e,todo_id) => {
        const res = await axios.put('/todos',{status:e.target.innerText,todo_id});

        if(!res.data){
            console.log("error");
        }
    }

    const handleDelete = async (e,todo_id) => {
        e.preventDefault();

        const res = await axios.delete(`/todos/${todo_id}`);
        setTodos(todos.filter((todo) => todo.todo_id !== todo_id));

        console.log(res.data);
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        await axios.get('/logout');
        dispatch({type:"LOGOUT"});

        history.push('/login');
    }
    
    return (
        <Container style={{marginTop: '50px'}}>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={<Button>Create new To Do</Button>}
                            >
                            <Modal.Header>Create new To Do</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Form>
                                    <Form.Field
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        control={Input}
                                        label='Description'
                                        placeholder='Go to the store'
                                    />
                                    </Form>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='black' onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                content="Create !"
                                labelPosition='right'
                                icon='checkmark'
                                onClick={(e) => {
                                    setOpen(false);
                                    handleCreate(e);
                                }}
                                positive
                                />
                            </Modal.Actions>
                        </Modal>        
                    </Grid.Column>

                    <Grid.Column>
                        <Button onClick={handleLogout}>Logout</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {todos && todos.map((todo) => (
                        <Table.Row key={todo.todo_id}>
                            <Table.Cell>{todo.description}</Table.Cell>
                            <Table.Cell><Select placeholder={todo.status} options={options} onChange={(e) => handleUpdate(e,todo.todo_id)}/></Table.Cell>
                            <Table.Cell><Button><DeleteIcon onClick={(e) => handleDelete(e,todo.todo_id)}/></Button></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

        </Container>
    )
}

export default Home;

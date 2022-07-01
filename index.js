const express = require('express');
const server = express();

server.use(express.json());

const persons = ['Ana', 'Antonio', 'Leticia', 'Marcela', 'Marcia', 'Maysa'];

// return unic person base on index of persons
server.get('/persons/:index', (req, res) => {
    const { index } = req.params;
   
    return res.json(persons[index]);
});

// return all persons
server.get('/persons', (req, res) => {
    return res.json(persons);
});

// update persons and add on of array persons
server.post('/persons', (req, res) => {
    const { name } = req.body;
    persons.push(name);
    
    return res.json(persons);
});

// update the name base on index of array persons
server.put('/persons/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    persons[index] = name;
    
    return res.json(persons)
});

//delete one person based on index of array 
server.delete('/persons/:index', (req, res) => {
    const { index } = req.params;
    const person = persons[index];

    persons.splice(index, 1);
    return res.json({ message: `O nome ${person} for removido` });
});

server.listen(3000);

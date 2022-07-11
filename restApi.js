const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const server = express();

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "2.0.0",
        title: "Apresentation REST",
        description: "Persons Api exemplified",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:3000"]
      }
    },
    // ['.routes/*.js']
    apis: ["restApi.js"]
  };  
  
  const PORT = process.env.PORT || 3000;
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const persons = ['Ana', 'Antonio', 'Leticia', 'Marcela', 'Marcia', 'Maysa'];

// Routes
/**
 * @swagger
 * /persons/{index}:
 *  get:
 *    description: Use to request unique persons
 *    responses:
 *      '200':
 *        description: A successful response
 */
server.get('/persons/:index', (req, res) => {
    const { index } = req.params;
   
    return res.json(persons[index]);
});

// Routes
/**
 * @swagger
 * /persons:
 *  get:
 *    description: Use to request all persons
 *    responses:
 *      '200':
 *        description: A successful response
 */
server.get('/persons', (req, res) => {
    return res.json(persons);
});

// Routes
/**
 * @swagger
 * /persons:
 *  post:
 *    description: update persons and add on of array persons
 *    parameters:
 *      - name: name
 *        in: query
 *        description: Name of our person
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: A successful response
 */
server.post('/persons', (req, res) => {
    const { name } = req.body;
    persons.push(name);
    
    return res.json(persons);
});

/**
 * @swagger
 * /persons/{index}:
 *    put:
 *      description:  update the name base on index of array persons
 *    parameters:
 *      - name: name
 *        in: query
 *        description: Name of our person
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
server.put('/persons/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    persons[index] = name;
    
    return res.json(persons)
});

/**
 * @swagger
 * /persons/{index}:
 *    delete:
 *      description: delete one person based on index of array 
 *    responses:
 *      '200':
 *        description: Successfully remove user
 */
//
server.delete('/persons/:index', (req, res) => {
    const { index } = req.params;
    const person = persons[index];

    persons.splice(index, 1);
    return res.json({ message: `O nome ${person} for removido` });
});

app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}!`)
);

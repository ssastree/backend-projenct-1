const Pool = require('pg').Pool
//se conecta con la BD
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'wall',
  password: 'password',
  port: 5432,
})
// se crean los queries
// coge todos los usuarios
const getUsers = (request, response) => {
    pool.query('SELECT * FROM tabla ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
// coge usuarios por id
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM tabla WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
//crea usuarios y se asegura que no este ningun valor vacio
const createUser = (request, response) => {
    const { nombre, fecha, autor } = request.body
    if (!nombre | !fecha | !autor) {
      response.status(201).send(`No puedes dejar valores vacios, nombre = ${nombre} fecha = ${fecha} autor = ${autor}`)
      console.error('Error en el body enviado (parametro vacio)')
    }
    else {
    pool.query('INSERT INTO tabla (nombre, fecha, autor) VALUES ($1, $2, $3) RETURNING id', 
    [nombre,fecha, autor],
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Datos (nombre: ${nombre} fecha: ${fecha} autor: ${autor}) agregado con la id:${results.rows[0].id} `);
      }
        );
    };
  };
//actualiza usuarios
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { nombre, fecha, autor } = request.body
    if (!nombre | !fecha | !autor) {
      response.status(201).send(`No puedes dejar valores vacios, nombre = ${nombre} fecha = ${fecha} autor = ${autor}`)
      console.error('Error en el body actualizado (parametro vacio)')
    }
    else {
    pool.query(
      'UPDATE tabla SET nombre = $1, fecha = $2, autor = $3 WHERE id = $4',
      [nombre, fecha, autor, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Usuario modificado con la id: ${id}`)
      }
    )
  }
};
// borra usuarios
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM tabla WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Usuario borrado con la id: ${id}`)
    })
}
//se exportan los modulos para importarlos en index
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
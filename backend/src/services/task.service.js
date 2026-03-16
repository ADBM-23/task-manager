const db = require('../config/db');

const getAllTasks = async () => {
  const [rows] = await db.query('SELECT * FROM tasks ORDER BY id DESC');
  return rows;
};

const getTaskById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0];
};

const createTask = async ({ titulo, descripcion, estado }) => {
  const [result] = await db.query(
    'INSERT INTO tasks (titulo, descripcion, estado, fecha_creacion) VALUES (?, ?, ?, NOW())',
    [titulo, descripcion, estado]
  );
  return result;
};

const updateTask = async (id, { titulo, descripcion, estado }) => {
  const [result] = await db.query(
    'UPDATE tasks SET titulo = ?, descripcion = ?, estado = ? WHERE id = ?',
    [titulo, descripcion, estado, id]
  );
  return result;
};

const deleteTask = async (id) => {
  const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

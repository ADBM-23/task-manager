const taskService = require('../services/task.service');

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { titulo, descripcion, estado } = req.body;

    if (!titulo || !descripcion || !estado) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await taskService.createTask({ titulo, descripcion, estado });

    res.status(201).json({
      message: 'Tarea creada correctamente',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { titulo, descripcion, estado } = req.body;
    const id = req.params.id;

    if (!titulo || !descripcion || !estado) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await taskService.updateTask(id, { titulo, descripcion, estado });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Tarea actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea', error: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};

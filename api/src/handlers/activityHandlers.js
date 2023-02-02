const {
  createActivity,
  getActivity,
  findActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

const createActivityHandler = async (req, res) => {
  //Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
  //Crea una actividad turística en la base de datos, relacionada con los países correspondientes
  const { name, difficulty, duration, season } = req.body;
  try {
    if (!name || !season) {
      throw Error("Falta enviar datos necesarios");
    }
    const newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season
    );
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getActivityHandler = async (req, res) => {
  //traer la actividad por nombre o todas las actividades
  const { name } = req.query;
  let activity;
  try {
    if (name) {
      activity = await findActivity(name);
    } else {
      activity = await getActivity();
    }
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getActivityByIdHandler = async (req, res) => {
  //esta funcion traera todas las actividades creadas
  const { id } = req.params;
  try {
    const findAct = await getActivityById(id);
    res.status(201).json(findAct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateActivityHandler = async (req, res) => {
    const { id } = req.params;
    const { name, difficulty, duration, season} = req.body;
    try {
      const activity = await getActivityById(id);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      const updatedActivity = await updateActivity(id, name, difficulty, duration, season);
      res.status(201).json(updatedActivity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


const deleteActivityHandler = (req, res) => {
  //Eliminar una actividad con el ID
  res.send("llamara a controller deleteActivity");
};

module.exports = {
  createActivityHandler,
  getActivityHandler,
  getActivityByIdHandler,
  updateActivityHandler,
  deleteActivityHandler,
};

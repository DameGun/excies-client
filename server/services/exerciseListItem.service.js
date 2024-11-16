import { Sequelize } from "sequelize";
import Exercise from "../models/exercise.model.js";
import ExerciseListItem from "../models/exerciseListItem.model.js";
import DetailedExerciseListItem from "../models/detailedExerciseListItem.model.js";
import NotFoundError from "../utilities/errors/notFoundError.js";
import ExerciseTranslated from "../models/exerciseTranslated.model.js";

async function findAll(list_id, language) {
  const subQuery = Sequelize.literal(`(
    SELECT MIN(date)
    FROM detailed_exercise_list_item
    WHERE 
      detailed_exercise_list_item.list_item_id = exercise_list_item.id
  )`);

  const entity = await ExerciseListItem.findAll({
    where: {
      list_id: list_id,
    },
    include: [
      {
        model: Exercise,
        attributes: ["id"],
        include: {
          model: ExerciseTranslated,
          attributes: ["name"],
          where: { language },
        },
      },
      {
        model: DetailedExerciseListItem,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [Sequelize.col("exercise.exercise_translations.name"), "name"],
        [
          Sequelize.fn("calculate_date_interval", subQuery),
          "last_time_updated",
        ],
      ],
    },
  });

  const mappedEntity = entity.map((item) => {
    const { exercise, ...rest } = item.get();
    return rest;
  });

  return mappedEntity;
}

async function findByPk(id, language) {
  const subQuery = Sequelize.literal(`(
    SELECT MIN(date)
    FROM detailed_exercise_list_item
    WHERE 
      detailed_exercise_list_item.list_item_id = exercise_list_item.id
  )`);

  const entity = await ExerciseListItem.findByPk(id, {
    include: [
      {
        model: Exercise,
        attributes: ["id"],
        include: {
          model: ExerciseTranslated,
          attributes: ["name"],
          where: { language },
        },
      },
    ],
    attributes: {
      include: [
        [Sequelize.col("exercise.exercise_translations.name"), "name"],
        [
          Sequelize.fn("calculate_date_interval", subQuery),
          "last_time_updated",
        ],
      ],
    },
  });

  if (entity === null) {
    throw new NotFoundError("exerciseListItem", id);
  }

  const { exercise, ...rest } = entity.get();

  return rest;
}

async function create(list_id, data) {
  data.list_id = list_id;
  return await ExerciseListItem.create(data);
}

async function update(id, data) {
  const entity = await ExerciseListItem.findByPk(id);

  if (entity === null) {
    throw new NotFoundError("exerciseListItem", id);
  }

  await entity.set(data);
  return await entity.save();
}

async function destroy(id) {
  const entity = await ExerciseListItem.findByPk(id);

  if (entity === null) {
    throw new NotFoundError("exerciseListItem", id);
  }

  return await entity.destroy();
}

export default {
  findAll,
  findByPk,
  create,
  update,
  destroy,
};

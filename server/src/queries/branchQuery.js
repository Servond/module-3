const db = require("../models");
const { Op } = require("sequelize");
const branch = db.branch;

// const findBranchByIdQuery = async (id) => {
//   const res = await branch.findByPk(id);
// }

const findBranchesQuery = async (branchName = null) => {
  try {
    const filter = {};
    if (branchName)
      filter.where = {
        branchName: {
          [Op.like]: `%${branchName}%`,
        },
      };
    const res = await branch.findAll({
      include: db.user,
      ...filter,
    });

    return res;
  } catch (err) {
    throw err;
  }
};

const findBranchQuery = async ({ id = null, branchName = null }) => {
  try {
    const params = {};
    if (id) params.id = id;
    if (branchName) params.branchName = branchName;

    const res = await branch.findOne({
      // select branchName from branchs;
      // attributes: ["branchName"],
      where: {
        ...params,
        // branchName: {
        //   [Op.eq]: branchName,
        // },
      },
    });

    return res;
  } catch (err) {
    throw err;
  }
};

const createBranchQuery = async (branchName, address) => {
  try {
    const res = await db.sequelize.transaction(async (t) => {
      await branch.create({
        branchName,
        address,
      });
    });

    return res;
  } catch (err) {
    throw err;
  }
};

const updateBranchQuery = async (id, branchName, address) => {
  try {
    await db.sequelize.transaction(async (t) => {
      await branch.update(
        {
          branchName,
          address,
        },
        {
          where: {
            id: id,
          },
        },
        { transaction: t }
      );
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findBranchesQuery,
  findBranchQuery,
  createBranchQuery,
  updateBranchQuery,
};

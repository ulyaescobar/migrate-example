const { User, Sequelize } = require("./../models");
const Op = Sequelize.Op;
let self = {};


self.getAll = async (req, res) => {
  try {
    let data = await User.findAll({});
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

self.createUser = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName) {
    return res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    let data = await User.create(newUser);
    return res.status(201).json({
      success: true,
      data: data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
    })
  }
}

self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await User.findByPk(id);
    if (data)
      return res.status(200).json({
        success: true,
        data: data
      })
    else
      return res.status(400).json({
        success: false,
        error: "No such User present",
        data: []
      })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

self.updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await User.update(body, {
      where: {
        id: id
      }
    });
    if (data[0] === 0) {
      return res.status(200).json({
        success: false,
        error: "No User found with this id"
      })
    }
    return res.status(200).json({
      success: true,
      "number of rows changed": data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
}

self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await User.destroy({
      where: {
        id: id
      }
    });
    if (data === 1) {
      return res.status(200).json({
        success: true,
        message: `User with id=${id} deleted`
      })
    }
    return res.status(200).json({
      success: false,
      message: `User with id=${id} is not present.`
    })
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error
    })
  }
}

self.deleteAll = async (req, res) => {
  try {
    let data = await User.destroy({
      where: {},
      truncate: true
    });
    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    })
  }
};

module.exports = self;
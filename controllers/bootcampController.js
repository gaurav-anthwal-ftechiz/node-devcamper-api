const Bootcamp = require("../model/Bootcamp");
const ErrorResponse = require('../utils/errorResponse')




// @desc        Post
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};




// @desc        Get all Bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};




// @desc        Get a Bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp is not found with id of ${id}`, 404));
    }

    return res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(new ErrorResponse(`Bootcamp is not found with id of ${req.params.id}`, 404));
  }
};




// @desc        Update Bootcamps
// @route       PUT /api/v1/bootcamps/:id
// @access      private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(203).json({ success: true, data: bootcamp });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};





// @desc        Delete Bootcamps
// @route       DELETE /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bootcamp = await Bootcamp.findByIdAndDelete(id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, msg: "bootcamp deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

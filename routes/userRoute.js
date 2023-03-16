const router = require("express").Router();
const AsyncHandler = require("express-async-handler");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { randomUUID } = require("crypto");
const verifyJWT = require("../middlewares/verifyJWT");
const User = require("../models/userModel");

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/users/");
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split(".")[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});
const upload = multer({ storage: Storage });

//@PGET all users
router.get(
  "/",
  AsyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    // console.log(users);

    // if (_.isEmpty(users)) {
    //   return res.status(404).json("Error fetching user information");
    // }
    res.json(users);
  })
);

//@PGET all users
router.get(
  "/auth",
  verifyJWT,
  AsyncHandler(async (req, res) => {
    res.json(req.session.user);
  })
);

//@GET user by username
router.post(
  "/verify",
  AsyncHandler(async (req, res) => {
    const username = req.body.username;
    const user = await User.findByUsername(username?.trim());

    if (_.isEmpty(user[0])) {
      return res.status(404).json("Invalid Username or Password!");
    }
    const isTrue = bcrypt.compareSync(req.body.password, user[0].password);
    if (!isTrue) {
      return res.status(404).json("Invalid Username or Password!");
    }

    if (user[0].active === false) {
      return res
        .status(404)
        .json(
          "Your account has been disabled! Try contacting your administrator."
        );
    }

    loggedInUser = {
      id: user[0]._id,
      username: user[0].username,
      role: user[0].role,
      active: user[0].active,
    };

    // req.session.user = loggedInUser;

    // const token = jwt.sign(loggedInUser, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    // loggedInUser.token = token;

    res.status(200).json(loggedInUser);
  })
);

//@POST add new user
router.post(
  "/",
  upload.single("profile"),
  AsyncHandler(async (req, res) => {
    const newUser = req.body;
    const username = req.body.username;

    const itExists = await User.findOne({ username });
    if (!_.isEmpty(itExists)) {
      return res
        .status(404)
        .json("An account with this Username already exits!");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    newUser.profile = req.file?.filename;

    const user = await User.create(newUser);

    if (!user) {
      return res.status(404).json("Error Saving user info!");
    }

    res.status(201).json("New user has been added successfully!!!");
  })
);

//@Update User Information
router.put(
  "/",
  AsyncHandler(async (req, res) => {
    const { _id } = req.body;

    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info.Try Again Later.");
    }

    res.status(200).json("User info updated successfully !!!");
  })
);

//@POST Update User profile
router.put(
  "/profile",
  upload.single("profile"),
  AsyncHandler(async (req, res) => {
    const { _id } = req.body;

    const updatedUser = await User.findByIdAndUpdate(_id, {
      $set: {
        profile: req.file?.filename,
      },
    });

    if (_.isEmpty(updatedUser)) {
      return res
        .status(400)
        .json("Error updating profile image.Try again later.");
    }

    res.status(201).json("Profile image updated!!!");
  })
);

//@PUT add new user
router.get(
  "/admin/add",
  AsyncHandler(async (req, res) => {
    const newUser = {
      username: "admin",
      email: "admin@gmail.com",
      password: "admin12345",
      role: "administrator",
      active: true,
    };

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    const user = await User.create(newUser);
    if (!user) {
      return res.status(404).json("Error Saving user info!");
    }

    res.json("hello");
  })
);

//@PUT Reset Password
router.put(
  "/reset",
  AsyncHandler(async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;
    const user = await User.findById(id);

    if (_.isEmpty(user)) {
      return res.status(404).json("User does not exist");
    }
    const isTrue = await bcrypt.compare(oldPassword, user.password);
    if (!isTrue) {
      return res.status(404).json("Password is incorrect!!!");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info.Try Again Later.");
    }

    res.json("User information updated !!!");
  })
);
//@POST Reset User Password
router.post(
  "/reset-password",
  AsyncHandler(async (req, res) => {
    const { id, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info.Try Again Later.");
    }

    res.status(200).json("Password updated !!!");
  })
);

//@PUT Reset Password
router.patch(
  "/admin/reset-password",
  AsyncHandler(async (req, res) => {
    const { id, password } = req.body;
    const user = await User.findById(id);

    if (_.isEmpty(user)) {
      return res.status(404).json("User does not exist");
    }

    const hashedPassword = await bcrypt.hash(password?.trim(), 10);

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info.Try Again Later.");
    }

    res.json("User password updated !!!");
  })
);

router.patch(
  "/",
  AsyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info");
    }

    res.status(200).json(true);
  })
);

router.put(
  "/account",
  AsyncHandler(async (req, res) => {
    const { id, active } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { active },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info");
    }

    res.json(
      updatedUser.active === true
        ? "User account enabled"
        : "User account disabled"
    );
  })
);

//get Token from email
router.post(
  "/token",
  AsyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!_.isEmpty(user)) {
      const uuid = v4();
      const generatedToken = uuid.split("-")[0];
      const { _id, email } = user;

      const token = await Token.findOneAndUpdate(
        _id,
        {
          email,
          userId: _id,
          token: generatedToken,
        },
        {
          new: true,
          upsert: true,
        }
      );

      if (process.env.NODE_ENV === "production") {
        const htmlText = `<div>
      <h2 style='color:#8C1438;text-decoration:underline;'>AAMUSTED</h2>;
      <p>You reset token is  <b style='font-size:18px;'>${generatedToken}</b>.</p>
      <p>Thank You !!!</p>
      </div>`;
      }

      return res.status(200).json(token);
    }
    res.sendStatus(200);
  })
);

//@DELETE student
router.delete(
  "/:id",
  AsyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id);

    // if (!mongoose.isValidObjectId(id)) {
    //   return res.status(401).json("Invalid User information");
    // }

    // const user = await User.findByIdAndRemove(id, {
    //   new: true,
    // });

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          active: false,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(user)) {
      return res.status(403).json("No User with such id");
    }
    res.status(200).json("User has been removed successfully !!!");
  })
);

module.exports = router;

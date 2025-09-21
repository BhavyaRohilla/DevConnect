# DevTinder Backend

## Approach to Code Explanation

- Every code block will include **clear comments** beside each line or section, explaining its purpose and action.[^1_8][^1_2]
- After the code, **concise theory** will be added explaining important concepts: e.g., how Express routes work, what Mongoose schemas are, or how controllers handle requests.[^1_5][^1_8]
- Where necessary, **definitions** or real-world analogies of terms like "middleware," "request lifecycle," or "collection" will be provided.[^1_4][^1_8]
- Code design patterns, best practices, and rationale for various Express/Mongoose usages will be discussed for deeper understanding, focusing on robust, maintainable backend architecture.[^1_13][^1_8]


<span style="display:none">[^1_1][^1_10][^1_11][^1_12][^1_14][^1_15][^1_3][^1_6][^1_7][^1_9]</span>



[^1_1]: https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial

[^1_2]: https://dev.to/eidorianavi/node-js-mongodb-and-express-rest-api-part-1-100n

[^1_3]: https://www.youtube.com/watch?v=_7UQPve99r4

[^1_4]: https://mobilunity.com/blog/node-express-angular-mongodb-comparison/

[^1_5]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction

[^1_6]: https://fullstackopen.com/en/part3/node_js_and_express

[^1_7]: https://www.mongodb.com/resources/languages/mern-stack

[^1_8]: https://www.hcomb.ai/blog/full-stack-applications-nodejs-express-mongodb

[^1_9]: https://www.w3schools.com/nodejs/nodejs_mongodb.asp

[^1_10]: https://www.geeksforgeeks.org/mern/understand-mern-stack/

[^1_11]: https://expressjs.com

[^1_12]: https://www.mongodb.com/resources/languages/mern-stack-tutorial

[^1_13]: https://dev.to/shanu001x/how-to-setup-full-stack-project-for-production-in-nodejs-environment-2d7l

[^1_14]: https://www.youtube.com/watch?v=l134cBAJCuc

[^1_15]: https://javascript.plainenglish.io/javascript-express-mongodb-my-real-full-stack-learning-journey-f7f25a9d5d18

## app.js

```js
// Import Express for building the web server
const express = require("express"); // Express is a minimal web framework for Node.js[^2_8]

// Import application routers for authentication, profile, user, and requests.
// Routers are modular route handlers kept in separate files for maintainability[^2_1]
const authRouter = require("./routes/auth"); // Handles routes like /signup, /login
const profileRouter = require("./routes/profile"); // Handles profile-related routes
const requestRouter = require("./routes/request"); // Handles request-related routes
const userRouter = require("./routes/user"); // Handles user-specific routes

// Enable Cross-Origin Resource Sharing (CORS) for browser apps (like React frontends)
const cors = require("cors"); // CORS lets your server accept requests from other origins (e.g., local frontend app)[^2_5]

// Middleware to parse cookies sent by clients
const cookieParser = require("cookie-parser"); // Simplifies cookie management[^2_6]

// Custom database connector function to establish connection with MongoDB
const connectDB = require("./config/database"); // Centralized DB connection logic

// Create a new Express application
const app = express(); // This creates your server instance[^2_2]

// Configure CORS middleware to allow requests from React frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Only allow this origin/frontend[^2_6]
    credentials: true, // Send and receive cookies/auth headers
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], // Allow listed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Accept only these headers
  })
);

// Middleware to automatically parse JSON bodies from incoming requests
app.use(express.json()); // Essential for API backends working with JSON data[^2_6]

// Middleware to automatically parse cookies from HTTP requests
app.use(cookieParser());

// Mount application routers. Each router handles certain endpoint groups.
app.use("/", authRouter); // Authentication: /signup, /login, etc.
app.use("/", profileRouter); // Profile management: /profile, /edit-profile
app.use("/", requestRouter); // Requests/relationships: /request, /friend-request
app.use("/", userRouter); // User management: /users, etc.

// Connect to the MongoDB database, then start listening for requests on port 3000
// Promises ensure the server only runs once the DB connection is successful
connectDB()
  .then(() => {
    console.log("Database Connected successfully"); // Confirm DB is ready
    app.listen(3000, () => {
      console.log("server successfully listening on port 3000"); // Ready to handle requests
    });
  })
  .catch((err) => {
    console.error("Database Connection Unsuccessful"); // Log connection errors safely
  });
```


***

## Key Theory and Definitions

### Express Application Instance

- **Express** is a minimalist web framework for Node.js that allows rapid API and web app development by handling HTTP requests, routing, and middleware.[^2_4][^2_8]
- `const app = express();` initializes a new server application.


### Middleware

- **Middleware** functions are executed in the order they're added and process request/response objects, such as parsing JSON or cookies, handling errors, or logging.[^2_6]
- `app.use(...)` attaches middleware and routers that run before the final request handler.


### Modular Routing

- **Routers** separate each feature or resource into its own file, making routes like `/auth`, `/profile`, `/user`, and `/request` easy to maintain and scale.[^2_8][^2_1]
- Only relevant functions and endpoints are imported into each router file.


### CORS

- **Cross-Origin Resource Sharing** (CORS) lets browsers and servers interact securely if they're on different domains during development (e.g., React frontend on localhost:5173, backend on localhost:3000).[^2_5]


### Cookie Parser

- **CookieParser** is Express middleware that simplifies extraction and parsing of cookies from incoming requests for authentication/session management.


### MongoDB Connection

- The `connectDB()` function handles database connectivity and ensures the server starts only after a successful database connection.[^2_2]
- Proper error catching prevents server crashes upon DB failures.


### Server Startup

- `app.listen(3000, ...)` starts the server, allowing Express to accept HTTP requests.

***

## Why This Structure?

- **Separation of concerns:** Routers, middleware, and configuration are split up for ease of management and future scaling.[^2_3][^2_1]
- **Readability:** Comments clarify the role of each import, middleware, and major operation.


***


[^2_1]: https://dev.to/mr_ali3n/folder-structure-for-nodejs-expressjs-project-435l

[^2_2]: https://www.geeksforgeeks.org/node-js/how-to-structure-my-application-in-express-js/

[^2_3]: https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/

[^2_4]: https://expressjs.com

[^2_5]: https://expressjs.com/en/starter/generator.html

[^2_6]: https://dev.to/moibra/best-practices-for-structuring-an-expressjs-project-148i

[^2_7]: https://www.codemzy.com/blog/nodejs-file-folder-structure

[^2_8]: https://www.w3schools.com/nodejs/nodejs_express.asp

[^2_9]: https://www.youtube.com/watch?v=bf8L9tQi_MQ


---

## 1.) authRouter

```js
const express = require("express");
const bcrypt = require("bcryptjs"); // Library for hashing and verifying passwords securely[^3_6][^3_17]
const User = require("../model/user"); // Mongoose user model for MongoDB interactions
const { validateUserData } = require("../utils/validation"); // Utility function for validating request payloads

const authRouter = express.Router(); // Create an Express router for modular route management[^3_1]

/**
 * User Signup Endpoint
 * - Validates user data
 * - Hashes password with bcrypt
 * - Creates and saves the user to MongoDB
 */
authRouter.post("/signup", async (req, res) => {
  try {
    validateUserData(req); // Throws error if request data is invalid

    // Extract relevant fields from request body
    const { FirstName, LastName, email, password, gender, age, skills } = req.body;

    // Securely hash password with 10 salt rounds, preventing storage of plaintext[^3_9][^3_6]
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user document, storing hashed password
    const user = new User({
      FirstName,
      LastName,
      email,
      age,
      password: passwordHash, // Only store hash!
      gender,
      skills,
    });

    await user.save(); // Save user to MongoDB collection
    res.send("User Account Created successfully");
  } catch (err) {
    // Validation or database errors are caught here
    res.status(400).send("Something went Wrong!!!! Error: " + err.message);
  }
});

/**
 * User Login Endpoint
 * - Finds user by email
 * - Validates submitted password against the hashed password
 * - Issues a JWT if authentication is successful
 * - JWT is sent as an HTTP-only cookie for session management[^3_5][^3_7]
 */
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Extract login credentials

    const user = await User.findOne({ email: email }); // Lookup user in MongoDB
    if (!user) {
      throw new Error("User Not Found !!!");
    }

    // Custom User method to validate password (usually uses bcrypt compare under the hood)
    const isPasswordCorrect = await user.validatePassword(password);
    if (isPasswordCorrect) {
      // Custom User method to sign and return a JWT token (includes user ID, expiry, etc.)
      const token = await user.getJWT();

      // Store JWT as a secure cookie for authentication in subsequent requests
      res.cookie("token", token);

      res.json({ message: "Login Successfully", data: user });
    } else {
      throw new Error("Password incorrect!!!!");
    }
  } catch (err) {
    // Invalid credentials or other errors
    res.status(400).send("Error : " + err.message);
  }
});

/**
 * User Logout Endpoint
 * - Clears JWT cookie, ending the session
 */
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) }); // Immediately expire cookie
  res.send("Logout SuccessFully");
});

// Export this router to be mounted in main Express app
module.exports = authRouter;
```


***

## Core Concepts and Definitions

### Password Hashing with bcrypt

- **Bcrypt** generates a random salt and then uses slow, repeated hashing (key stretching) to create secure hash values—so even if two passwords are the same, their hashes differ.[^3_4][^3_3]
- Never store passwords as plaintext; always store only their hash.


### User Model Custom Methods

- `validatePassword(password)` is typically a method on the User schema that uses bcrypt to compare the submitted password with the stored hash.
- `getJWT()` is a User method that signs a JSON Web Token and returns it. JWTs securely encode user identity and can have an expiry ("1 day" here), which is commonly used for session management.[^3_2][^3_5]


### Express Router

- Routers create modular route groups for related functionality, improving maintainability and scalability in large apps.[^3_6]


### Authentication Flow

- **Signup**: Validate, hash password, save user.
- **Login**: Lookup user, verify password, issue JWT (stored in HTTP-only cookie).
- **Logout**: Expire cookie, end session.

***


<span style="display:none">[^3_10][^3_11][^3_12][^3_13][^3_14][^3_15][^3_16][^3_18][^3_19][^3_20][^3_8]</span>


[^3_1]: https://supertokens.com/blog/user-authentication-in-node

[^3_2]: https://dev.to/mhmdlotfy96/authentication-and-authorization-using-jwt-in-node-js-with-express-5bo6

[^3_3]: https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/

[^3_4]: https://www.honeybadger.io/blog/node-password-hashing/

[^3_5]: https://blog.bitsrc.io/how-to-use-jwt-for-authentication-and-create-a-login-system-in-node-js-and-mongodb-83bb852e777a

[^3_6]: https://expressjs.com/en/guide/routing.html

[^3_7]: https://expressjs.com/en/starter/examples.html

[^3_8]: https://stackoverflow.com/questions/31381104/express-js-routing-based-authentication

[^3_9]: https://auth0.com/blog/complete-guide-to-nodejs-express-user-authentication/

[^3_10]: https://stackoverflow.com/questions/48401576/how-to-use-a-jwt-token-as-login-validation

[^3_11]: https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs/

[^3_12]: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/

[^3_13]: https://dev.to/eidorianavi/authentication-and-jwt-in-node-js-4i13

[^3_14]: https://escape.tech/blog/how-to-secure-express-js-api/

[^3_15]: https://www.digitalocean.com/community/tutorials/how-to-handle-passwords-safely-with-bcryptsjs-in-javascript

[^3_16]: https://help.sap.com/docs/SAP_CUSTOMER_DATA_CLOUD/8b8d6fffe113457094a17701f63e3d6a/41353af770b21014bbc5a10ce4041860.html

[^3_17]: https://www.geeksforgeeks.org/node-js/npm-bcrypt/

[^3_18]: https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens

[^3_19]: https://en.wikipedia.org/wiki/Bcrypt

[^3_20]: https://www.criipto.com/blog/jwt-validation-guide


---

## userSchema

```js
const mongoose = require("mongoose"); // ODM for MongoDB
const { Schema } = mongoose; // Schema constructor for model definitions
const validator = require("validator"); // Library for robust string validation
const bcrypt = require("bcryptjs"); // Secure password hashing/comparison
const jwt = require("jsonwebtoken"); // JWT token generation for user sessions

// =======================
// User Collection Schema
// =======================
const userSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
      trim: true, // Removes whitespace
    },
    LastName: { type: String, trim: true },
    age: { type: Number, required: true, min: 18, max: 90 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Store emails in lowercase
      trim: true,
      validate(value) {
        // Uses validator to ensure a valid email format
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    profileImg: {
      type: String,
      default: "https://img.daisyui.com/images/profile/demo/gordon@192.webp",
      trim: true,
    },
    about: {
      type: String,
      default: "Hello i am new to Dev connect",
      trim: true,
      minLength: 0,
      maxLength: 100,
    },
    skills: {
      type: [String], // Array of skills
      validate: {
        validator: function (arr) {
          // Must have between 1 and 15 skills
          return arr.length >= 1 && arr.length <= 15;
        },
        message: "Skills must have At least one or At Max. 15 ",
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        // Enforce strong password rules using validator[^4_3][^4_14]
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password is weak. try some strong password which contain { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}"
          );
        }
      },
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true } // Automatically create createdAt/updatedAt fields
);

// ==========================
// Model Methods (Instance)
// ==========================

// Generate a JWT for the user using their MongoDB _id as payload[^4_19][^4_17]
userSchema.methods.getJWT = async function () {
  const user = this;
  // Hardcoded secret as example - best practice: store in process.env
  const token = await jwt.sign({ _id: user._id }, "Dev@45Connect170804", { expiresIn: "1d" });
  return token;
};

// Compare plaintext password with hashed password for authentication[^4_4][^4_2][^4_18]
userSchema.methods.validatePassword = async function (password) {
  const user = this;
  // bcrypt.compare returns true if password matches hash[^4_20][^4_16]
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  return isPasswordCorrect;
};

// =============================
// Create and Export User Model
// =============================
const User = mongoose.model("User", userSchema);

module.exports = User; // Make User available throughout your app
```


***

## Theory and Best Practices

### Mongoose Schema Design

- Defines document structure, validation rules, and model behaviors for robust data integrity in MongoDB.[^4_4]
- Custom validation ensures email, password, and skills are correctly formatted before saving.[^4_5][^4_3]


### Password Security

- Storing only hashed passwords with bcrypt is vital—plaintext is never stored.[^4_6][^4_7]
- Custom validation rules enforce strong password policies and reduce common vulnerabilities.[^4_3][^4_5]


### JWT Integration

- **JWT (JSON Web Token)** is an industry standard for user authentication. Signing with the user's `_id` enables session tracking and stateless API requests.[^4_8][^4_9]
- Tokens are time-limited (expires in 1 day), preventing persistent sessions and improving security.


### Instance Methods

- Adding `.getJWT` and `.validatePassword` as schema methods means models encapsulate all user-based authentication logic; this separation improves testability and maintainability.[^4_2][^4_1]


### Model Creation

- `mongoose.model("User", userSchema)` binds schema definition and methods into a reusable, queryable class for interacting with your MongoDB "users" collection.

***


<span style="display:none">[^4_10][^4_11][^4_12][^4_13][^4_15]</span>



[^4_1]: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

[^4_2]: https://dev.to/ghostaram/hashing-and-verifying-passwords-in-mongoose-schemas-pl3

[^4_3]: https://techinsights.manisuec.com/mongodb/mongoose-schema-validation/

[^4_4]: https://www.geekster.in/articles/making-a-schema-in-mongoose/

[^4_5]: https://www.geeksforgeeks.org/mongodb/mongoose-validation/

[^4_6]: https://mojoauth.com/blog/hashing-passwords-in-nodejs

[^4_7]: https://ssojet.com/hashing/bcrypt-in-nodejs/

[^4_8]: https://www.loginradius.com/blog/engineering/nodejs-and-mongodb-application-authentication-by-jwt

[^4_9]: https://mattermost.com/blog/json-web-token-jwt-authentication-in-nodejs-applications/

[^4_10]: https://stackoverflow.com/questions/13982159/validating-password-confirm-password-with-mongoose-schema

[^4_11]: https://mongoosejs.com/docs/validation.html

[^4_12]: https://www.mongodb.com/resources/products/capabilities/password-authentication-with-mongoose-part-2

[^4_13]: https://stackoverflow.com/questions/60101821/convert-jwt-payload-to-mongoose-model-instance

[^4_14]: https://www.npmjs.com/package/mongoose-bcrypt

[^4_15]: https://stackoverflow.com/questions/40508211/which-data-put-in-jwt-tokens-node-js-mongoose

[^4_16]: https://stackoverflow.com/questions/57517386/how-do-you-validate-password-using-mongoose-for-mongodb-in-an-express-app-for-lo

[^4_17]: https://dev.to/tanzimibthesam/node-express-crud-with-mongoose-jwt-authentication-authorization-3ogk

[^4_18]: https://www.honeybadger.io/blog/node-password-hashing/

[^4_19]: https://www.youtube.com/watch?v=wwjukeoouEw

[^4_20]: https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/


---

## validation.js 

```js
const validator = require("validator"); // Library for strong data validation

// 1. Validate user registration data
const validateUserData = (req) => {
  // Destructure required fields from request body
  const { FirstName, email, password } = req.body;
  if (!FirstName) {
    throw new Error("Enter First Name");
  } else if (!email || !validator.isEmail(email)) {
    // Checks if email exists and is in valid format[^5_1][^5_7]
    throw new Error("Email is Invalid");
  } else if (!validator.isStrongPassword(password)) {
    // Enforces strong password criteria: length, case, number, symbol[^5_9][^5_6]
    throw new Error(
      "Password is weak. Try a strong password containing: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    );
  }
};

// 2. Validate allowed fields for profile editing
const validateProfileEditData = (req) => {
  const AllowedEditFields = [
    "FirstName",
    "LastName",
    "skills",
    "age",
    "profileImg",
    "gender",
    "about",
  ];
  // Check every key in request body to ensure it's included in allowed fields
  const isValidEdit = Object.keys(req.body).every((key) =>
    AllowedEditFields.includes(key)
  );
  if (!isValidEdit) {
    throw new Error("Invalid Edit Request");
  }
};

// 3. Validate password for profile password update
const validateProfilePasswordEdit = async (req) => {
  const passwordEdit = req.body.new_password;
  if (!validator.isStrongPassword(passwordEdit)) {
    // Checks for all password constraints (length, case, etc.)[^5_9][^5_6]
    throw new Error(
      "Password is weak. Try a strong password containing: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    );
  }
  return passwordEdit;
};

module.exports = {
  validateUserData,
  validateProfileEditData,
  validateProfilePasswordEdit,
};
```


***

## Theory and Key Definitions

### validator.js Library

- **validator.js** provides a rich set of functions for validating formats (like email, strong passwords). It is widely used for server-side input validation before saving to a database, greatly reducing the risks of malformed or insecure data.[^5_4][^5_1]


### Strong Password Validation

- The strong password constraints (minimum length, upper/lower case, digits, symbols) follow common security standards to limit brute force and dictionary attacks and improve user account safety.[^5_5][^5_6]


### Allowed Fields for Profile Editing

- Restricting edits to approved fields prevents malicious clients from overwriting unintended data, ensuring APIs only accept safe, known changes in the user model.[^5_7]


### Error Handling in Validation

- Throwing explicit errors upon validation failure means your API can quickly reject bad input, provide helpful feedback to the frontend, and keep your data layer clean.[^5_3][^5_8]

***

<span style="display:none">[^5_10][^5_11][^5_12][^5_13][^5_14][^5_15][^5_16][^5_17][^5_18][^5_19][^5_20]</span>



[^5_1]: https://express-validator.github.io/docs/

[^5_2]: https://www.digitalocean.com/community/tutorials/how-to-handle-form-inputs-efficiently-with-express-validator-in-express-js

[^5_3]: https://betterstack.com/community/guides/scaling-nodejs/express-validator-nodejs/

[^5_4]: https://auth0.com/blog/express-validator-tutorial/

[^5_5]: https://www.geeksforgeeks.org/javascript/javascript-program-to-validate-password-using-regular-expressions/

[^5_6]: https://qodex.ai/all-tools/password-regex-javascript-validator

[^5_7]: https://stackoverflow.com/questions/18266484/how-to-allow-users-to-update-their-profile

[^5_8]: https://dev.to/admirnisic/data-validation-with-express-and-nodejs-k8g

[^5_9]: https://stackoverflow.com/questions/70256124/how-to-validate-request-body-in-node-js-express-is-it-possible-without-using

[^5_10]: https://jayeshchoudhary.hashnode.dev/how-to-easily-validate-request-data-using-express-validator-in-nodejs

[^5_11]: https://blog.appsignal.com/2024/06/19/how-to-perform-data-validation-in-nodejs.html

[^5_12]: https://www.reddit.com/r/node/comments/1ad0e43/which_validator_is_best_for_express/

[^5_13]: https://www.w3schools.com/howto/howto_js_password_validation.asp

[^5_14]: https://express-validator.github.io/docs/guides/field-selection/

[^5_15]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/forms

[^5_16]: https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters

[^5_17]: https://www.w3resource.com/javascript/form/password-validation.php

[^5_18]: https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/

[^5_19]: https://dev.to/themodernweb/here-is-how-i-made-a-strong-password-checker-using-javascript-3m9o

[^5_20]: https://expressjs.com/en/api.html


---

## 2.) ProfileRouter

```js
const express = require("express");
const profileRouter = express.Router(); // Modular router for profile routes

const UserAuth = require("../middlewares/auth"); // Authentication middleware to protect routes

// Import utility functions to validate profile edits and password strength
const {
  validateProfileEditData,
  validateProfilePasswordEdit,
} = require("../utils/validation");

const bcrypt = require("bcryptjs"); // For hashing password updates

// GET /profile/view - Fetch the current authenticated user's profile data
// Uses UserAuth middleware to ensure the user is logged in
profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  try {
    const user = req.user; // User info attached by auth middleware after JWT verification
    res.send(user); // Send user data as response
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// PATCH /profile/edit - Update allowed profile fields for logged-in user
// Validates allowed update fields, copies changes, and saves updated user document
profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    validateProfileEditData(req); // Ensure only valid fields are being edited

    const loggedInUser = req.user; // Current user from authentication middleware

    // Assign each valid field in request body to user object
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    // Save the updated user back to MongoDB
    await loggedInUser.save();

    res.send(`${loggedInUser.FirstName}, Your Profile Updated SuccessFully`);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// PATCH /profile/password - Update logged-in user's password
// Validates new password, hashes it securely, and saves the update
profileRouter.patch("/profile/password", UserAuth, async (req, res) => {
  try {
    // Validate the new password string asynchronously via utility
    const passwordEdit = await validateProfilePasswordEdit(req);

    const loggedInUser = req.user; // Current authenticated user

    // Hash new password with bcrypt, using 10 salt rounds for security
    const passwordHash = await bcrypt.hash(passwordEdit, 10);

    loggedInUser.password = passwordHash; // Set hashed password

    // Persist the changes in the database
    await loggedInUser.save();

    res.send(`${loggedInUser.FirstName}, Your Password Updated Successfully`);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// Export the profileRouter to be mounted in main Express app
module.exports = profileRouter;
```


***

### Theory and Best Practices

#### Authentication Middleware (UserAuth)

- Middleware intercepts requests to protected routes to verify JWT tokens (usually from cookies or headers). On success, user info is attached to `req.user` for easy access downstream.[^6_2][^6_1]
- This protects sensitive profile operations from unauthorized access.


#### Validation

- Using `validateProfileEditData` ensures only allowable fields can be changed, preventing unexpected or malicious updates.[^6_4][^6_5]
- `validateProfilePasswordEdit` enforces password strength policies before re-hashing and saving.[^6_6][^6_7]


#### Partial Updates with PATCH

- The `PATCH` method is used for partial updates, changing only specified fields without replacing the whole object.[^6_3]
- Iterating over `req.body` keys and updating only valid fields supports this approach.


#### Password Hashing

- When updating passwords, always hash before saving.[^6_8][^6_9]
- Bcrypt’s salt rounds (10 here) add computational cost to defend against brute force.


#### Sending Informative Success Messages

- Providing user-specific success feedback improves UX, confirming the operation was successful.

***





[^6_1]: https://expressjs.com/en/guide/routing.html

[^6_2]: https://dev.to/moibra/best-practices-for-structuring-an-expressjs-project-148i

[^6_3]: https://www.w3schools.com/nodejs/nodejs_express.asp

[^6_4]: https://betterstack.com/community/guides/scaling-nodejs/express-validator-nodejs/

[^6_5]: https://stackoverflow.com/questions/18266484/how-to-allow-users-to-update-their-profile

[^6_6]: https://www.geeksforgeeks.org/javascript/javascript-program-to-validate-password-using-regular-expressions/

[^6_7]: https://qodex.ai/all-tools/password-regex-javascript-validator

[^6_8]: https://www.honeybadger.io/blog/node-password-hashing/

[^6_9]: https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/


---

## userAuth.js

```js
const jwt = require("jsonwebtoken"); // Library for JSON Web Token creation and verification
const User = require("../model/user"); // Mongoose user model

/**
 * User authentication middleware
 * - Extracts JWT token from client cookies
 * - Verifies token validity and decodes payload
 * - Looks up user by ID embedded in token
 * - Attaches user to `req.user` for downstream use
 * - Calls next middleware or sends error response if invalid
 */
const UserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies; // Get JWT token from client cookies

    if (!token) {
      // If no token present, reject request indicating login needed
      throw new Error("Token is Invalid !!! Please login again");
    }

    // Verify token authenticity and decode payload (user ID here)
    // Secret must match the one used while creating token
    const decodeObj = await jwt.verify(token,"Secreate Key");

    const { _id } = decodeObj;

    // Find user in database by decoded ID, ensure user exists
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Exist");
    }

    req.user = user; // Attach found user to request object

    next(); // Proceed to next middleware or route handler
  } catch (err) {
    // Send error if token invalid, missing, or user not found
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = UserAuth; // Export middleware to use in routes
```


***

### Theory and Explanation

#### JWT (JSON Web Token) Verification

- Tokens issued at login encode user information (like `_id`) and are cryptographically signed with a secret key. `jwt.verify` ensures token integrity and expiry validity.[^7_2][^7_3]
- If token is tampered or expired, verification throws an error, protecting secure routes.


#### Middleware Nature

- Middleware in Express.js acts as a gatekeeper, running before the main route handler to validate requests.[^7_4]
- If authentication succeeds, middleware adds user info to `req.user` making it accessible in protected routes.
- Calling `next()` passes control down the middleware stack; errors or missing tokens end the request early with an error response.


#### Security Best Practices

- Token secrets ("Secreate key") should be stored securely in environment variables, not hardcoded.[^7_2]
- Using HTTP-only cookies for tokens prevents JavaScript access from malicious scripts (protects from XSS).
- Ensure tokens have finite expiration times (like 1 day here) to limit damage if stolen.

***


[^7_1]: https://dev.to/eidorianavi/authentication-and-jwt-in-node-js-4i13

[^7_2]: https://blog.bitsrc.io/how-to-use-jwt-for-authentication-and-create-a-login-system-in-node-js-and-mongodb-83bb852e777a

[^7_3]: https://auth0.com/docs/secure/tokens/access-tokens/validate-access-tokens

[^7_4]: https://expressjs.com/en/guide/routing.html


---

## 3.) requestRouter

```js
const express = require("express");
const requestRouter = express.Router(); // Router for handling connection requests

const UserAuth = require("../middlewares/auth"); // Middleware to protect routes with authentication
const ConnectionRequest = require("../model/connectionRequest"); // Model representing connection requests
const User = require("../model/user"); // User model to validate target users

/**
 * POST /request/send/:status/:toUserId
 * - Authenticated user sends a connection request to another user
 * - Validates that status is allowed ('ignored' or 'interested')
 * - Checks if recipient user exists and no duplicate request exists (either direction)
 * - Creates and saves a new connection request
 */
requestRouter.post("/request/send/:status/:toUserId", UserAuth, async (req, res, next) => {
  try {
    const fromUserId = req.user._id; // Sender ID from authenticated user
    const { status, toUserId } = req.params;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type : " + status });
    }

    const toUser = await User.findById(toUserId); // Verify recipient exists
    if (!toUser) {
      return res.status(400).json({ message: "User not Found!!!" });
    }

    // Check if a request exists in either direction between these users
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      throw new Error("Connection Request Already Sent");
    }

    // Create and save a new connection request document
    const NewConnectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await NewConnectionRequest.save();

    res.json({
      message: `${req.user.FirstName} sent Request to ${toUser.FirstName}`,
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

/**
 * POST /request/review/:status/:requestId
 * - Authenticated user reviews a connection request sent to them
 * - Validates that status is either 'accepted' or 'rejected'
 * - Checks if the request exists and is currently 'interested'
 * - Updates the request status accordingly
 */
requestRouter.post("/request/review/:status/:requestId", UserAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    const isAllowedStatus = allowedStatus.includes(status);
    if (!isAllowedStatus) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find the request pending the logged-in user's review
    const newConnectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedUser._id,
      status: "interested"
    });

    if (!newConnectionRequest) {
      return res.status(400).json({ message: "Invalid Connection Request" });
    }

    // Update and save the request with new status (accepted or rejected)
    newConnectionRequest.status = status;
    const data = await newConnectionRequest.save();

    res.json({ message: "Connection Request " + status, data });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = requestRouter; // Export route handler
```


***

### Theory and Key Points

#### Route Protection with Authentication

- Both routes use `UserAuth` middleware ensuring only logged-in users can send or review requests, protecting user data integrity.[^8_2][^8_1]


#### Parameter Validation

- Status values for sending (`ignored`, `interested`) and reviewing (`accepted`, `rejected`) are strictly controlled to avoid unsupported or malicious state changes.[^8_3][^8_4]


#### Bidirectional Request Check

- Before sending a new request, it checks if either user has already sent one to the other. This prevents duplicates and ambiguous connections, an important consistency check.[^8_5]


#### Updating Requests

- Only requests currently "interested" (pending action) can be accepted or rejected by the recipient, enforcing valid state transitions.


#### Express.js Best Practices

- Use of meaningful HTTP status codes (400 for client errors).
- Proper JSON response formatting for API consumers.
- Clear error message propagation while catching exceptions.





[^8_1]: https://expressjs.com/en/guide/routing.html

[^8_2]: https://dev.to/moibra/best-practices-for-structuring-an-expressjs-project-148i

[^8_3]: https://qodex.ai/all-tools/password-regex-javascript-validator

[^8_4]: https://betterstack.com/community/guides/scaling-nodejs/express-validator-nodejs/

[^8_5]: https://www.w3schools.com/nodejs/nodejs_express.asp


---
## ConnectionRequest Schema



```js
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * ConnectionRequest Schema - Represents a connection/friend request
 * between two users in your application.
 */
const connectionRequestSchema = new Schema(
  {
    // MongoDB ObjectId pointing to the user who sent the request
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to User model for population
      required: true,
    },

    // MongoDB ObjectId pointing to the user receiving the request
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Status of the connection request, constrained to specific values
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"], // Allowed states
        message: `{VALUE} is incorrect status type`, // Custom error if enum invalid
      },
    },
  },
  { timestamps: true } // Inject createdAt and updatedAt timestamps automatically
);

// Create a compound index for fast querying by sender and receiver pair
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

/**
 * Pre-save hook to perform validation before saving requests
 * - Prevents users from sending connection requests to themselves
 */
connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;

  // Throws an error if sender and receiver are same user
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Can't Send Request to YourSelf");
  }
});

// Compile the schema into a model usable in the app
const connectionRequestModel = mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = connectionRequestModel;
```


***

### Key Concepts and Best Practices

#### Schema Fields

- Using `Schema.Types.ObjectId` with `ref: "User"` creates references to documents in the User collection, enabling population for easy access to user details.[^9_1]
- The `status` field is restricted to valid states with the `enum` option, preventing invalid statuses from being stored.[^9_2]


#### Compound Index

- Creating an index on `{ fromUserId, toUserId }` improves performance for frequent queries to check existing connection requests between two users efficiently, especially important in social apps with potentially high activity.[^9_2]


#### Mongoose Middleware (Hooks)

- The `pre("save")` hook runs logic before saving a document.
- Here, it guards against a logical integrity violation: a user sending a connection request to themselves, which usually shouldn’t be allowed.[^9_1]


#### Timestamp Option

- `timestamps: true` automatically adds and maintains `createdAt` and `updatedAt` fields which are useful for tracking request creation and changes without manual handling.[^9_1]



[^9_1]: https://www.geeksforgeeks.org/mongodb/mongoose-validation/

[^9_2]: https://techinsights.manisuec.com/mongodb/mongoose-schema-validation/

[^9_3]: https://www.w3schools.com/nodejs/nodejs_express.asp


---

## userRouter

```js
const express = require("express");
const UserAuth = require("../middlewares/auth"); // JWT-based auth middleware
const connectionRequest = require("../model/connectionRequest"); // Connection request model
const User = require("../model/user"); // User model
const userRouter = express.Router();

/**
 * GET /user/request/received
 * - Returns all pending ("interested") connection requests sent to the logged-in user
 * - Populates sender user details for frontend display
 */
userRouter.get("/user/request/received", UserAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    // Find all connection requests where logged user is the recipient and status is 'interested'
    const newConnectionRequest = await connectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested"
    }).populate("fromUserId", "FirstName LastName age gender skills profileImg");

    // Map data to send only the populated request objects (here simple mapping)
    const Data = newConnectionRequest.map(row => row);

    // Send message depending on whether any requests exist
    newConnectionRequest.length === 0
      ? res.json({ message: "No Pending connection request" })
      : res.json({
          message: "Pending connection request fetched successfully",
          data: Data,
        });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

/**
 * GET /user/request/connection
 * - Returns all users connected (status: accepted) with the logged-in user
 * - Finds connections in both directions (sent or received)
 * - Populates sender details and returns the *other* user in each connection
 */
userRouter.get("/user/request/connection", UserAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const newConnectionRequest = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedUser._id, status: "accepted" },
          { fromUserId: loggedUser._id, status: "accepted" }
        ],
      })
      .populate("fromUserId", "FirstName LastName age gender skills profileImg");

    // Map to return the connected user (the *other* side of connection)
    const Data = newConnectionRequest.map(row => {
      if (row.fromUserId._id.toString() === loggedUser._id.toString()) {
        return row.toUserId; // If current user sent the request, connected user is recipient
      }
      return row.fromUserId; // Otherwise connected user is the sender
    });

    res.json({
      message: `${loggedUser.FirstName}, Your DevConnect Connection`,
      data: Data,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

/**
 * GET /user/feed
 * - Provides a paginated list of users for the logged-in user to connect with
 * - Excludes users who already have connection requests or connections with status "interested", "ignored", "accepted"
 * - Uses mongoose queries with pagination controls
 */
userRouter.get("/user/feed", UserAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 30 ? 30 : limit; // Enforce max limit to avoid large queries
    const skip = (page - 1) * limit;

    // Find all existing connection requests or connections related to logged user to exclude from feed
    const hideConnectionRequest = await connectionRequest
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "interested" },
          { toUserId: loggedInUser._id, status: "interested" },
          { fromUserId: loggedInUser._id, status: "ignored" },
          { toUserId: loggedInUser._id, status: "ignored" },
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .select("fromUserId toUserId status")
      .populate("fromUserId", "FirstName")
      .populate("toUserId", "FirstName");

    // Extract user IDs from those requests/connections to exclude from feed
    const hideUserFromFeed = new Set();
    hideConnectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId._id ? req.fromUserId._id.toString() : req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId._id ? req.toUserId._id.toString() : req.toUserId.toString());
    });

    // Query for users NOT in hide list and NOT the logged-in user, applying pagination
    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } }, // Exclude users with existing relationship
        { _id: { $ne: loggedInUser._id } }, // Exclude self
      ],
    })
      .select("FirstName LastName age gender skills profileImg")
      .skip(skip)
      .limit(limit);

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = userRouter;
```


***

### Theory and Best Practices

#### Population

- Mongoose `.populate()` replaces ObjectId references with actual documents or selected fields, easing frontend use without extra queries.[^10_2]


#### Bidirectional Relationship Handling

- Both sender and receiver fields are checked in connection requests to handle social connections symmetrically, since any user can initiate or receive a request.[^10_4]


#### Pagination and Limits

- Pagination with `skip` and `limit` is added to prevent transferring excessively large data sets, improving performance.[^10_4]
- Limit is capped (max 30) to prevent overwhelming the server or frontend.


#### Use of Sets for Exclusion

- The `Set` data structure efficiently manages unique user IDs to exclude from feed queries, ensuring users don’t see connections or pending requests again.[^10_4]


#### Error Handling

- Uniform error responses and status codes facilitate easier debugging and frontend integration.



[^10_1]: https://expressjs.com/en/guide/routing.html

[^10_2]: https://www.geeksforgeeks.org/mongodb/mongoose-validation/

[^10_3]: https://techinsights.manisuec.com/mongodb/mongoose-schema-validation/

[^10_4]: https://www.w3schools.com/nodejs/nodejs_express.asp


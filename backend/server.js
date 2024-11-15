const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require ("cors");
const emailRoutes = require('./routes/email');  // Assuming this route exists
const warmupRoutes = require('./routes/warmup');  // Assuming this route exists
const reportRoutes = require('./routes/report');  // Assuming this route exists
const { scheduleWarmupEmails } = require('./scheduler/warmupScheduler');  // Assuming this scheduler exists

const { sendEmail } = require('./controllers/emailController');  // Assuming sendEmail exists

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Connect to MongoDB (you can add additional connection options for better support)
mongoose.connect('mongodb://localhost:27017/emailwarmup', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define your routes (email sending, warmup, reports, etc.)
app.use('/api/emails', emailRoutes);  // Email-related routes
app.use('/api/warmup', warmupRoutes);  // Warmup configuration routes
app.use('/api/reports', reportRoutes);  // Report-related routes

// Start scheduling the warmup emails (if necessary)
scheduleWarmupEmails();  // Make sure this function is defined

// Define the route for sending emails (this should POST data)
app.post('/api/emails/send', sendEmail);  // Send email via Nodemailer (defined in your emailController)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const emailRoutes = require('./routes/email');
// const warmupRoutes = require('./routes/warmup');
// const reportRoutes = require('./routes/report');
// const { scheduleWarmupEmails } = require('./scheduler/warmupScheduler');

// const { sendEmail } = require('./controllers/emailController');  

// const app = express();
// const PORT = process.env.PORT || 5000;


// mongoose.connect('mongodb://localhost:27017/emailwarmup');




// app.use(bodyParser.json());

// app.use('/api/emails', emailRoutes);
// app.use('/api/warmup', warmupRoutes);
// app.use('/api/reports', reportRoutes);

// scheduleWarmupEmails();

// app.post('/api/emails/send', sendEmail);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const emailRoutes = require('./routes/email');
// const warmupRoutes = require('./routes/warmup');
// const reportRoutes = require('./routes/report');
// const { scheduleWarmupEmails } = require('./scheduler/warmupScheduler');

// const { sendEmail } = require('./controllers/emailController');  

// const app = express();
// const PORT = process.env.PORT || 5000;


// mongoose.connect('mongodb://localhost:27017/emailwarmup');



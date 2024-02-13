const mongoose = require('mongoose');
const User = require('../models/User.js');
const db = require('../config/connection.js');

// mongoose.connect('mongodb://localhost:27017/resumebuilder', { useNewUrlParser: true, useUnifiedTopology: true });

const seedUsers = [
  {
    name: 'SuperMario',
    email: 'marioletsgo@gmail.com',
    firstLastName: 'Mario Mario',
    password: 'password1',
  },
  {
    name: 'SpyrotheDragon',
    email: 'dragonsparx@yahoo.com',
    firstLastName: 'Spyro Dragon',
    password: 'password2',
  },
];


// async function harry() {
//   let something = await User.create({
//     name: "Crash Bandicoot",
//     email: "crash2fast@gmail.com",
//     firstLastName: "Crash Bandicoot",
//     password: "password3"
//   })

//   console.log(something)
// }

db.once('open', () => {
  User.create(seedUsers)
    .then(() => {
      console.log('Data inserted')
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Error:', error)
    });
});


var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    goal: String,
    dietType: String,
    gender: String,
    weight: Number,
    totalCalories: Number,
    remainingCalories: Number,
    recipes: [String]
});

mongoose.model('User', userSchema);
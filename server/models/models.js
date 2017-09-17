var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    goal: String, 
    dietType: String,   //“balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium”
    gender: String,
    weight: Number,
    totalCalories: Number,
    remainingCalories: Number,
    weight: Number,
    height: Number,
    age: Number,
    Activity: Number
});

mongoose.model('User', userSchema);
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
    height: {type: Number, default: 80.7},
    age: {type: Number, default: 37},
    Activity: Number
});

mongoose.model('User', userSchema);
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
    recipes: [String]
});

mongoose.model('User', userSchema);
export class User {
    constructor(
        public firstName: String,
        public lastName: String,
        public email: String,
        public password: String,
        public goal: String,
        public dietType: String,
        public gender: String,
        public weight: Number,
        public totalCalories: Number,
        public remainingCalories: Number,
        public recipes: [String]
    ) { }
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: { type: String, required: true, unique: true },
    first_name:{type:String,required:true,maxLength:30},
    last_name:{type:String,required:true,maxLength:30},
    password:{type:String,required:true},
    email:{type:String,required:true,maxLength:254,unique:true},
    phone_number:{type:String,required:true,unique:true},
    date_of_birth:{type:Date,required:true,
        validate:{
        validator: function (birthDate){
            const minAge = 18;//minimum age
            const today = new Date();
            const maxBirthDate = new Date(today.getFullYear()-minAge,today.getMonth(),today.getDate());
            return birthDate<maxBirthDate;
        },
        message:props => 'Users must be at least 18 years old.'

    }
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'representative'],
        default: 'customer', // Set default value to 'customer'
        required: true
    },
    profile_picture:{type:String}
}, { timestamps: true })
userSchema.virtual('full_name').get(function(){
    return `${this.first_name} ${this.last_name}`;
})
userSchema.virtual('url').get(function(){
    return `/api/users/${this._id}`;
})

userSchema.set("toJSON", { getters: true });
module.exports = mongoose.model('User',userSchema);
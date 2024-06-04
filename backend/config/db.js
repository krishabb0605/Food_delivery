import mongoose from 'mongoose';

 export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://krishabb0605:9909828262@cluster0.zzc4qxb.mongodb.net/food_delivery').then(() => console.log("DB Connected"))
}
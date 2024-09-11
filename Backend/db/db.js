import mongoose from 'mongoose';

mongoose.connect('mongodb://0.0.0.0:27017/E-commerceDB').then(()=>{
    console.log('EcommerceDB connected')
})
.catch(e=>{
    console.log(e)
})
export default mongoose;
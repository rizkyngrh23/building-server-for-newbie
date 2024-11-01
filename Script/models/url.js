import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    shortenedUrl: {
        type: String,
        required: true,  
        unique: true    
    }
});

const Url = mongoose.model('Url', urlSchema);
export default Url;

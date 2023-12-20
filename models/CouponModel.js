import mongoose, {Schema} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const couponSchema = new mongoose.Schema({
    code: { type: String},
    couponID: {type: Schema.Types.ObjectId, required:true},
    name: {type: String},
    description: { type: String },
    type: { type: String, enum: ["voucher, discount, sale"] },
    max_uses: { type: Number },
    expiresAT: { type: Date },
    startsAT: { type: Date },
}, { timestamps: true });

couponSchema.plugin(mongoosePaginate);

couponSchema.pre('save', function(next){
const doc = this;
try {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomCode = Math.floor(Math.random() * characters.length);
     async function checkAndCreateID() {
        const exist = await CouponModel.findOne({ code: randomCode })
        if (!exist) {
             doc.code = randomCode;
             next();
          };
       }
    
       const timeoutDuration = 5000;
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
           next(new Error('Timeout occurred while creating data'));
        }, timeoutDuration);
    
       checkAndCreateID();
    }
    catch (error) {
        next(error)
    }
 });

const CouponModel = mongoose.model('coupon', couponSchema);
export default CouponModel;

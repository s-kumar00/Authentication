const OTP = require("../Models/otpModel")
const otpGenerator = require('otp-generator')

const generateOTP = async ({email}) =>{
    try {
        await OTP.deleteOne(email)
        const generatedOTP = otpGenerator.generate(4, {digit:true,lowerCaseAlphabets:false ,upperCaseAlphabets: false, specialChars: false });
        return generatedOTP
    } catch (error) {
        throw error
    }
}

module.exports = {generateOTP}


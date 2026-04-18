import jwt from 'jsonwebtoken';

export const generateToken = async (res, user, message) => {
    try {
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            message,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
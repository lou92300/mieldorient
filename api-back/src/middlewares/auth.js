import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    console.log("authenticateJWT")
    console.log(req.cookies)
    console.log(req.signedCookies)
    console.log(req.cookie)
    const TOKEN = req.cookies.TK_AUTH;
    console.log(TOKEN);
    if(!TOKEN) {
        return res.status(403).json({error: "No token"});
    }

    jwt.verify(TOKEN, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            console.log(err)
            return res.status(401).json({error: "Invalid token"});
        }
        req.user = decoded;
        next();
    });
};

export default authenticateJWT;
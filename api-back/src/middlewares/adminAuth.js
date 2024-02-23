import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    const TOKEN = req.cookies.TK_AUTH;
    if(!TOKEN) {
        return res.status(403).json({error: "No token"});
    }

    jwt.verify(TOKEN, process.env.SECRET_TOKEN, (err, decoded) => {
        if(err){
            console.log(err)
            return res.status(401).json({error: "Invalid token"});
        }console.log(decoded)
        if(decoded.role !== "admin") {
            return res.status(403).json({error: "Unauthorized"});
        }
        req.user = decoded; // transmis à la pile middleware suivante
        next();
    });
};

export default authenticateJWT;
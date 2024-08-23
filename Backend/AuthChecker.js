
export async function AuthChecker(req,res,next){
  
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Fetch user email or other details from the database using decoded.id
        next()
      } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
}
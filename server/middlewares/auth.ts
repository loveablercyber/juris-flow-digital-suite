import jwt from "jsonwebtoken";

export function authMiddleware(roles: string[] = []) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Token faltando");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).send("Acesso negado");
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send("Token inválido");
    }
  };
}

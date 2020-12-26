import jwt from 'jsonwebtoken';

const newSessionRoutes = [
    { path: '/user/login', method: 'POST' }
];
const authRoutes = [
    { path: '/user/reset-password', method: 'PUT' },
    { path: '/user/registration', method: 'PUT' }
];

const SECRET_KEY = "CLIENT-SERVER_PROJECT_JWT_SECRET_KEY";

export const isNewSessionRequired = (httpMethod, url) => {
    for (let routeObj of newSessionRoutes) {
      if (routeObj.method === httpMethod && routeObj.path === url) {
        return true;
      }
    }
  return false;
  }
  export const isAuthRequired = (httpMethod, url) => {
    for (let routeObj of authRoutes) {
      if (routeObj.method === httpMethod && routeObj.path === url) {
        return true;
      }
    }
    return false;
  }

export const generateJWTToken = (userData) =>{
    return jwt.sign(userData, SECRET_KEY);
}
export const verifyToken = (jwtToken) =>{
    try{
       return jwt.verify(jwtToken, SECRET_KEY);
    }catch(e){
       console.log('e:',e);
       return null;
    }
 }
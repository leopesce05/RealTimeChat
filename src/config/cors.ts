import {CorsOptions} from 'cors';
import colors from 'colors';

export const corsOptions: CorsOptions = {
    origin: function(origin, callback){

        const whiteList = [process.env.FRONTEND_URL]

        if(process.env.NODE_ENV === 'LOCAL'){
            whiteList.push(undefined)
        }
        
        if (whiteList.includes(origin)){
            callback(null, true);
        }else{
            console.log(origin);
            callback(new Error('No permitido por CORS'));
        }
    }
}
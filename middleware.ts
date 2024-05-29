import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { query } from './config/databaseConnection';
import axios from 'axios';

export async function middleware(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    let unAuthorized = true;
    
    if (authHeader) {
        if(authHeader == process.env.API_KEY){
            unAuthorized = false;
        }else{

            const res = await axios.post("http://localhost:3000/api/checkHeader", {
                authorization: authHeader
            }, {
                headers: {
                    "Authorization": process.env.API_KEY
                }
            });
            unAuthorized = !res.data.accepted;
        }
    }

    if(unAuthorized){
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }else{
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/api/:path*',
    ],
};

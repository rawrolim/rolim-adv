import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    let Authorized = false;

    if (authHeader) {
        console.log(request.nextUrl)
        if((request.nextUrl.pathname == '/api/login' || request.nextUrl.pathname == '/api/checkHeader') && authHeader == process.env.API_KEY){
            Authorized = true;
        }else{
            const res = await axios.post("http://localhost:3000/api/checkHeader", {
                authorization: authHeader
            }, {
                headers: {
                    "Authorization": process.env.API_KEY
                }
            });
            Authorized = res.data.accepted;
        }
    }

    if(!Authorized){
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

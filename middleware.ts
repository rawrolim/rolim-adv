import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    let Authorized = false;
    const rotasPermitidasComAPIKeyPadrao = [
        '/api/login',
        '/api/checkHeader',
        '/api/email',
        '/api/access'
    ];

    if(process.env.ENV == 'development' || request.nextUrl.pathname == '/api/refreshToken')
        return NextResponse.next();

    if (authHeader) {
        if((rotasPermitidasComAPIKeyPadrao.find(route => route == request.nextUrl.pathname)) && authHeader == process.env.API_KEY){
            Authorized = true;
        }else{
            try{
                console.log('ENDPOINT',process.env.NEXT_URL)
                const res = await axios.post(`${process.env.NEXT_URL}/api/checkHeader`, {
                    
                    authorization: authHeader
                }, {
                    headers: {
                        "Authorization": process.env.API_KEY
                    }
                });

                Authorized = res.data.accepted;
            }catch(e){
                if(e.response.status == 401){
                    return new NextResponse(JSON.stringify({ error: 'TokenExpiredError' }), {
                        status: 401,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
            }
        }
    }

    if(!Authorized){
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
            status: 400,
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

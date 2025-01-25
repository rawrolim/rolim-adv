import { useRouter } from "next/router";
import http from "../../config/http";
import { useEffect, useState } from "react";

export default function Servidor() {
    const router = useRouter();
    const [dir,setDir] = useState([]);

    useEffect(()=>{
        getDirectory()
    },[])

    async function getDirectory(){
        const res = await http.get(`${process.env.FILESERVER}/getDirectory`)
        console.log(res)
    }


    return (
        <div>
            <main className="mt-3" >

            </main>
        </div>
    )
}
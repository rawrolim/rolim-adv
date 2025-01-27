import { useRouter } from "next/router";
import http from "../../config/http";
import { useEffect, useState } from "react";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Servidor() {
    const router = useRouter();
    const [dir, setDir] = useState([]);

    useEffect(() => {
        getDirectory()
    }, [])

    async function getDirectory() {
        const res = await http.get(`/api/servidor`);
        setDir(res);
    }

    const DirectoryList = ({ items, father }) => {
        return (
            <ul className="list-group">
                {items.map((item, index) => (
                    <DirectoryItem key={index} item={item} father={father ? father : ''} />
                ))}
            </ul>
        );
    };

    const DirectoryItem = ({ item, father }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleOpen = () => {
            setIsOpen(!isOpen);
        };

        return (
            <li className="list-group-item">
                {item.type === 'directory' ? (
                    <>
                        <span onClick={toggleOpen} style={{ cursor: 'pointer' }}>
                            {isOpen ? <FaFolderOpen /> : <FaFolder />}
                            <strong className="ms-1">{item.name}</strong>
                        </span>
                        {isOpen && <DirectoryList items={item.items} father={father + '/' + item.name} />}
                    </>
                ) : (
                    <>
                        <FaFile />
                        <a className='ms-1' onClick={() => downloadItem(father + '/' + item.name)}>{item.name}</a>
                    </>
                )}
            </li>
        );
    };

    const downloadItem = async (path: string) => {
        const pathArr = path.split('/');
        const base64Data = await http.get(`/api/servidor?path=${path}`)
        if(base64Data){
            const linkSource = `data:application/octet-stream;base64,${base64Data}`;
            const downloadLink = document.createElement('a');
            downloadLink.href = linkSource;
            downloadLink.download = pathArr[pathArr.length-1];
            downloadLink.click();
        }else{
            toast.warn("O arquivo solicitado está vazio.")
        }
    }

    return (
        <div>
            <main className="mt-3" >
                <button className='btn btn-outline-light text-dark' onClick={getDirectory}>Get directory</button>
                <DirectoryList items={dir} father={''} />
            </main>
        </div>
    )
}
import { useRouter } from "next/router";
import http from "../../config/http";
import { useEffect, useState } from "react";
import { FaFile, FaFolder, FaFolderOpen } from "react-icons/fa";

export default function Servidor() {
    const router = useRouter();
    const [dir, setDir] = useState([]);

    useEffect(() => {
        getDirectory()
    }, [])

    async function getDirectory() {
        const res = await http.get(`/api/servidor`);
        console.log(res)
        setDir(res);
    }

    const DirectoryList = ({ items }) => {
        return (
            <ul className="list-group">
                {items.map((item, index) => (
                    <DirectoryItem key={index} item={item} />
                ))}
            </ul>
        );
    };
    
    const DirectoryItem = ({ item }) => {
        const [isOpen, setIsOpen] = useState(false);
    
        const toggleOpen = () => {
            setIsOpen(!isOpen);
        };
    
        return (
            <li className="list-group-item">
                {item.type === 'directory' ? (
                    <>
                        <span onClick={toggleOpen} style={{ cursor: 'pointer' }}>
                            {isOpen?<FaFolderOpen />: <FaFolder />}
                            <strong>{item.name}</strong>
                        </span>
                        {isOpen && <DirectoryList items={item.items} />}
                    </>
                ) : (
                    <>
                        <FaFile />
                        {item.name}
                    </>
                )}
            </li>
        );
    };

    return (
        <div>
            <main className="mt-3" >
                <button className='btn btn-outline-light text-dark' onClick={getDirectory}>Get directory</button>
                <DirectoryList items={dir} />
            </main>
        </div>
    )
}
import { useEffect, useRef, useState } from "react";

export default function SelectSearch({ value, options, onChange=(e)=>{}, required = false}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const selectRef = useRef(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onChange(option);
        setSearchTerm(option.label);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            console.log(selectedOption,value)
            if(selectedOption?.label){
                console.log(value)
                setSearchTerm(selectedOption?.label)
            }
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} style={{ position: 'relative' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className="form-control border-0 border-bottom"
                required={required}
            />
            {isOpen && (
                <ul style={{
                    listStyleType: 'none',
                    padding: '0',
                    margin: '0',
                    position: 'absolute',
                    width: '100%',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    zIndex: 1000,
                }}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <li
                                id={option.value}
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                style={{
                                    padding: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: value?.value === option.value ? '#f0f0f0' : 'white',
                                }}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li style={{ padding: '8px', color: '#999' }}>Nenhuma opção encontrada</li>
                    )}
                </ul>
            )}
        </div>
    );
}
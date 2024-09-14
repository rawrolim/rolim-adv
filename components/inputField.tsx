export default function InputField({ 
    id, 
    label, 
    type='text', 
    placeholder='', 
    mask=null, 
    required=false, 
    onChange=(e)=>{},
    disabled=false,
    value 
}) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
                {required && <span className="text-danger">*</span>}
            </label>
            <input
                type={type}
                className="form-control border-0 border-bottom"
                id={id}
                value={value}
                disabled={disabled}
                onChange={e=>onChange(e)}
                placeholder={placeholder}
                required={type !== 'text' && type !== 'number' && type !== 'date'}
            />
        </div>
    );
};
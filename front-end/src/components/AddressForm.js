import { useState } from 'react';
import statesData from '../statesData';

function AddressForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const handleAddressChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h5>Enter your address</h5>
            <form onSubmit={handleSubmit}>
                <input onChange={handleAddressChange} required placeholder='Street address' type='text' id='streetAddress' name='streetAddress' className='form-control my-2' />
                <input onChange={handleAddressChange} required placeholder='City' type='text' id='city' name='city' className='form-control my-2' />
                <div>
                    <select id="stateDropdown" onChange={handleAddressChange} className='form-control my-2'>
                        <option value="">-- Select State --</option>
                        {statesData.map((state) => (
                            <option key={state.code} value={state.code}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input onChange={handleAddressChange} required placeholder='Zip code' type='text' id='zipCode' name='zipCode' className='form-control my-2' />
                <button className="btn btn-primary my-2">Find My Rep</button>
            </form>
        </div>
    );
}

export default AddressForm;

import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'

function VehicleDetailsView() {
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [showSubmit, setShowSubmit] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [validation, setValidation] = useState('');

    const {id} = useParams();

    const getDataUsingId = async () => {
        const response = await fetch(`http://157.245.61.32:7979/vehicles?id=${id}`);
        const data = await response.json();
        // setItem(data);
        console.log(data);
        setImage(data[0].details.image);
        setName(data[0].name);
        setBrand(data[0].details.brand + ' ' + data[0].name + ' ' + data[0].details.manufactureYear);
        setPrice(data[0].details.price);
        setCurrency(data[0].details.currency);
        setDescription(data[0].details.description);
        setColor(data[0].details.color);
    }

    function containsOnlyNumbers(val) {
        return !isNaN(+val);
    }

    const handleChange = event => {
        setInputValue(event.target.value);
        if (inputValue.length > -1) {
            setShowSubmit(true)
        } else {
            setShowSubmit(false)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = validation;

        console.log(Number(inputValue) + "<=" + price);
        if (!containsOnlyNumbers(inputValue)) {
            console.log("No number");
            errors = 'No number';
        } else if (Number(inputValue) <= Number(price)) {
            console.log("Low price");
            errors = 'Low price';
        } else {
            console.log("No error");
            errors = '';
        }

        console.log(errors)

        return setValidation(errors);
    }
    
    useEffect(() => {
        getDataUsingId();
    });

    return (
        <form action="" method="get" onSubmit={handleSubmit}>
            <div className="vehicle-detail-view">
                <img src={image} alt={name} />
                <div className="vehicle-details">
                    <h2>{brand}</h2>
                    <p>{price} {currency}</p>
                    <h4>Description</h4>
                    <p>{description}</p>
                    <div className='vehicle-color'>
                        <p>Color: </p>
                        <div style={{width: '35px',height: '35px', marginLeft:'10px', background: `${color}`, borderRadius: '25px'}}></div>
                    </div>
                    <div className='vehicle-inputs'>
                        <input type="text" placeholder="Enter amount"  onChange={handleChange} /> {currency}
                        {validation==="No number" && <p className="error">Please enter a valid number</p>}
                        {validation==="Low price" && <p className="error">Minimum price should be above the price of the vehicle</p>}
                        {showSubmit && <div>
                            <button>Submit</button>
                        </div>}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default VehicleDetailsView

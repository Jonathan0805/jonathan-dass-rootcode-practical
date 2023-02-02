import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../styles/home.css';

function Home() {
    const [data, setData] = useState([]);
    const [showSubmit, setShowSubmit] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [validation, setValidation] = useState('');

    const items = useSelector(state => state.items);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    let total = 0;

    const getData = async () => {
        const response = await fetch('http://157.245.61.32:7979/vehicles');
        const data = await response.json();
        setData(data);
    }

    const filterData = async (e) => {
        const data = e.target.value;
        if(data!=='0'){
            const response = await fetch(`http://157.245.61.32:7979/vehicles?details.brand=${data}`);
            const filteredData = await response.json();
            setData(filteredData);
        }
    }
    
    function containsOnlyNumbers(val) {
        return !isNaN(+val);
    }

    const handleChange = event => {
        setInputValue(event.target.value);
        const val = inputValue.trim();
        if (val.length > -1) {
            setShowSubmit(true)
        } else {
            setShowSubmit(false)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = validation;

        if (!containsOnlyNumbers(inputValue)) {
            errors = 'No number';
        } else {
            errors = '';
        }

        return setValidation(errors);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='main-view'>
            <div className="filter-view">
                <select onChange={filterData}>
                    <option value="0" selected>Select brand</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Ford">Ford</option>
                </select>
            </div>
            <div className="grid-container">
                {data.length > 0 && (
                    <>
                        {data.map((item) => (
                            <div key={item.id} className="vehicle-card-view">
                                <form key={item.id} action="" method="get" onSubmit={handleSubmit}>
                                    <img key={item.id} src={item.details.image} alt={item.name} width={200} height={150}/>
                                    <a className="link" onClick={() => navigate(`/vehicledetailview/${item.id}`)}><h3 key={item.id}>{item.details.brand} {item.name} {item.details.manufactureYear}</h3></a>
                                    <p key={item.id}>{item.details.price} {item.details.currency}</p>
                                    <p key={item.id}>{item.details.description}</p>
                                    <input key={item.id} type="text" id='bidAmount' name="bidAmount" placeholder="Enter amount" onChange={handleChange}/> {item.details.currency}
                                    {validation==="No number" && <p key={item.id} className="error">Please enter a valid number</p>}
                                    {showSubmit && 
                                        <div key={item.id}>
                                            <input key={item.id} type="submit" value="Submit" />
                                        </div>}
                                </form>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className='bidding-view'>
                <h1>Biddings</h1>
                {/* {data.map((item) => (
                    <div key={item.id} className="bidding-card-view">
                        <img src={item.details.image} alt={item.name} width={100} height={50}/>
                        <h3>{item.details.brand} {item.name} {item.details.manufactureYear}</h3>
                        <p>{item.details.price} {item.details.currency}</p>
                    </div>
                ))} */}
                <h3 className="display-total">Total: {total} LKR</h3>
            </div>
        </div>
    )
}

export default Home

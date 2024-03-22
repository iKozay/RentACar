import {Link} from "react-router-dom";
import React, {useState} from "react";
export default function CheckVehicle({goToPayment,damageCost,setDamageCost}) {

    const reservationId = window.location.href.split("/").pop();

    const [isDamaged, setIsDamaged] = useState(false);
    const damageTypes = {
        scratch: 50,
        dent: 100,
        crack: 150,
        flatTire: 200,
        other: 250
    }

    const setDamage= (damage) => {
        setIsDamaged(damage);
        if(damage && damageCost==0) setDamageCost(damageTypes.scratch);
    }

    const setPenalty = (damageType) => {
        setDamageCost(damageTypes[damageType]);
    }

    return (
        <div className={""}>
            <div className={"flex justify-center"}>
                <div className={"m-2"}>
                    <input type="radio" id="good" name="condition" value="good" onClick={(e)=>setDamage(false)}/>
                    <label htmlFor="good" className={"ml-2"}>Good</label>
                </div>
                <div className={"m-2"}>
                    <input type="radio" id="damaged" name="condition" value="damaged" onClick={(e)=>setDamage(true)}/>
                    <label htmlFor="damaged" className={"ml-2"}>Damaged</label>
                </div>
            </div>
            <div>
                {isDamaged &&
                    <div>
                        <div className={"flex justify-center"}>
                            <label htmlFor="damageType" className={"mt-2 mr-2"}>Damage Type:</label>
                            <select onChange={(e)=>setPenalty(e.target.value)}>
                                <option value="scratch">Scratch</option>
                                <option value="dent">Dent</option>
                                <option value="crack">Crack</option>
                                <option value="flatTire">Flat Tire</option>
                                <option value="other">Other</option>
                            </select>
                            <label htmlFor="damageCost" className={"mt-2 ml-2"}>Damage Cost: {damageCost}$</label>
                        </div>
                        <div className={"flex justify-center mt-2"}>
                        </div>
                    </div>
                }
            </div>
            <div className="footer mt-4 flex justify-between">
                <Link to={`/reservation/details/${reservationId}`}>
                    <button
                        className={`py-2 px-4 rounded bg-blue-500 hover:bg-blue-600`}>
                        Prev
                    </button>
                </Link>
                <button
                    className={`py-2 px-4 rounded bg-blue-500 hover:bg-blue-600`}
                onClick={(e)=>goToPayment()}>
                    Next
                </button>
            </div>
        </div>
    );
}

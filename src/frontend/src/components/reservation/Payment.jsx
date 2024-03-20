import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../Pages/Root";
import {useContext} from "react";
import createReservation from "../../utilities/createReservation.js";
import createTransaction from "../../utilities/createTransaction.js";

export default function Payment({setGoToPayment, vehicle, totalPrice}) {
    const {user} = useContext(UserContext);

    const [cardName, setCardName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [expDate, setExpDate] = React.useState('');
    const [ccv, setCcv] = React.useState('');
    const [valid, setValid] = React.useState({
        cardName: true,
        cardNumber: true,
        expDate: true,
        ccv: true
    });
    const [paymentAnimation, setPaymentAnimation] = React.useState(false);
    const [transactionDone, setTransactionDone] = React.useState(false);

    // inline async function to process payment
    const processPayment = async () => {
        if(validate()) {
            setPaymentAnimation(true);
            if(user){
                // create reservation
                const reservation = await createReservation(vehicle._id, user.id, vehicle.pickupDate, vehicle.returnDate);
                if(reservation) {
                    // create transaction
                    await createTransaction(cardName, cardNumber, expDate, ccv, totalPrice, user.id, reservation._id);
                    return true;
                }
            }
        }
        return false;
    }

    const setValidColor = (isValid) => {
        if(isValid) {
            return "block w-full px-4 py-2 mt-2 placeholder:text-slate-400 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40";
        }
        return "block w-full px-4 py-2 mt-2 bg-white border-2 rounded-md border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40";
    }

    const validate = () => {
        var valid = true;
        if(cardName.length === 0 || cardNumber.length === 0 || expDate.length === 0 || ccv.length === 0) {
            // change field color to red
            setValid({
                cardName: cardName.length !== 0,
                cardNumber: cardNumber.length !== 0,
                expDate: expDate.length !== 0,
                ccv: ccv.length !== 0
            });
            return false;
        }
        if(cardNumber.length !== 16) {
            setValid({
                cardName: valid.cardName,
                cardNumber: false,
                expDate: valid.expDate,
                ccv: valid.ccv
            });
            valid = false;
        }
        if(expDate.length !== 5) {
            setValid({
                cardName: valid.cardName,
                cardNumber: valid.cardNumber,
                expDate: false,
                ccv: valid.ccv
            })
            valid = false;
        }
        if(ccv.length !== 3) {
            setValid({
                cardName: valid.cardName,
                cardNumber: valid.cardNumber,
                expDate: valid.expDate,
                ccv: false
            })
            valid = false;
        }
        return valid;
    }

    const onChangeCardName = (e) => {
        // make sure that name is only letters
        var name = e.target.value;
        var formattedName = name.replace(/[^a-zA-Z\s]/g, "");
        setCardName(formattedName);
        if(formattedName !== name) {
            e.target.value = formattedName;
            // set valid to true
        }
        setValid({
            cardName: true,
            cardNumber: valid.cardNumber,
            expDate: valid.expDate,
            ccv: valid.ccv
        });

    }

    const onChangeCreditNumber = (e) => {
        var cardNumber = e.target.value;

        // Do not allow users to write invalid characters
        var formattedCardNumber = cardNumber.replace(/[^\d]/g, "");
        formattedCardNumber = formattedCardNumber.substring(0, 16);

        // Add spaces to the card number
        if (formattedCardNumber.length > 4) {
            formattedCardNumber = formattedCardNumber.substring(0, 4) + ' ' + formattedCardNumber.substring(4, 8) + ' ' + formattedCardNumber.substring(8, 12) + ' ' + formattedCardNumber.substring(12, 16);
        }

        // If the formmattedCardNumber is different to what is shown, change the value
        if (cardNumber !== formattedCardNumber) {
            e.target.value = formattedCardNumber;

            setCardNumber(formattedCardNumber.replace(/\s/g, ''));
            // set valid to true
        }
        setValid({
            cardName: valid.cardName,
            cardNumber: true,
            expDate: valid.expDate,
            ccv: valid.ccv
        });
    }

    const onChangeExpDate = (e) => {
        var exp = e.target.value;

        var formattedExp = exp.replace(/[^\d]/g, "");
        formattedExp = formattedExp.substring(0, 4);
        if (formattedExp.length > 2) {
            formattedExp = formattedExp.substring(0, 2) + '/' + formattedExp.substring(2, 4);
        }

        // If the formmattedCardNumber is different to what is shown, change the value
        if (exp !== formattedExp) {
            e.target.value = formattedExp;
            e.target.length = formattedExp.length;
            // set valid to true
        }
        setValid({
            cardName: valid.cardName,
            cardNumber: valid.cardNumber,
            expDate: true,
            ccv: valid.ccv
        });
        if(formattedExp.length === 5) {
            // now expiration date is valid
            setExpDate(formattedExp)
        }
    }

    const onChangeCcv = (e) => {
        var ccv = e.target.value;
        var formattedCcv = ccv.replace(/[^\d]/g, "");
        formattedCcv = formattedCcv.substring(0, 3);
        if(formattedCcv !== ccv) {
            e.target.value = formattedCcv;
            e.target.length = formattedCcv.length;
            // set valid to true
        }
        setValid({
            cardName: valid.cardName,
            cardNumber: valid.cardNumber,
            expDate: valid.expDate,
            ccv: true,
        });
        if(formattedCcv.length === 3) {
            // now ccv is valid
            setCcv(formattedCcv)
        }

    }

    const navigate = useNavigate()
    async function delay(e) {
        e.preventDefault();
        if(await processPayment()) {
            setTimeout(() => {navigate("/reservation/confirmation");}, 2000);
            setPaymentAnimation(false);
        }
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="mb-2 inline-block ">
                    <label className="block text-sm font-semibold text-gray-800 ">Name</label>
                    <input placeholder="John Doe" onChange={onChangeCardName} className={setValidColor(valid.cardName)}/>
                    <label className="block text-sm mt-2 font-semibold text-gray-800 ">Card Number</label>
                    <input placeholder="4242 4242 4242 4242" onChange={onChangeCreditNumber} className={setValidColor(valid.cardNumber)}/>
                    <div className="mb-2 mr-5 inline-block">
                        <label className="block text-sm font-semibold mt-2 text-gray-800 ">Expiration Date</label>
                        <input placeholder="MM/YY" onChange={onChangeExpDate} className={setValidColor(valid.expDate)}/>
                    </div>
                    <div className="mb-2 inline-block">
                        <label className="block text-sm font-semibold mt-2 text-gray-800 ">CVC/CCV</label>
                        <input placeholder="CVC" onChange={onChangeCcv} className={setValidColor(valid.ccv)}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mr-8 ml-8">
                <button className={`bg-blue-500 text-white p-2 rounded-lg w-20`} onClick={(e)=>setGoToPayment(false)}>Back</button>
                    <Link to={user?(`/reservation/confirmation`):'/login'} onClick={delay}>
                        <button className={`${paymentAnimation && "inline-flex items-center disabled"} bg-blue-500 text-white p-2 rounded-lg w-20`}>
                            {paymentAnimation?
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>:""
                            }
                            Pay</button>
                    </Link>
            </div>
        </div>
    );
}

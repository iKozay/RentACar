import React from "react";

export default function Payment({cancel, submit, vehicleID, userID}) {

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
    // is valid function that sets color of input fields to red if invalid
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
            alert(cardNumber.length);
            setValid({
                cardName: valid.cardName,
                cardNumber: false,
                expDate: valid.expDate,
                ccv: valid.ccv
            });
            valid = false;
        }
        if(expDate.length !== 5) {
            setValidColor({
                cardName: valid.cardName,
                cardNumber: valid.cardNumber,
                expDate: false,
                ccv: valid.ccv
            })
            valid = false;
        }
        if(ccv.length !== 3) {
            setValidColor({
                cardName: valid.cardName,
                cardNumber: valid.cardNumber,
                expDate: valid.expDate,
                ccv: false
            })
            valid = false;
        }
        return valid;
    }

    const processPayment = () => {
        if(validate()){
            // TODO: backend api call to process reservation
            console.log('Processing payment');
            submit();
        }
    }

    const onChangeCardName = (e) => {
        // make sure that name is only letters
        var name = e.target.value;
        var formattedName = name.replace(/[^a-zA-Z\s]/g, "");
        setCardName(formattedName)
        if(formattedName !== name) {
            e.target.value = formattedName;
            // set valid to true
            setValid({
                cardName: true,
                cardNumber: valid.cardNumber,
                expDate: valid.expDate,
                ccv: valid.ccv
            });
        }
    }

    const onChangeCreditNumber = (e) => {
        var cardNumber = e.target.value;

        // Do not allow users to write invalid characters
        var formattedCardNumber = cardNumber.replace(/[^\d]/g, "");
        formattedCardNumber = formattedCardNumber.substring(0, 16);

        // If the formmattedCardNumber is different to what is shown, change the value
        if (cardNumber !== formattedCardNumber) {
            e.target.value = formattedCardNumber;
            e.target.length = formattedCardNumber.length;
            setCardNumber(e.target.value)
            // set valid to true
            setValid({
                cardName: valid.cardName,
                cardNumber: true,
                expDate: valid.expDate,
                ccv: valid.ccv
            });
        }
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
            setValid({
                cardName: valid.cardName,
                cardNumber: valid.cardNumber,
                expDate: true,
                ccv: valid.ccv
            });

        }
        if(formattedExp.length === 5) {
            // now expiration date is valid
            setExpDate(formattedExp)
        }
    }

    const onChangeCcv = (e) => {
        var ccv = e.target.value;
        var formattedCcv = ccv.replace(/[^\d]/g, "");
        formattedCcv = formattedCcv.substring(0, 3);
        if(formattedCcv.length === 3) {
            // now ccv is valid
            setCcv(formattedCcv)
        }
        if(formattedCcv !== ccv) {
            e.target.value = formattedCcv;
            e.target.length = formattedCcv.length;
            // set valid to true
            setValid({
                cardName: valid.cardName,
                cardNumber: valid.cardNumber,
                expDate: valid.expDate,
                ccv: true,
            });
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
                <button className="bg-blue-500 text-white p-2 rounded-lg w-20" onClick={cancel}>Cancel</button>
                <button className="bg-blue-500 text-white p-2 rounded-lg w-20" onClick={processPayment}>Submit</button>
            </div>
        </div>
    );
}
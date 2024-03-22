import React, { useState, useRef } from 'react';
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./sigCanvas.css";

export default function RentalAgreement({vehicle, user}) {

  const [imageURL1, setImageURL1] = useState(null);
  const [imageURL2, setImageURL2] = useState(null);

  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save1 = () => setImageURL1(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  const save2 = () => setImageURL2(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  return (

    <div className="container mx-auto p-8 max-w-screen-lg">
      <h1 className="text-2xl font-bold mb-6">Car Rental Agreement</h1>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Rental Agreement Number: [Unique Rental Agreement Number]</h2>
        <p>This Rental Agreement ("Agreement") is entered into between [Car Rental Agency Name], located at [Address], hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">1. Renter's Information:</h2>
        <p>
        Name: NAME <br/>
        Address: ADDRESS <br/>
        Contact Number: PHONE NUM <br/>
        Email Address: EMAIL <br/>
        Driver's License Number: DRIVERS LICENSE NUM <br/>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">2. Vehicle Information:</h2>
        <p>
        Make: VEHICLE.MAKE <br/>
        Model: MODEL <br/>
        Year: YEAR <br/>
        License Plate Number: PLATE <br/>
        Vehicle Identification Number (VIN): VIN <br/>
        Color: COLOR <br/>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">3. Rental Details:</h2>
        <p>
        Rental Start Date: <br/>
        Rental End Date: <br/>
        Pick-up Location: <br/>
        Drop-off Location: <br/>
        Rental Period: <br/>
        Mileage Limit (if applicable): <br/>
        Rental Rate: <br/>
        Additional Services (if any): <br/>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">4. Rental Terms and Conditions:</h2>
        <p>
        The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.<br/><br/>
        The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.<br/><br/>
        The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.<br/><br/>
        The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.<br/><br/>
        The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.<br/><br/>
        The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.<br/><br/>
        The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.<br/><br/>
        The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.<br/>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">5. Indemnification:</h2>
        <p>
        The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">6. Governing Law:</h2>
        <p>
        This Agreement shall be governed by and construed in accordance with the laws of Quebec. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of Quebec.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">7. Entire Agreement:</h2>
        <p>
        This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">8. Signatures:</h2>
        <p className='font-bold my-1'>Rental company</p>
        
        <Popup
        modal
        trigger={<button className='bg-transparent text-blue-500 hover:underline'>Electronic Signature: </button>}
        closeOnDocumentClick={false}>
        {close => (
          <>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
            <button className='mx-1' onClick={save1}>Save</button>
            <button className='mx-1' onClick={clear}>Clear</button>
            <button className='mx-1' onClick={close}>Close</button>
          </>
        )}
      </Popup>
      {imageURL1 ? (
        <img
          src={imageURL1}
          alt="signature"
          className='h-10 my-2'
        />
      ) : null}
      <br/>
      
        <label>Print Name: </label>
        <input className="border-2 border-blue-200 rounded px-2 py-1 my-1"></input>
        <br/>

        <label>Date: </label>
        <input className="border-2 border-blue-200 rounded px-2 py-1 my-1"></input>
        <br/>

        <p className='font-bold my-1'>Renter</p>

        <Popup
        modal
        trigger={<button className='bg-transparent text-blue-500 hover:underline'>Electronic Signature: </button>}
        closeOnDocumentClick={false}>
        {close => (
          <>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
            <button className='mx-1' onClick={save2}>Save</button>
            <button className='mx-1' onClick={clear}>Clear</button>
            <button className='mx-1' onClick={close}>Close</button>
          </>
        )}
      </Popup>
      {imageURL2 ? (
        <img
          src={imageURL2}
          alt="my signature"
          className='h-10 my-2'
        />
      ) : null}
      <br/>
        
        <label>Print Name: </label>
        <input className="border-2 border-blue-200 rounded px-2 py-1 my-1"></input>
        <br/>

        <label>Date: </label>
        <input className="border-2 border-blue-200 rounded px-2 py-1 my-1"></input>
        <br/>

      </div>
    </div>

  );
};

import {PaymentForm,PaymentTypes} from "../payment/PaymentForm.jsx";

export default function BookingPayment({setGoToPayment, vehicle, totalPrice}) {
    return(
        <PaymentForm paymentType={PaymentTypes.NEW_RESERVATION} vehicle={vehicle} totalPrice={totalPrice} backButtonAction={()=>{setGoToPayment(false)}} reservationId={null}/>
    );
}

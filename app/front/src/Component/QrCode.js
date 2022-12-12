import React from 'react';
import QRCode from 'react-qr-code';


export default function QrCode() {


    return (
        <div>
            <h1 className='m-5 text-center'>Scanner votre Qr code</h1>

            <a href={"/"} className="btn btn-warning">Retour</a>
            <div className='d-flex justify-content-center'>
                <QRCode
                    size={100}
                    style={{height: "auto", maxWidth: "100%", width: "100%"}}
                    value={"www.google.com"}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </div>
    )
}
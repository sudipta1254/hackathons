import React, { useState, useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
   const scannerRef = useRef(null);
   const [barcode, setBarcode] = useState("");

   useEffect(() => {
      if (scannerRef.current) {
         Quagga.init({
            inputStream: {
               name: 'Live',
               type: 'LiveStream',
               target: scannerRef.current,
               constraints: {
                  facingMode: 'environment',
               },
            },
            decoder: {
               readers: ['code_128_reader', 'ean_reader'],
            },
            locate: true
         }, (err) => {
            if (err) {
               console.log(err);
               return;
            }
            Quagga.start();
         });
         Quagga.onDetected(handleDetected);
      }

      return () => {
         Quagga.offDetected(handleDetected);
         Quagga.stop();
      };
   }, []);

   const handleDetected = (result) => {
      console.log(result)
      setBarcode(result.codeResult.code);
   };

   return (
      <div className="BarcodeScanner">
         <h1>Barcode Scanner</h1>
         {barcode && <p>Barcode detected: {barcode}</p>}
         <div ref={scannerRef} className="scanner-div">
            <video className="video-stream" />
         </div>
      </div>
   );
};

export default BarcodeScanner;

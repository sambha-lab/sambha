"use client";
import React, { useEffect, useRef } from "react";
import type QRCodeType from "qrcode"; // import the type for better TS support

interface QrCodeGeneratorProps {
  value: string;
  size?: number;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  value,
  size = 96,
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      const QRCode: typeof QRCodeType = (await import("qrcode")).default;

      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = "";

        const canvas = document.createElement("canvas");
        qrCodeRef.current.appendChild(canvas);

        QRCode.toCanvas(
          canvas,
          value,
          {
            width: size,
            margin: 1,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          },
          (error) => {
            if (error) console.error(error);
          }
        );
      }
    };

    generateQRCode();
  }, [value, size]);

  return <div ref={qrCodeRef} className="flex justify-center items-center" />;
};

export default QrCodeGenerator;

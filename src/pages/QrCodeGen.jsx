import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import Head from "next/head";

export default function QrCodeGen() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("nopass");
  const [isHidden, setIsHidden] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (ssid && password) {
      const qrCodeString = `WIFI:T:${encryption};S:${ssid};P:${password};H:${isHidden};`;
      setQrValue(qrCodeString);
    } else {
      setQrValue("Made with Love By Yash Rachhadiya");
    }
  }, [ssid, password, encryption, isHidden]);

  const downloadQrCode = () => {
    if (qrRef.current === null) {
      return;
    }
    toPng(qrRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "wifi-qr-code.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <>
      <Head>
        <title>Wi-Fi QR Code Generator | Made with 💕 by Yash Rachhadiya</title>
        <meta
          name="description"
          content="Generate Wi-Fi QR codes easily with our QR Code Generator. Input your SSID, password, and encryption type to create a shareable code."
        />
        <meta
          name="keywords"
          content="QR Code, Wi-Fi QR Code, QR Code Generator, Wi-Fi, Encryption, SSID, Password"
        />
        <meta name="author" content="Yash Rachhadiya" />
        <meta property="og:title" content="Wi-Fi QR Code Generator" />
        <meta
          property="og:description"
          content="Easily generate QR codes for Wi-Fi networks."
        />
        <meta property="og:image" content="/seo image.png" />{" "}
        <meta
          property="og:url"
          content="https://wifi-qrcode-generator-using-next-rgvz2xvod.vercel.app/"
        />{" "}
        <link rel="icon" href="/logoipsum-298.svg" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">
          Wi-Fi QR Code Generator
        </h2>

        <div className="flex flex-col md:flex-row max-w-8xl  items-center  md:space-x-6 bg-white p-12 shadow-lg rounded-lg gap-12">
          <div className="flex flex-col space-y-6 py-6    md:mb-0 w-full md:w-1/2">
            <div>
              <label className="block text-sm font-bold mb-1">SSID:</label>
              <input
                type="text"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
                placeholder="Enter Wi-Fi SSID"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-bold mb-1">Password:</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full pr-10"
                placeholder="Enter Wi-Fi Password"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute  inset-y-0 right-0 top-6 flex items-center pr-3 focus:outline-none"
              >
                {isPasswordVisible ? (
                  <Image
                    src="/eye-slash.svg"
                    width={18}
                    height={18}
                    alt="Picture of the author"
                  />
                ) : (
                  <Image
                    src="/eye.svg"
                    width={18}
                    height={18}
                    alt="Picture of the author"
                  />
                )}
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">
                Encryption:
              </label>
              <select
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              >
                <option value="WPA/WPA2/WPA3">WPA/WPA2/WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>

            <label className="flex items-center font-bold mb-4">
              <input
                type="checkbox"
                checked={isHidden}
                onChange={(e) => setIsHidden(e.target.checked)}
                className="mr-2"
              />
              Hidden Network
            </label>

            <button
              onClick={downloadQrCode}
              disabled={!ssid || !password}
              className={`px-6 py-2 text-white rounded-lg ${
                ssid && password
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Download QR Code
            </button>
          </div>

          <div className="flex justify-center w-full md:w-1/2 border items-center border-gray-200 rounded-lg">
            {qrValue && (
              <div
                ref={qrRef}
                className="p-8 flex justify-center items-center"
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <QRCode value={qrValue} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

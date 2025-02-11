import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import Image from "next/image";
import logo from "../../public/Logo.png";
import arrow from "../../public/left.png";
import Button2 from "@/components/Button2";
import congradulationsBanner from "../../public/Vector (1).png";
import Flag from "react-world-flags";

interface Country {
  name: string;
  code: string;
  phoneCode: string;
}

const validationSchema = [
  Yup.object({
    firstName: Yup.string()
      .trim()
      .matches(
        /^[A-Za-z ]+$/,
        "We only accept letters and spaces for names, no special characters"
      )
      .required("Please enter a first name"),
    lastName: Yup.string()
      .trim()
      .matches(
        /^[A-Za-z ]+$/,
        "We only accept letters and spaces for names, no special characters"
      )
      .required("Please enter a last name"),
  }),
  Yup.object({
    phoneNumber: Yup.string()
      .matches(
        /^[0-9]{7,15}$/,
        "Please check the phone number is in the correct format"
      )
      .required("Please check the phone number is in the correct format"),
  }),
];

const Form = () => {
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            phoneCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
          }))
          .filter((c: Country) => c.code && c.phoneCode);
        setCountries(countryList);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    fetchCountries();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "",
    },
    validationSchema: validationSchema[step - 1],
    validateOnBlur: true,
    onSubmit: () => setStep(step + 1),
  });

  const handleBackToStart = () => {
    setStep(1);
    formik.resetForm();
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    formik.setFieldValue("country", country.code);
    setShowCountryModal(false);
  };

  const filteredCountries = countries.filter((country) =>
    `${country.name.toLowerCase()} (+${country.phoneCode})`.includes(
      searchTerm.toLowerCase()
    )
  );

  const [showTerms, setShowTerms] = useState(false);
  const toggleTerms = () => setShowTerms(!showTerms);

  const [showPrivacy, setShowPrivacy] = useState(false);
  const togglePrivacy = () => setShowPrivacy(!showPrivacy);

  return (
    <div className="hanken-grotesk-font form-container max-w-[393px] max-h-[852px] h-[852px] flex flex-col items-center space-y-6 w-full mx-auto bg-white text-black shadow-2xl rounded-md relative">
      {showTerms && (
        <div className="modal-overlay" onClick={toggleTerms}>
          <div className={`modal-content ${showTerms ? "open" : ""}`}>
            <button
              className="absolute top-20 right-2 close-button"
              onClick={toggleTerms}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.2457 29.4209L24.8247 24L30.2457 18.579C30.4641 18.353 30.4641 17.9946 30.2457 17.7685C30.0219 17.5368 29.6526 17.5304 29.4209 17.7542L23.9999 23.1752L18.579 17.7543C18.353 17.536 17.9946 17.536 17.7685 17.7543C17.5368 17.9781 17.5304 18.3474 17.7542 18.5791L23.1751 24L17.7542 29.4209C17.6448 29.5302 17.5834 29.6786 17.5834 29.8332C17.5833 30.1554 17.8445 30.4166 18.1666 30.4166C18.3214 30.4168 18.4698 30.3553 18.579 30.2457L23.9999 24.8248L29.4209 30.2457C29.5301 30.3553 29.6786 30.4169 29.8333 30.4166C29.9879 30.4166 30.1361 30.3552 30.2455 30.2459C30.4734 30.0181 30.4735 29.6487 30.2457 29.4209Z"
                  fill="#021626"
                />
              </svg>
            </button>
            <h3 className="text-xl mb-4 pt-[40%] eb-garamond-font">Terms & conditions</h3>
            <p className="text-xs font-ligt leading-4 mb-4">
              Pirate ipsum arrgh bounty warp jack. Clipper driver the sloop
              anchor. Coast coxswain anchor jennys just furl pin gangway yellow.
              Ahoy timbers dead tender guns of arr round down bilge. Sink black
              avast plate tell her tender. Road tales halter grog gun. Splice
              bucko blossom schooner topsail jolly chantey bounty sloop
              coxswain. Or aft o'nine run the dock belaying clipper. Hang
              ballast down topsail scurvy grog. Heave halter to spot log dock
              rat heave hands ipsum. Locker yer coxswain gold gangway. Grog pink
              deck men jones' yawl yard fer. Lugsail starboard plate crack
              topsail.{" "}
            </p>
            <p className="text-xs font-ligt leading-4 mb-4">
              On starboard blow sail bow grog just arr. Pinnace privateer just
              american prey spot. Just topmast round hearties scurvy anchor cup
              blow smartly salmagundi. Sink shrouds belaying pay cutlass
              gangplank jolly killick lass. Parrel american six arr jack line.
              Starboard cog seas coffer hang rig boom belay to. Buccaneer blow
              piracy parrel down black timbers rig. Tails nipperkin ketch boom
              gold. Pirate topgallant plate jolly sheet dead. Crimp black crack
              boatswain men.
            </p>{" "}
            <p className="text-xs font-ligt leading-4 mb-4">
              Pin ipsum shot boat arr. Mizzen prey scurvy no crow's. Log roger
              schooner yer gangway coast piracy gunwalls. Chase yarr chains down
              arrgh hands spirits gun. Salmagundi scurvy yarr lugsail aye or bow
              shiver. Lass dock pin driver poop rat. Avast sail bilge rat
              gunwalls topsail pink.
            </p>
          </div>
        </div>
      )}
      {showPrivacy && (
        <div className="modal-overlay" onClick={togglePrivacy}>
          <div className={`modal-content  ${showPrivacy ? "open" : ""}`}>
            <button
              className="absolute top-20 right-2 close-button"
              onClick={togglePrivacy}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.2457 29.4209L24.8247 24L30.2457 18.579C30.4641 18.353 30.4641 17.9946 30.2457 17.7685C30.0219 17.5368 29.6526 17.5304 29.4209 17.7542L23.9999 23.1752L18.579 17.7543C18.353 17.536 17.9946 17.536 17.7685 17.7543C17.5368 17.9781 17.5304 18.3474 17.7542 18.5791L23.1751 24L17.7542 29.4209C17.6448 29.5302 17.5834 29.6786 17.5834 29.8332C17.5833 30.1554 17.8445 30.4166 18.1666 30.4166C18.3214 30.4168 18.4698 30.3553 18.579 30.2457L23.9999 24.8248L29.4209 30.2457C29.5301 30.3553 29.6786 30.4169 29.8333 30.4166C29.9879 30.4166 30.1361 30.3552 30.2455 30.2459C30.4734 30.0181 30.4735 29.6487 30.2457 29.4209Z"
                  fill="#021626"
                />
              </svg>
            </button>
            <h3 className="text-xl mb-4 pt-[40%] eb-garamond-font">Privacy policy</h3>
            <p className="text-xs font-ligt leading-4 mb-4">
              Pirate ipsum arrgh bounty warp jack. Clipper driver the sloop
              anchor. Coast coxswain anchor jennys just furl pin gangway yellow.
              Ahoy timbers dead tender guns of arr round down bilge. Sink black
              avast plate tell her tender. Road tales halter grog gun. Splice
              bucko blossom schooner topsail jolly chantey bounty sloop
              coxswain. Or aft o'nine run the dock belaying clipper. Hang
              ballast down topsail scurvy grog. Heave halter to spot log dock
              rat heave hands ipsum. Locker yer coxswain gold gangway. Grog pink
              deck men jones' yawl yard fer. Lugsail starboard plate crack
              topsail. Pin ipsum shot boat arr. Mizzen prey scurvy no crow's.
              Log roger schooner yer gangway coast piracy gunwalls. Chase yarr
              chains down arrgh hands spirits gun. Salmagundi scurvy yarr
              lugsail aye or bow shiver. Lass dock pin driver poop rat. Avast
              sail bilge rat gunwalls topsail pink.
            </p>
            <p className="text-xs font-ligt leading-4 mb-4">
              On starboard blow sail bow grog just arr. Pinnace privateer just
              american prey spot. Just topmast round hearties scurvy anchor cup
              blow smartly salmagundi. Sink shrouds belaying pay cutlass
              gangplank jolly killick lass. Parrel american six arr jack line.
              Starboard cog seas coffer hang rig boom belay to. Buccaneer blow
              piracy parrel down black timbers rig. Tails nipperkin ketch boom
              gold. Pirate topgallant plate jolly sheet dead. Crimp black crack
              boatswain men.
            </p>{" "}
            <p className="text-xs font-ligt leading-4 mb-4">
              Pin ipsum shot boat arr. Mizzen prey scurvy no crow's. Log roger
              schooner yer gangway coast piracy gunwalls. Chase yarr chains down
              arrgh hands spirits gun. Salmagundi scurvy yarr lugsail aye or bow
              shiver. Lass dock pin driver poop rat. Avast sail bilge rat
              gunwalls topsail pink.
            </p>
          </div>
        </div>
      )}

      {showCountryModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCountryModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-8 right-5 close-button"
              onClick={() => setShowCountryModal(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#021626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="relative w-full max-w-[305px]">
  <input
    type="text"
    placeholder="Search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 p-2 border-2 focus:border-blue border-blue rounded-full mb-2"
  />
  <div className="absolute top-[10px] right-0 pr-6  flex items-center pointer-events-none">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8595 21.1526L17.6976 16.9908C19.1227 15.3989 19.9975 13.3042 20 11C20 6.02942 15.9706 2 11 2C6.02942 2 2 6.02942 2 11C2 15.9706 6.02942 20 11 20C13.3041 19.9975 15.3989 19.1228 16.9907 17.6978L21.1525 21.8596C21.3463 22.0468 21.6534 22.0468 21.8472 21.8596C22.0458 21.6678 22.0513 21.3513 21.8595 21.1526ZM11 19C6.58173 19 3 15.4183 3 11C3 6.58173 6.58173 3 11 3C15.4162 3.00507 18.9949 6.5838 19 11C19 15.4183 15.4183 19 11 19Z"
        fill="#021626"
      />
    </svg>
  </div>
</div>
            <div className="">
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center p-2 cursor-pointer focus:border-blue border-blue"
                  onClick={() => handleCountrySelect(country)}
                >
                  <Flag
                    code={country.code}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  <span>
                    {country.name} (+{country.phoneCode})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step !== 3 && (
        <div className="relative w-full pt-5">
          <div className="absolute left-0 pl-6 pt-5 top-1/2 transform -translate-y-1/2">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="text-black">
                <Image width={28} height={28} src={arrow} alt="arrow" />
              </button>
            )}
          </div>
          <div className="flex-1 flex items-center self-center text-center justify-center">
            <Image width={50} height={50} src={logo} alt="logo" />
          </div>
        </div>
      )}
      {step !== 3 && (
        <div className="flex justify-center items-center space-x-2 my-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 1 ? "bg-blue text-white" : "bg-lightGray text-gray"
            }`}
          >
            1
          </div>
          <div className="w-1 h-1 bg-gray rounded-full"></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 2 ? "bg-blue text-white" : "bg-lightGray text-gray"
            }`}
          >
            2
          </div>
        </div>
      )}
      <form
        className="pt-6 text-black w-full px-6"
        onSubmit={formik.handleSubmit}
      >
        {step === 1 && (
          <div>
            <h2 className=" eb-garamond-font text-xl leading-7 text-black font-bold mb-4">
              Some introductions
            </h2>
            <label className="mb-1 text-xs">First name</label>
            <input
              type="text"
              aria-describedby="first-name-error"
              name="firstName"
              placeholder="Your first name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`pr-2 pb-4 pl-6 mb-2 py-3 lg:py-2 w-full text-black font-normal bg-transparent appearance-none border-[2px] ${
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-500"
                  : "border-borderGray"
              } focus:border-blue outline-none transition-all ease-out text-lg disabled:opacity-25 disabled:cursor-not-allowed rounded-full`}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="flex mb-5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.99992 8.58333C6.76982 8.58333 6.58325 8.76989 6.58325 9C6.58325 9.2301 6.76982 9.41666 6.99992 9.41666C7.23002 9.41666 7.41659 9.2301 7.41659 9C7.41659 8.76989 7.23002 8.58333 6.99992 8.58333ZM6.99992 7.66666C7.18388 7.66654 7.33337 7.51733 7.33325 7.33333V4.66666C7.33325 4.48258 7.184 4.33333 6.99992 4.33333C6.81584 4.33333 6.66659 4.48258 6.66659 4.66666V7.33369C6.66671 7.5177 6.81592 7.66678 6.99992 7.66666ZM6.99992 0.333328C3.31803 0.333328 0.333252 3.31811 0.333252 7C0.333252 10.6819 3.31803 13.6667 6.99992 13.6667C10.68 13.6623 13.6623 10.6801 13.6666 7C13.6666 3.31811 10.6818 0.333328 6.99992 0.333328ZM6.99992 13C3.6862 13 0.999919 10.3137 0.999919 7C0.999919 3.68627 3.6862 0.999995 6.99992 0.999995C10.3121 1.00362 12.9963 3.68778 12.9999 7C12.9999 10.3137 10.3136 13 6.99992 13Z"
                    fill="#F23148"
                  />
                </svg>
                <p id="first-name-error" className="text-red-500 pl-1 text-xs">
                  {formik.errors.firstName}
                </p>
              </div>
            )}

            <label className="text-xs mb-2">Last name</label>
            <input
              type="text"
              name="lastName"
              aria-describedby="last-name-error"
              placeholder="Your last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`pr-2 pl-6 py-3 lg:py-2 mb-2 w-full text-black font-normal bg-transparent appearance-none border-[2px] ${
                formik.touched.lastName && formik.errors.lastName
                  ? "border-red-500"
                  : "border-borderGray"
              } focus:border-blue outline-none transition-all ease-out text-lg disabled:opacity-25 disabled:cursor-not-allowed rounded-full`}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="flex">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.99992 8.58333C6.76982 8.58333 6.58325 8.76989 6.58325 9C6.58325 9.2301 6.76982 9.41666 6.99992 9.41666C7.23002 9.41666 7.41659 9.2301 7.41659 9C7.41659 8.76989 7.23002 8.58333 6.99992 8.58333ZM6.99992 7.66666C7.18388 7.66654 7.33337 7.51733 7.33325 7.33333V4.66666C7.33325 4.48258 7.184 4.33333 6.99992 4.33333C6.81584 4.33333 6.66659 4.48258 6.66659 4.66666V7.33369C6.66671 7.5177 6.81592 7.66678 6.99992 7.66666ZM6.99992 0.333328C3.31803 0.333328 0.333252 3.31811 0.333252 7C0.333252 10.6819 3.31803 13.6667 6.99992 13.6667C10.68 13.6623 13.6623 10.6801 13.6666 7C13.6666 3.31811 10.6818 0.333328 6.99992 0.333328ZM6.99992 13C3.6862 13 0.999919 10.3137 0.999919 7C0.999919 3.68627 3.6862 0.999995 6.99992 0.999995C10.3121 1.00362 12.9963 3.68778 12.9999 7C12.9999 10.3137 10.3136 13 6.99992 13Z"
                    fill="#F23148"
                  />
                </svg>
                <p id="last-name-error" className="text-red-500 pl-1 text-xs">
                  {formik.errors.lastName}
                </p>
              </div>
            )}

            <div className="pt-6 pb-2">
              <Button
                aria-label="Go to step 2"
                onClick={() =>
                  formik
                    .validateForm()
                    .then(
                      (errors) => Object.keys(errors).length === 0 && setStep(2)
                    )
                }
                disabled={!formik.isValid}
              >
                Continue
              </Button>
            </div>
            <Button2
              aria-label="Go to your account"
              onClick={function (): void {}}
            >
              Already have an account?
            </Button2>

            <p className="pt-6 text-darkGray text-center pb-64">Version 0.1</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="eb-garamond-font text-xl font-bold mb-4">
              Let’s validate your number
            </h2>
            <label className="font-light text-xs pb-1">Phone number</label>
            <div className="flex flex-row">
              <div
                className={`max-h-[50px] pt-2 text-center items-center justify-center h-[50px] w-full max-w-[112px]    text-black font-normal bg-transparent appearance-none border-[2px] ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-500"
                    : "border-borderGray"
                } focus:border-blue outline-none transition-all ease-out text-lg disabled:opacity-25 disabled:cursor-not-allowed rounded-full cursor-pointer`}
                onClick={() => {
                  setShowCountryModal(true);
                }}
              >
                {selectedCountry ? (
                  <div>
                    <span>(+{selectedCountry.phoneCode})</span>
                  </div>
                ) : (
                  "+44"
                )}
              </div>

              <div className="flex flex-col pl-1">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  aria-describedby="phone-error"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`pr-2 pb-4 pl-6 mb-2 py-3 lg:py-2 w-full text-black font-normal bg-transparent appearance-none border-[2px] ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "border-red-500"
                      : "border-borderGray"
                  } focus:border-blue outline-none transition-all ease-out text-lg disabled:opacity-25 disabled:cursor-not-allowed rounded-full`}
                />
              </div>
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="flex">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.99992 8.58333C6.76982 8.58333 6.58325 8.76989 6.58325 9C6.58325 9.2301 6.76982 9.41666 6.99992 9.41666C7.23002 9.41666 7.41659 9.2301 7.41659 9C7.41659 8.76989 7.23002 8.58333 6.99992 8.58333ZM6.99992 7.66666C7.18388 7.66654 7.33337 7.51733 7.33325 7.33333V4.66666C7.33325 4.48258 7.184 4.33333 6.99992 4.33333C6.81584 4.33333 6.66659 4.48258 6.66659 4.66666V7.33369C6.66671 7.5177 6.81592 7.66678 6.99992 7.66666ZM6.99992 0.333328C3.31803 0.333328 0.333252 3.31811 0.333252 7C0.333252 10.6819 3.31803 13.6667 6.99992 13.6667C10.68 13.6623 13.6623 10.6801 13.6666 7C13.6666 3.31811 10.6818 0.333328 6.99992 0.333328ZM6.99992 13C3.6862 13 0.999919 10.3137 0.999919 7C0.999919 3.68627 3.6862 0.999995 6.99992 0.999995C10.3121 1.00362 12.9963 3.68778 12.9999 7C12.9999 10.3137 10.3136 13 6.99992 13Z"
                    fill="#F23148"
                  />
                </svg>
                <p
                  id="phone-number-error"
                  className="text-red-500 pl-1 text-xs"
                >
                  {formik.errors.phoneNumber}
                </p>
              </div>
            )}
            <p className="text-black font-light text-xs py-6">
              By clicking ‘Continue’ you confirm that you agree to our
              <span
                onClick={toggleTerms}
                className=" text-blue cursor-pointer font-bold pl-1"
              >
                terms and conditions
              </span>{" "}
              and
              <span
                onClick={togglePrivacy}
                className="pl-1 text-blue cursor-pointer font-bold"
              >
                privacy policy
              </span>
            </p>

            <div className="flex justify-between">
              <Button onClick={() => setStep(3)} disabled={!formik.isValid}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center pt-56 items-center justify-center flex flex-col">
            <Image
              src={congradulationsBanner}
              alt="banner"
              width={100}
              height={100}
            ></Image>
            <h2 className=" eb-garamond-font text-2xl pt-4 text-black font-bold mb-4">
              Congratulations!
            </h2>
            <p className=" eb-garamond-font text-base font-light">
              Welcome to your very own 25
            </p>
            <button
              aria-label="Go back to start"
              onClick={handleBackToStart}
              className="bg-white text-blue font-bold text-base pt-2"
            >
              Back to start
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;

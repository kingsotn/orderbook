"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, cn, Input, Spacer, Slider } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone, today, DateValue, parseDateTime, CalendarDateTime } from "@internationalized/date";

export const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "font-mono text-xxs", // Smaller text size
                    "inline-flex items-center", // Align items to center
                    "m-0", // Minimal margins and padding
                    "cursor-pointer rounded gap-1", // Smaller gap and border-radius
                    "border border-transparent", // Transparent border by default
                    "transition-transform duration-200", // Transition effect for transformations
                    "hover:scale-105", // Hover scale effect
                    "w-auto h-4" // Adjust width and height for smaller size
                ),
            }}
        >
            <span className="radio-button" />
            <span className="text-xxs">{children}</span> {/* Set text size */}
        </Radio>
    );
};


interface DateTimeSliderProps {
    // startDate: Date;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    duration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
}

const DateTimeSlider: React.FC<DateTimeSliderProps> = ({ setStartDate, duration, setDuration }) => {
    const handleChange = (val: any) => {
        setDuration(val);
    };

    const formatValue = (val: any) => {
        if (val <= 50) {
            const hours = 1 + Math.floor((val * 22) / 50);
            return hours;
        } else {
            const days = 1 + Math.floor(((val - 50) * 30) / 50);
            return days;
        }
    };

    const getLabel = (val: any) => {
        if (val <= 50) {
            const hours = formatValue(val);
            return hours === 1 ? "hour" : "hours";
        } else {
            const days = formatValue(val);
            return days === 1 ? "day" : "days";
        }
    };


    // only for days before "today"
    const isDateUnavailable = (date: DateValue): boolean => {
        const todayDate = today(getLocalTimeZone());
        return (
            date.compare(todayDate) < 0 // Check if the date is before today
        );
    };

    const startDateValue = new Date();

    // Convert Date to DateValue inline, adding 1 to the hour
    const startDateAsDateValue: DateValue = parseDateTime(
        `${startDateValue.getFullYear()}-${(startDateValue.getMonth() + 1).toString().padStart(2, '0')}-${startDateValue.getDate().toString().padStart(2, '0')}T${(startDateValue.getHours() + 1).toString().padStart(2, '0')}:00`
    );

    const handleDateChange = (value: CalendarDateTime) => {
        // Convert CalendarDateTime to Date
        const convertedDate = new Date(value.year, value.month - 1, value.day, value.hour);
        setStartDate(convertedDate);
        console.log("Selected date:", convertedDate);
    };

    return (
        <div className="font-mono max-w-xl w-full space-y-4">
            <div className="flex flex-row gap-4">
                <DatePicker
                    label="Start Date"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    granularity='hour'
                    defaultValue={startDateAsDateValue}
                    className="w-full"
                    isDateUnavailable={isDateUnavailable}
                    onChange={handleDateChange}
                />
            </div>
            <div className="flex items-center space-x-4 max-w-xl w-full border border-gray-300 rounded-lg p-1">
                <div className="flex-grow max-w-xs w-full">
                    <Slider
                        step={1}
                        value={duration}
                        color={'foreground'}
                        size="sm"
                        onChange={handleChange}
                        aria-label="Duration slider"
                        classNames={{
                            base: "w-full",
                            track: "bg-gray-300 h-0.5 rounded-full",
                            thumb: [
                                "block h-5 w-5 rounded-full border border-1 border-gray-400 bg-gray-50 shadow cursor-default",
                                "hover:bg-gray-300 hover:border-gray-600",
                                "transform hover:scale-110 transition active:scale-100",
                            ]
                        }}
                    />
                </div>
                <div className="w-[93px] bg-gray-50 px-4 py-1 text-gray-600 rounded-r-lg border-l items-center font-mono text-xs text-center flex justify-center bg-gray-300 select-none">
                    <span>{formatValue(duration)} {getLabel(duration)}</span>
                </div>
            </div>
        </div>
    );
};



const CustomForm: React.FC<{
    price: string,
    setPrice: React.Dispatch<React.SetStateAction<string>>,
    gpus: string,
    setGpus: React.Dispatch<React.SetStateAction<string>>,
    // startDate: Date,
    setStartDate: React.Dispatch<React.SetStateAction<Date>>,
    duration: number,
    setDuration: React.Dispatch<React.SetStateAction<number>>,
    marketPrice: string,
    defaultGpuCount: string,
    setIsFilled: React.Dispatch<React.SetStateAction<boolean>>
    isFilled: boolean;
}> = ({ price, setPrice, gpus, setGpus, setStartDate, duration, setDuration, marketPrice, defaultGpuCount, setIsFilled, isFilled }) => {

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value)) {  // Validate to two decimal places
            setPrice(value);
        }
        setIsFilled(e.target.value.trim() !== '');
    };

    const handleGpusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const intValue = parseInt(value, 10);
        if ((intValue >= 1 && intValue <= 512) || value === '') {
            setGpus(value);
        }
    };


    const handleKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>,
        nextInputId: string,
        previousInputId: string,
        placeholderValue: string
    ) => {
        const { key, shiftKey, currentTarget } = e;
        const currentId = currentTarget.id;

        const setPlaceholderIfEmpty = () => {
            if (currentTarget.value === '') {
                currentTarget.value = placeholderValue;
                if (currentId === 'price-input') {
                    setPrice(placeholderValue);
                } else if (currentId === 'gpus-input') {
                    setGpus(placeholderValue);
                }
            }
        };

        if ((e.key === 'Enter' || e.key === 'Tab') && e.currentTarget.value === "") {
            if (e.currentTarget.id === 'price-input') {
                e.currentTarget.value = marketPrice;
                const roundedPrice = Math.round(parseFloat(marketPrice) * 100) / 100;
                setPrice(roundedPrice.toFixed(2)); // Ensure it's always two decimal places
            } else if (e.currentTarget.id === 'gpus-input') {
                e.currentTarget.value = defaultGpuCount;
                setGpus(defaultGpuCount); // Ensure it's always two decimal places
            }

            e.preventDefault();

            // Move focus to the next input if needed
            const nextInput = document.getElementById(nextInputId);
            nextInput?.focus();
            setIsFilled(true);
        } else if ((e.key === 'Enter' || e.key === 'Tab') && e.currentTarget.value !== "") {
            console.log('here')
            if (e.currentTarget.id === 'price-input') {
                const roundedPrice = Math.round(parseFloat(e.currentTarget.value) * 100) / 100;
                setPrice(roundedPrice.toFixed(2)); // Ensure it's always two decimal places
            } else if (e.currentTarget.id === 'gpus-input') {
                setGpus(e.currentTarget.value); // Ensure it's always two decimal places
            }

            e.preventDefault();

            // Move focus to the next input if needed
            const nextInput = document.getElementById(nextInputId);
            console.log('next', nextInput)
            nextInput?.focus();
            setIsFilled(true);
        }


        if (key === 'Tab') {
            console.log('here too')
            e.preventDefault();
            if (!shiftKey) {
                const nextInput = document.getElementById(nextInputId);
                console.log('ni2', nextInput)
                nextInput?.focus();
            } else if (shiftKey) {
                const previousInput = document.getElementById(previousInputId);
                previousInput?.focus();
            }
        }
    };

    return (
        <>
            <Input
                type="number"
                label="Price"
                step={0.01}
                value={price}
                placeholder={marketPrice}
                className="font-mono max-w-xl w-full"
                id="price-input"
                startContent={
                    <span className={`text-small ${isFilled ? 'text-black' : 'text-default-400'}`}>
                        $
                    </span>
                }
                endContent={<span className="text-default-400 text-xs">/gpuhr</span>}
                onChange={handlePriceChange}
                onKeyDown={(e) => handleKeyPress(e, 'gpus-input', 'price-input', marketPrice)}
                errorMessage={"Enter a value"}
            />
            <Spacer y={1.5} />
            <Input
                type="number"
                label="GPUs"
                value={gpus}
                placeholder="1"
                className="font-mono max-w-xl w-full"
                id="gpus-input"
                endContent={<span className="text-default-400 text-xs">amount</span>}
                onChange={handleGpusChange}
                onKeyDown={(e) => handleKeyPress(e, 'date-time-slider', 'price-input', 'default-gpus')}
            />
            <Spacer y={1.5} />
            <div id="date-time-slider">
                <DateTimeSlider setStartDate={setStartDate} duration={duration} setDuration={setDuration} />
            </div>
        </>
    );
};


interface ReceiptType {
    refNumber: string;
    orderType: string;
    price: string;
    gpuCount: string;
    time: string;
    total: number;
    startDate: Date;
    duration: number;
}

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimatePresence, motion } from "framer-motion"
const Receipt: React.FC<{ receiptData: ReceiptType }> = ({ receiptData }) => {

    const {
        refNumber,
        orderType,
        price,
        gpuCount,
        time,
        total,
        startDate,
        duration,
    } = receiptData;

    const formatDateTime = (date: Date): string => {
        // Extract the necessary parts from the Date object
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            hour12: true,
        };

        // Extract month, day, year, and time with period using Intl.DateTimeFormat
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        const [monthDay, year, timePeriod] = formattedDate.split(', ');
        const [time, period] = timePeriod.split(" ");
        // console.log(monthDay, year)
        const formattedString = `${monthDay}, ${year} @${time}${period}`;

        // console.log("formatted:", formattedString);
        return formattedString;
    };

    const calculateEndDate = (start: Date, duration: number): Date => {
        const startDateCopy = new Date(start);
        if (duration <= 50) {
            const hours = 1 + Math.floor((duration * 22) / 50);
            startDateCopy.setHours(startDateCopy.getHours() + hours);
        } else {
            const days = 1 + Math.floor(((duration - 50) * 30) / 50);
            startDateCopy.setDate(startDateCopy.getDate() + days);
        }
        return startDateCopy;
    };

    const endDate = calculateEndDate(startDate, duration);

    console.log("ref", refNumber)

    const receiptFields = [
        { label: 'Ref Number', value: refNumber },
        { label: 'Transaction Type', value: orderType ? orderType : "" },
        { label: 'Price /gpuhr', value: price ? `$ ${price}` : "" },
        { label: 'GPU Count', value: gpuCount ? gpuCount : "" },
        { label: 'Scheduled for', value: time ? formatDateTime(new Date(time)) : "" },
        { label: 'Duration', value: duration ? `${duration} hours` : "" },
        { label: 'Total', value: total ? `$ ${total.toLocaleString()}` : "" }
    ].filter(field => field.value);

    const animationVariants = {
        initial: { opacity: 0.5, y: 10 },
        animate: { opacity: 1, y: 5 },
    };

    return (
        <div className="font-mono">
            <div className="text-sm bold mt-4 pl-2 mb-1">
                Order Summary
            </div>
            <div className="px-2 py-2 border-t border-gray-200">
                {receiptFields.map((field, index) => (
                    <div key={index} className="w-full font-mono text-xs flex justify-between py-1">
                        <div className="text-left text-gray-500">
                            {field.label}
                        </div>
                        <AnimatePresence>
                            <div className="text-right">
                                {field.value
                                    ? field.value.split('').map((char, charIndex) => (
                                        <motion.span
                                            key={`${field.label}-${charIndex}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.15 }}
                                            exit={{
                                                opacity: 0,
                                                y: 100,
                                                transition: {
                                                    duration: 0.15,
                                                },
                                            }}
                                            className={`inline-block ${char === ' ' ? 'mr-1' : ' '} ${field.label === "Total" ? 'font-bold' : ' '}`}
                                        >
                                            {char}
                                        </motion.span>
                                    ))
                                    : '-'
                                }
                            </div>
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>

    );
};

import { v4 as uuidv4 } from 'uuid';

const PlaceOrderForm: React.FC = () => {
    const [orderType, setOrderType] = useState<string>(''); // market buy, limit buy, market sell, limit sell
    const [price, setPrice] = useState<string>('');
    const [gpus, setGpus] = useState<string>('');
    const marketPrice = "4.31" // let's say it's this for now
    const defaultGpuCount = "1"
    const [isFilled, setIsFilled] = useState(false); // coloring the dollar sign
    const [refNumber, _] = useState(uuidv4());


    // date stuff
    const initialDate = new Date();
    initialDate.setHours(initialDate.getHours() + 1, 0, 0, 0); // Round to the next hour
    const [startDate, setStartDate] = useState<Date>(initialDate);
    const [duration, setDuration] = useState(25); // Default value

    const total = parseFloat(price) * parseInt(gpus, 10);
    const receiptData = {
        startDate,
        duration,
        refNumber: refNumber, // random for now
        orderType, // taken from RadioGroup
        price, // taken from CustomForm
        gpuCount: gpus, // taken from CustomForm
        time: startDate.toLocaleString(), // taken from the CustomForm's DateTimeSlider Component
        total: isNaN(total) ? 0 : total, // Calculate total
    };

    return (
        <>
            <Spacer y={3} />
            <RadioGroup
                orientation='horizontal'
                className="max-w-xl w-full text-xxs">
                <CustomRadio value="Buy" onChange={() => setOrderType("Buy")}>
                    Buy
                </CustomRadio>
                <CustomRadio description="" value="Sell" onChange={() => setOrderType("Sell")}>
                    Sell
                </CustomRadio>
                <Spacer y={4} />
            </RadioGroup>
            <Spacer y={1.5} />
            <CustomForm
                price={price}
                setPrice={setPrice}
                gpus={gpus}
                setGpus={setGpus}
                setStartDate={setStartDate}
                duration={duration}
                setDuration={setDuration}
                marketPrice={marketPrice}
                defaultGpuCount={defaultGpuCount}
                setIsFilled={setIsFilled}
                isFilled={isFilled}
            />
            <Receipt receiptData={receiptData} />
            {/* <Submit /> */}
        </>
    );
};

export default PlaceOrderForm;

"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, cn, Input, Spacer, Slider } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone, today, DateValue, parseDateTime, CalendarDateTime } from "@internationalized/date";
import { Tabs, Tab } from "@nextui-org/react";

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

    const getHourNumber = (val: number) => {
        if (val <= 505) {
            // Mapping 0 to 500 to 1 to 23 hours
            // We need to make sure 500 maps to 23 hours correctly
            const hours = 1 + Math.floor((val / 500) * 22);
            return hours;
        } else {
            // Mapping 501 to 1000 to 1 to 60 days
            // We need to make sure 501 maps to 1 day correctly
            const days = 1 + Math.floor(((val - 501) / 499) * 59);
            return days;
        }
    };

    const getHourLabel = (val: number) => {
        if (val <= 505) {
            const hours = getHourNumber(val);
            return hours === 1 ? "hour" : "hours";
        } else {
            const days = getHourNumber(val);
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
        `${startDateValue.getFullYear()}-${(startDateValue.getMonth() + 1).toString().padStart(2, '0')}-${startDateValue.getDate().toString().padStart(2, '0')}T${(startDateValue.getHours()).toString().padStart(2, '0')}:00`
    );

    const handleDateChange = (value: CalendarDateTime) => {
        // Convert CalendarDateTime to Date
        const convertedDate = new Date(value.year, value.month - 1, value.day, value.hour);
        setStartDate(convertedDate);
        console.log("Selected date:", convertedDate);
    };

    return (
        <div className="font-mono max-w-xl w-full space-y-4 text-gray-600">
            <div className="flex flex-row gap-4  ">
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
            <div className="flex items-center max-w-xl w-full rounded-lg p-1">
                <div className="flex-grow w-full">
                    <Slider
                        step={1}
                        minValue={0}
                        maxValue={1000}
                        value={duration}
                        color={'foreground'}
                        size="lg"
                        onChange={handleChange}
                        aria-label="Duration slider"
                        classNames={{
                            base: "w-full",
                            track: "bg-gray-300 h-0.5 rounded-full color-white",
                            filler: "bg-gray-600"
                        }}
                        renderThumb={(props) => (
                            <div
                                {...props}
                                className="group top-1/2 bg-background rounded-full cursor-default data-[dragging=true]:cursor-default"
                            >
                                <span
                                    className={[
                                        "block h-5 w-5 rounded-full border border-gray-600 bg-gray-50 shadow cursor-pointer",
                                        "hover:bg-gray-300 hover:border-gray-600 hover:scale-110 hover:cursor-default",
                                        "transition-transform duration-200 ease-in-out",
                                        "group-data-[dragging=true]:bg-gray-300 group-data-[dragging=true]:border-gray-600 group-data-[dragging=true]:scale-110"
                                    ].join(" ")}
                                />
                            </div>
                        )}
                    />
                </div>
                <div className="flex-shrink-0 w-[74px] px-2 py-1 text-gray-600 rounded-r-lg border-l font-mono text-xs flex items-center bg-gray-200 select-none overflow-hidden">
                    <span className="text-center mx-auto">{getHourNumber(duration)}</span>
                    <span className='ml-auto'>{getHourLabel(duration)}</span>
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
    orderType: string;
}> = ({ price, setPrice, gpus, setGpus, setStartDate, duration, setDuration, marketPrice, defaultGpuCount, setIsFilled, isFilled, orderType }) => {

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
            setGpus(intValue.toString());
        } else if (intValue > 512) {
            setGpus('512');
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
            if (e.currentTarget.id === 'price-input') {
                const roundedPrice = Math.round(parseFloat(e.currentTarget.value) * 100) / 100;
                setPrice(roundedPrice.toFixed(2)); // Ensure it's always two decimal places
            } else if (e.currentTarget.id === 'gpus-input') {
                setGpus(e.currentTarget.value); // Ensure it's always two decimal places
            }

            e.preventDefault();

            // Move focus to the next input if needed
            const nextInput = document.getElementById(nextInputId);
            nextInput?.focus();
            setIsFilled(true);
        }


        if (key === 'Tab') {
            console.log('here too')
            e.preventDefault();
            if (!shiftKey) {
                const nextInput = document.getElementById(nextInputId);
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
                isDisabled={orderType.split(" ")[0] === "Market"}
                isRequired={orderType.split(" ")[0] === "Buy" || orderType.split(" ")[0] === "Sell"}
                startContent={
                    <span className={`text-small ${isFilled ? 'text-gray-600' : 'text-default-400'}`}>
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
                type='number'
                label="GPUs"
                value={gpus}
                placeholder="1"
                isRequired
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

    // useEffect(() => {
    //     console.log("orderType", orderType);
    // }, [orderType]);

    const formatDateTime = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: '2-digit', // Ensure day is zero-padded
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric', // Added minute for more precise time
            hour12: true,
        };

        // Extract month, day, year, and time with period using Intl.DateTimeFormat
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        const [monthDay, year, timePeriod] = formattedDate.split(', ');
        const [month, day] = monthDay.split(' ');
        const [time, period] = timePeriod.split(' ');

        // Ensure day is zero-padded
        const zeroPaddedDay = day.padStart(2, '0');

        // Construct the final formatted string
        const formattedString = `${month} ${zeroPaddedDay}, ${year} @${time} ${period}`;

        return formattedString;
    };


    const calculateEndDate = (start: Date, duration: number): Date => {
        const startDateCopy = new Date(start);
        if (duration <= 500) {
            const hours = 1 + Math.floor((duration * 22) / 500);
            startDateCopy.setHours(startDateCopy.getHours() + hours);
        } else {
            const days = 1 + Math.floor(((duration - 500) * 30) / 500);
            startDateCopy.setDate(startDateCopy.getDate() + days);
        }
        return startDateCopy;
    };

    const getHourNumber = (val: number): number => {
        if (val <= 505) {
            const hours = 1 + Math.floor((val * 22) / 500);
            return hours;
        } else {
            const days = 1 + Math.floor(((val - 500) * 89) / 500);
            return days;
        }
    };

    const getHourLabel = (val: number): string => {
        if (val <= 505) {
            const hours = getHourNumber(val);
            return hours === 1 ? "hour" : "hours";
        } else {
            const days = getHourNumber(val);
            return days === 1 ? "day" : "days";
        }
    };

    const endDate = calculateEndDate(startDate, duration);

    const receiptFields = [
        { label: 'Ref Number', value: refNumber },
        { label: 'Transaction Type', value: orderType ? orderType : "" },
        { label: 'Price /gpuhr', value: price ? `$ ${price}` : "" },
        { label: 'GPU Count', value: gpuCount ? gpuCount : "" },
        { label: 'Begins', value: time ? formatDateTime(new Date(time)) : "" },
        { label: 'Ends', value: " " },
        { label: 'Total', value: total ? `$ ${total.toLocaleString()}` : "" }
    ].filter(field => field.value);

    const animationVariants = {
        initial: { opacity: 0.5, y: 10 },
        animate: { opacity: 1, y: 5 },
    };

    // useEffect(() => {
    //     console.log("formated", getHourNumber(duration), getHourLabel(duration));
    //     console.log("endtime", calculateEndTime(time, duration))
    // }, [duration]);


    function calculateEndTime(time: string, duration: number) {
        if (!time || !duration) return "";

        const durationValue = getHourNumber(duration); // Get the numeric value
        const durationLabel = getHourLabel(duration); // Get the unit (day(s) or hour(s))

        // Calculate total hours
        const totalHours = durationLabel.includes('day') ? durationValue * 24 : durationValue;


        // Calculate end time
        const endTime = new Date(new Date(time).getTime() + totalHours * 60 * 60 * 1000);
        return formatDateTime(endTime);
    }

    return (
        <div className="font-mono">
            <div className="text-sm mt-4 pl-2 mb-1 font-normal">
                Order Summary
            </div>
            <Divider />
            <div className="px-2 py-2">
                {receiptFields.map((field, index) => (
                    <div key={index} className="w-full font-mono text-xs flex justify-between py-1">
                        <div className="text-left text-gray-500">
                            {field.label}
                        </div>
                        <div className="text-right">
                            <AnimatePresence>
                                {field.value ? (
                                    field.label === "Ends" ? (
                                        calculateEndTime(time, duration).split('').map((char, charIndex) => (
                                            <motion.span
                                                key={`${field.label}-${charIndex}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.15 }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 5,
                                                    transition: {
                                                        duration: 0.08,
                                                    },
                                                }}
                                                className={`inline-block ${char === ' ' ? 'mr-1' : ' '}`}
                                            >
                                                {char}
                                            </motion.span>
                                        ))
                                    ) : (
                                        field.value.split('').map((char, charIndex) => (
                                            <motion.span
                                                key={`${field.label}-${charIndex}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.15 }}
                                                exit={{
                                                    opacity: 0,
                                                    y: 5,
                                                    transition: {
                                                        duration: 0.08,
                                                    },
                                                }}
                                                className={`inline-block ${char === ' ' ? 'mr-1' : ' '} ${field.label === "Total" ? 'font-bold' : ''}`}
                                            >
                                                {char}
                                            </motion.span>
                                        ))
                                    )
                                ) : (
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{
                                            opacity: 0,
                                            y: 100,
                                            transition: {
                                                duration: 0.15,
                                            },
                                        }}
                                    >
                                        -
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

import { Button } from "@nextui-org/react";
type SubmitFormButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    orderType: string
};
const SubmitFormButton: React.FC<SubmitFormButtonProps> = ({ onClick, disabled, orderType }) => {
    return (
        <Button
            onClick={onClick}
            color='primary'
            isDisabled={disabled}
            endContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            }
            className="text-sm justify-start px-4 py-1 flex items-center w-18 h-10 hover:scale-105"
        >
            <span className="truncate">{orderType}</span>
        </Button>
    );
};

import { Divider } from "@nextui-org/divider";
import { v4 as uuidv4 } from 'uuid';
const PlaceOrderForm: React.FC = () => {
    const [orderType, setOrderType] = useState<string>('Buy'); // market buy, limit buy, market sell, limit sell

    const marketPrice = "4.31" // let's say it's this for now
    const defaultGpuCount = "1"
    const [price, setPrice] = useState<string>('');
    const [gpus, setGpus] = useState<string>('');
    const [isFilled, setIsFilled] = useState(false); // coloring the dollar sign
    const [refNumber, _] = useState(uuidv4());


    // date stuff
    const initialDate = new Date();
    initialDate.setHours(initialDate.getHours() + 1, 0, 0, 0); // Round to the next hour
    const [startDate, setStartDate] = useState<Date>(initialDate);
    const [duration, setDuration] = useState(250); // Default value


    const getHourNumber = (val: number): number => {
        if (val <= 500) {
            const hours = 1 + Math.floor((val * 22) / 500);
            return hours;
        } else {
            const days = 1 + Math.floor(((val - 500) * 89) / 500);
            return days;
        }
    };

    const getHourLabel = (val: number): string => {
        if (val <= 500) {
            const hours = getHourNumber(val);
            return hours === 1 ? "hour" : "hours";
        } else {
            const days = getHourNumber(val);
            return days === 1 ? "day" : "days";
        }
    };


    function durationToHours(duration: number): number {
        return getHourLabel(duration).includes('day') ? getHourNumber(duration) * 24 : getHourNumber(duration);
    }

    const total: number = Math.round(parseFloat(price) * parseInt(gpus, 10) * durationToHours(duration) * 100) / 100; // add two dec places
    // useEffect(() => {
    //     console.log("pr", price)
    //     console.log(price, gpus, duration)
    //     console.log("total", total);
    // }, [duration]);


    const constructReceiptData = (data: typeof receiptData, marketPrice: string) => {
        return {
            ...data,
            price: data.orderType.includes("Market") ? marketPrice : data.price,
        };
    };

    //   init data
    const receiptData = {
        startDate,
        duration,
        orderType, // taken from RadioGroup
        refNumber: refNumber, // random for now
        price, // taken from CustomForm
        gpuCount: gpus, // taken from CustomForm
        time: startDate.toLocaleString(), // taken from the CustomForm's DateTimeSlider Component
        total: isNaN(total) ? 0 : total, // Calculate total
    };

    // let's process it to include some conditionals, like having a set marketPrice
    const processedReceiptData = constructReceiptData(receiptData, marketPrice);

    return (
        <div className="relative flex flex-col space-y-2 w-full min-w-[300px] max-w-[500px] mx-auto" style={{ minHeight: '43vh' }}>
            <Spacer y={3} />
            <RadioGroup
                orientation='horizontal'
                defaultValue='Buy'
                size='sm'
                className="max-w-xl w-full text-xxs flex flex-nowrap space-x-6 text-gray-600"
            >
                <CustomRadio value="Buy" onChange={() => setOrderType("Buy")}>
                    Buy
                </CustomRadio>
                <CustomRadio value="Sell" onChange={() => setOrderType("Sell")}>
                    Sell
                </CustomRadio>
                <CustomRadio value="Market Buy" onChange={() => { setOrderType("Market Buy"); setPrice(marketPrice) }}>
                    Market Buy
                </CustomRadio>
                <CustomRadio value="Market Sell" onChange={() => { setOrderType("Market Sell"); setPrice(marketPrice) }}>
                    Market Sell
                </CustomRadio>
                <Spacer y={4} />
            </RadioGroup>
            <Spacer y={1.5} />
            <div className="flex-grow">
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
                    orderType={orderType}
                />
                <div className="w-full">
                    <Receipt receiptData={processedReceiptData} />
                </div>
                <Divider />
            </div>
            <div className="absolute bottom-0 right-0 mb-4">
                <SubmitFormButton onClick={() => { console.log("submitted") }} disabled={!total} orderType={orderType} />
            </div>
        </div>
    );
};

export default PlaceOrderForm;

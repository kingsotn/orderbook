"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';
import { RadioGroup, Radio, cn, Input, Spacer, Slider } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";

export const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "font-mono text-sm", // Smaller text
                    "inline-flex m-0 items-center justify-start", // Align items to start to keep radio on the left
                    "w-auto cursor-pointer rounded-md gap-2 p-2 border border-transparent",
                    "bg-content1 hover:bg-content2",
                    "hover:scale-105 transition-transform duration-200", // Hover scale effect
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
};


interface DateTimeSliderProps {
    startDate: Date;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    duration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
}

const DateTimeSlider: React.FC<DateTimeSliderProps> = ({ startDate, setStartDate, duration, setDuration }) => {
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

    const formatDateTime = (date: Date): string => {
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        })
    };

    const endDate = calculateEndDate(startDate, duration);

    return (
        <div className="max-w-xl w-full space-y-4">
            <div className="flex flex-row gap-4">
                <DatePicker
                    label="Start Date"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    granularity='hour'
                    defaultValue={now(getLocalTimeZone())}
                    className="w-full"
                // value={startDate}
                // onChange={setStartDate}
                />
            </div>
            <div className="flex items-center space-x-4 max-w-xl w-full border border-gray-300 rounded-lg p-2">
                <div className="flex-grow max-w-xs w-full">
                    <Slider
                        step={1}
                        value={duration}
                        color={'foreground'}
                        size="sm"
                        onChange={handleChange}
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
            <div className='font-mono'>
                {formatDateTime(startDate)} — {formatDateTime(endDate)}
            </div>
        </div>
    );
};



const CustomForm: React.FC = () => {
    const [price, setPrice] = useState<string>('');
    const [gpus, setGpus] = useState<string>('');
    const marketPrice = "4.31" // let's say it's this for now

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value)) {  // Validate to two decimal places
            setPrice(value);
        }
    };

    const handleGpusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const intValue = parseInt(value, 10);
        if ((intValue >= 1 && intValue <= 512) || value === '') {
            setGpus(value);
        }
    };


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, nextInputId: string, placeholderValue: string) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            if (e.currentTarget.value === '') {
                e.currentTarget.value = placeholderValue;
                if (e.currentTarget.id === 'price-input') {
                    setPrice(placeholderValue);
                } else if (e.currentTarget.id === 'gpus-input') {
                    setGpus(placeholderValue);
                }
            }
            e.preventDefault();
            const nextInput = document.getElementById(nextInputId);
            nextInput?.focus();
        }
    };




    return (
        <>
            <Input
                type="number"
                label="Market Price"
                value={price}
                placeholder={marketPrice}
                className="font-mono max-w-xl w-full"
                id="price-input"
                startContent={<span className="text-default-400 text-small">$</span>}
                endContent={<span className="text-default-400 text-small">/gpuhr</span>}
                onChange={handlePriceChange}
                onKeyDown={(e) => handleKeyPress(e, 'gpus-input', marketPrice)}
                fullWidth
            />
            <Spacer y={1.5} />
            <Input
                type="number"
                label="GPUs"
                value={gpus}
                placeholder="1"
                className="font-mono max-w-xl w-full"
                id="gpus-input"
                endContent={<span className="text-default-400 text-small">amount</span>}
                onChange={handleGpusChange}
                onKeyDown={(e) => handleKeyPress(e, '', '1')}
                fullWidth
            />
        </>
    );
};


const PlaceOrderForm: React.FC = () => {

    // date stuff
    const initialDate = new Date();
    initialDate.setHours(initialDate.getHours() + 1, 0, 0, 0); // Round to the next hour
    const [startDate, setStartDate] = useState(initialDate);
    const [duration, setDuration] = useState(25); // Default value

    const calculateEndDate = (start: Date, duration: number): Date => {
        const startDateCopy = new Date(start);
        if (duration <= 50) {
            const hours = 1 + Math.floor((duration * 22) / 50);
            startDateCopy.setHours(startDateCopy.getHours() + hours);
        } else {
            const days = 1 + Math.floor(((duration - 50) * 30) / 50);
            startDateCopy.setDate(startDateCopy.getDate() + days);
        }
        // startDateCopy.setMinutes(59); // Set minutes to 59
        return startDateCopy;
    };

    const endDate = calculateEndDate(startDate, duration);

    return (
        <>
            <Spacer y={3} />
            <RadioGroup orientation='horizontal' className="max-w-xl w-full">
                <CustomRadio value="buy">
                    Buy
                </CustomRadio>
                <CustomRadio description="" value="sell">
                    Sell
                </CustomRadio>
                <Spacer y={3} />
            </RadioGroup>
            <Spacer y={1.5} />
            <CustomForm />
            <DateTimeSlider startDate={startDate} setStartDate={setStartDate} duration={duration} setDuration={setDuration} />
        </>
    );
};

export default PlaceOrderForm;

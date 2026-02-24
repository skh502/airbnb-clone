"use client";
import { useEffect, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import { Range } from "react-date-range";
import LoginModal from "../modals/LoginModal";
import {
  differenceInDays,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import DatePicker from "../forms/DateRange";
import apiService from "@/services/apiService";
import { PropertyDetailType } from "@/types/general";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  userId: string | null;
  property: PropertyDetailType | undefined;
};

const ReservationSidebar = ({ userId, property }: Props) => {
  const loginModal = useLoginModal();

  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  // const [minDate, setMinDate] = useState<Date>(new Date());
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>("1");

  const handleDateSelection = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const getReservations = async () => {
    const reservations = await apiService.get(
      `/api/properties/${property?.id}/reservations/`,
    );

    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      });

      dates = [...dates, ...range];
    });

    setBookedDates(dates);
  };

  useEffect(() => {
    if (property?.id) {
      getReservations();
    }
  }, [property?.id]);

  useEffect(() => {
    if (property && dateRange.startDate && dateRange.endDate) {
      const isDaysSame = isSameDay(dateRange.startDate, dateRange.endDate);
      const dayCount = isDaysSame
        ? 1
        : differenceInDays(dateRange.endDate, dateRange.startDate);

      if (property) {
        const _fee = ((dayCount * property.price_per_night) / 100) * 5;
        setFee(_fee);
        setTotalPrice(dayCount * property.price_per_night + _fee);
        setNights(dayCount);
      }
    }
  }, [dateRange, property]);

  const handleBooking = async () => {
    if (!userId) {
      // console.log("Login first");
      loginModal.open();
      return;
    } else {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData();

        const isDaysSame = isSameDay(dateRange.startDate, dateRange.endDate);
        let startDate = dateRange.startDate;
        let endDate = dateRange.endDate;
        if (isDaysSame) {
          // end_date = start_date + 1 day (for same-day selection)
          endDate = new Date(dateRange.startDate);
          endDate.setDate(endDate.getDate() + 1);
        }

        formData.append("guests", guests);
        formData.append("start_date", format(startDate, "yyyy-MM-dd"));
        formData.append("end_date", format(endDate, "yyyy-MM-dd"));
        formData.append("number_of_nights", nights.toString());
        formData.append("total_price", totalPrice.toString());

        const response = await apiService.post(
          `/api/properties/${property?.id}/book/`,
          formData,
        );

        if (response.success) {
          console.log("Booking successful");
        } else {
          console.log("Something went wrong...");
        }
      }
    }
  };

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">{`$${
        property?.price_per_night || `XYZ`
      } per night`}</h2>

      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => {
          handleDateSelection(value.selection);
        }}
      />

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">Guests</label>

        <select
          className="w-full -ml-1 text-xm cursor-pointer bg-airbnb/20 rounded-md outline-none p-2"
          onChange={(e) => setGuests(e.target.value)}
        >
          {Array.from({ length: property?.guests || 4 }, (_, i) => i + 1)?.map(
            (num, idx) => (
              <option key={idx} value={num} className="cursor-pointer">
                {num}
              </option>
            ),
          )}
        </select>
      </div>

      <div
        className="cursor-pointer w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
        onClick={handleBooking}
      >
        Book
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>
          ${property?.price_per_night} * {nights} nights
        </p>
        <p>
          {property?.price_per_night && `${property?.price_per_night * nights}`}
        </p>
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>airbnb fee</p>

        <p>{fee}</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between align-center font-bold">
        <p>Total</p>

        <p>{totalPrice}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;

// src/pages/BookingPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { roomApi } from "../services/api";
import useApi from "../hooks/useApi";
import BookingForm from "../components/BookingForm";

function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    setLoading(true);
    setError(null);

    roomApi
      .getById(roomId)
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

  }, [roomId]);

  // Handle booking success
  const handleBookingSuccess = (booking) => {
    // Show success message and redirect
    alert("Booking successful!");
    navigate("/customer-dashboard");
  };

  // Handle booking cancellation
  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading room details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger p-4">
        <h4 className="alert-heading">Error</h4>
        <p>
          There was an error loading the room details. Please try again later.
        </p>
        <button
          className="btn btn-outline-danger mt-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <h2 className="mb-4">Book Your Stay</h2>

      <BookingForm
        room={room}
        onSuccess={handleBookingSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default BookingPage;

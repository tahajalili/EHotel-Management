import { useState, useEffect } from "react";
import api, { searchApi, hotelApi } from "../services/api";
import useApi from "../hooks/useApi";
import RoomCard from "../components/RoomCard";
import { useNavigate } from "react-router-dom";

function Search() {
  // State for search parameters
  const [searchParams, setSearchParams] = useState({
    startDate: "",
    endDate: "",
    capacity: "",
    area: "",
    hotelChain: "",
    category: "",
    minRooms: "",
    priceMin: "",
    priceMax: "",
  });
  const navigate = useNavigate();
  // State for tracking if search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  // State for mock results and loading
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [hotelChains, setHotelChains] = useState([]);

  function distinct(array, prop) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o[prop] === obj[prop])
    );
  }

  useEffect(() => {
    api.hotelApi.getAll().then((response) => {
      setHotels(response);

      setHotelChains(
        distinct(
          response.map((z) => ({ id: z.hotelChainId, name: z.hotelChainName })),
          "id"
        )
      );
    });
  }, []); // Empty array ensures it runs once

  // Mock rooms data
  const mockRooms = [
    {
      id: 1,
      hotel: { name: "Grand Hotel", star: 4 },
      price: 150,
      capacity: "2",
      amenities: "TV,WiFi,Air Conditioning",
      seaView: true,
      mountainView: false,
      extendable: true,
      problemsDamages: "",
    },
    {
      id: 2,
      hotel: { name: "Seaside Resort", star: 5 },
      price: 200,
      capacity: "3",
      amenities: "TV,WiFi,Fridge,Air Conditioning",
      seaView: true,
      mountainView: false,
      extendable: false,
      problemsDamages: "",
    },
    {
      id: 3,
      hotel: { name: "Mountain Lodge", star: 3 },
      price: 120,
      capacity: "2",
      amenities: "TV,Fridge,Fireplace",
      seaView: false,
      mountainView: true,
      extendable: true,
      problemsDamages: "Minor scratch on desk",
    },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    setSearchError(null);

    try {
      // Format dates for API
      const formattedParams = {
        ...searchParams,
        startDate: searchParams.startDate
          ? new Date(searchParams.startDate).toISOString()
          : undefined,
        endDate: searchParams.endDate
          ? new Date(searchParams.endDate).toISOString()
          : undefined,
      };

      // Simulate API delay
      // setTimeout(() => {
      //   // Filter mock rooms based on search criteria
      //   let filteredRooms = [...mockRooms];

      //   if (formattedParams.capacity) {
      //     filteredRooms = filteredRooms.filter(
      //       (room) => room.capacity === formattedParams.capacity
      //     );
      //   }

      //   if (formattedParams.priceMin) {
      //     filteredRooms = filteredRooms.filter(
      //       (room) => room.price >= parseInt(formattedParams.priceMin)
      //     );
      //   }

      //   if (formattedParams.priceMax) {
      //     filteredRooms = filteredRooms.filter(
      //       (room) => room.price <= parseInt(formattedParams.priceMax)
      //     );
      //   }

      //   if (formattedParams.category) {
      //     filteredRooms = filteredRooms.filter(
      //       (room) => room.hotel.star === parseInt(formattedParams.category)
      //     );
      //   }

      //   setResults(filteredRooms);
      //   setLoading(false);
      // }, 1000);

      // When connecting to backend uncomment this:
      const data = await searchApi.searchRooms(formattedParams);
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(error);
      setLoading(false);
    }
  };

  // Handle booking a room
  const handleBookNow = (room) => {
    // Navigate to booking page or open booking modal
    console.log("Booking room:", room);
    alert(`You are about to book room #${room.id} - $${room.price}/night`);
    // Example: 
    navigate(`/booking/${room.id}`);
  };

  return (
    <>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Find Your Perfect Room</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={searchParams.startDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={searchParams.endDate}
                  onChange={handleInputChange}
                  min={
                    searchParams.startDate ||
                    new Date().toISOString().split("T")[0]
                  }
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="capacity" className="form-label">
                  Capacity
                </label>
                <select
                  className="form-select"
                  id="capacity"
                  name="capacity"
                  value={searchParams.capacity}
                  onChange={handleInputChange}
                >
                  <option value="">Any</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="King">King</option>
                  <option value="Queen">Queen</option>
                  <option value="Suite">Suite</option>
                  <option value="Twin">Twin</option>
                  <option value="Triple">Triple</option>
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="area" className="form-label">
                  Area
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="area"
                  name="area"
                  value={searchParams.area}
                  onChange={handleInputChange}
                  placeholder="Any location"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="hotelChain" className="form-label">
                  Hotel Chain
                </label>
                <select
                  className="form-select"
                  id="hotelChain"
                  name="hotelChain"
                  value={searchParams.hotelChain}
                  onChange={handleInputChange}
                >
                  <option value="">Any chain</option>
                  {hotelChains.map((chain) => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="category" className="form-label">
                  Hotel Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={searchParams.category}
                  onChange={handleInputChange}
                >
                  <option value="">Any</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="priceMin" className="form-label">
                  Min Price ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="priceMin"
                  name="priceMin"
                  value={searchParams.priceMin}
                  onChange={handleInputChange}
                  placeholder="Min price"
                  min="0"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="priceMax" className="form-label">
                  Max Price ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="priceMax"
                  name="priceMax"
                  value={searchParams.priceMax}
                  onChange={handleInputChange}
                  placeholder="Max price"
                  min="0"
                />
              </div>
            </div>

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Searching...
                  </>
                ) : (
                  "Search Rooms"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {hasSearched && (
        <div className="search-results">
          <h3 className="mb-4">
            {loading
              ? "Searching..."
              : results.length > 0
              ? `${results.length} Rooms Available`
              : "No Rooms Available"}
          </h3>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Searching for available rooms...</p>
            </div>
          ) : searchError ? (
            <div className="alert alert-danger p-4">
              <h4 className="alert-heading">Error</h4>
              <p>
                {searchError.message ||
                  "An error occurred while searching for rooms"}
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="alert alert-info p-4">
              <h4 className="alert-heading">No Rooms Found</h4>
              <p>
                We couldn't find any rooms matching your criteria. Try adjusting
                your search parameters.
              </p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {results.map((room) => (
                <div key={room.id} className="col">
                  <RoomCard room={room} onBookNow={handleBookNow} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Search;

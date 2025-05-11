CREATE INDEX HotelIds
ON Hotel(Id, HotelChainId);

CREATE INDEX HotelChainIds
ON HotelChain (Id)

CREATE INDEX BookingIds
ON Booking (RoomId)
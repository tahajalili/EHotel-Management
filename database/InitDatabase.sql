IF NOT EXISTS (SELECT 1 FROM dbo.HotelChain)
BEGIN

    DELETE FROM dbo.Room;
    DELETE FROM dbo.Hotel;
    DELETE FROM dbo.HotelChain;


    INSERT INTO dbo.HotelChain
    (
        Name,
        NumHotels
    )
    VALUES
    ('HotelChain A', 8),
    ('HotelChain B', 8),
    ('HotelChain C', 8),
    ('HotelChain D', 8),
    ('HotelChain E', 8);



    DECLARE @HotelAId INT =
            (
                SELECT TOP 1 Id FROM dbo.HotelChain WHERE Name = 'HotelChain A'
            );
    DECLARE @HotelBId INT =
            (
                SELECT TOP 1 Id FROM dbo.HotelChain WHERE Name = 'HotelChain B'
            );
    DECLARE @HotelCId INT =
            (
                SELECT TOP 1 Id FROM dbo.HotelChain WHERE Name = 'HotelChain C'
            );
    DECLARE @HotelDId INT =
            (
                SELECT TOP 1 Id FROM dbo.HotelChain WHERE Name = 'HotelChain D'
            );
    DECLARE @HotelEId INT =
            (
                SELECT TOP 1 Id FROM dbo.HotelChain WHERE Name = 'HotelChain E'
            );



    -- Insert Hotel for each Hotel Chain (at least 8 per chain)
    -- Hotel for HotelChain A
    INSERT INTO Hotel
    (
        HotelChainId,
        Star,
        NumRooms,
        Address,
        Email
    )
    VALUES
    (@HotelAId, 5, 5, '123 Elm Street, Springfield, IL 62701', 'hotelchainA_hotel1@email.com'),
    (@HotelAId, 4, 5, '456 Maple Avenue, Springfield, IL 62701', 'hotelchainA_hotel2@email.com'), -- Same Area
    (@HotelAId, 3, 5, '789 Oak Boulevard, Miami, FL 33101', 'hotelchainA_hotel3@email.com'),
    (@HotelAId, 5, 5, '101 Birch Road, Houston, TX 77001', 'hotelchainA_hotel4@email.com'),
    (@HotelAId, 4, 5, '202 Pine Drive, Denver, CO 80201', 'hotelchainA_hotel5@email.com'),
    (@HotelAId, 3, 5, '234 Cedar Street, Seattle, WA 98101', 'hotelchainA_hotel6@email.com'),
    (@HotelAId, 4, 5, '345 Walnut Street, Boston, MA 02101', 'hotelchainA_hotel7@email.com'),
    (@HotelAId, 5, 5, '567 Cherry Avenue, Phoenix, AZ 85001', 'hotelchainA_hotel8@email.com');

    -- Hotel for HotelChain B
    INSERT INTO Hotel
    (
        HotelChainId,
        Star,
        NumRooms,
        Address,
        Email
    )
    VALUES
    (@HotelBId, 4, 5, '678 Pineapple Lane, San Francisco, CA 94101', 'hotelchainB_hotel1@email.com'),
    (@HotelBId, 3, 5, '789 Maple Road, San Francisco, CA 94101', 'hotelchainB_hotel2@email.com'), -- Same Area
    (@HotelBId, 5, 5, '101 Banana Street, Orlando, FL 32801', 'hotelchainB_hotel3@email.com'),
    (@HotelBId, 4, 5, '202 Citrus Avenue, New York, NY 10001', 'hotelchainB_hotel4@email.com'),
    (@HotelBId, 3, 5, '303 Coconut Drive, Dallas, TX 75201', 'hotelchainB_hotel5@email.com'),
    (@HotelBId, 5, 5, '404 Mango Lane, Austin, TX 73301', 'hotelchainB_hotel6@email.com'),
    (@HotelBId, 4, 5, '505 Papaya Street, Houston, TX 77001', 'hotelchainB_hotel7@email.com'),
    (@HotelBId, 3, 5, '606 Grapefruit Road, Phoenix, AZ 85001', 'hotelchainB_hotel8@email.com');

    -- Hotel for HotelChain C
    INSERT INTO Hotel
    (
        HotelChainId,
        Star,
        NumRooms,
        Address,
        Email
    )
    VALUES
    (@HotelCId, 4, 5, '707 Kiwi Drive, San Diego, CA 92101', 'hotelchainC_hotel1@email.com'),
    (@HotelCId, 5, 5, '808 Strawberry Street, Portland, OR 97201', 'hotelchainC_hotel2@email.com'),
    (@HotelCId, 3, 5, '909 Blueberry Road, Seattle, WA 98101', 'hotelchainC_hotel3@email.com'),
    (@HotelCId, 4, 5, '101 Pine Street, New York, NY 10001', 'hotelchainC_hotel4@email.com'),
    (@HotelCId, 3, 5, '202 Palm Avenue, Los Angeles, CA 90001', 'hotelchainC_hotel5@email.com'),
    (@HotelCId, 5, 5, '303 Coconut Lane, Miami, FL 33101', 'hotelchainC_hotel6@email.com'),
    (@HotelCId, 4, 5, '404 Mango Road, Dallas, TX 75201', 'hotelchainC_hotel7@email.com'),
    (@HotelCId, 5, 5, '505 Peach Street, Denver, CO 80201', 'hotelchainC_hotel8@email.com');

    -- Hotel for HotelChain D
    INSERT INTO Hotel
    (
        HotelChainId,
        Star,
        NumRooms,
        Address,
        Email
    )
    VALUES
    (@HotelDId, 4, 5, '606 Cherry Drive, Chicago, IL 60601', 'hotelchainD_hotel1@email.com'),
    (@HotelDId, 5, 5, '707 Blueberry Avenue, Chicago, IL 60601', 'hotelchainD_hotel2@email.com'), -- Same Area
    (@HotelDId, 3, 5, '808 Raspberry Road, Boston, MA 02101', 'hotelchainD_hotel3@email.com'),
    (@HotelDId, 4, 5, '909 Blackberry Street, San Francisco, CA 94101', 'hotelchainD_hotel4@email.com'),
    (@HotelDId, 3, 5, '101 Tangerine Lane, Portland, OR 97201', 'hotelchainD_hotel5@email.com'),
    (@HotelDId, 5, 5, '202 Apple Street, Los Angeles, CA 90001', 'hotelchainD_hotel6@email.com'),
    (@HotelDId, 4, 5, '303 Peach Drive, Seattle, WA 98101', 'hotelchainD_hotel7@email.com'),
    (@HotelDId, 5, 5, '404 Grapefruit Boulevard, Miami, FL 33101', 'hotelchainD_hotel8@email.com');

    -- Hotel for HotelChain E
    INSERT INTO Hotel
    (
        HotelChainId,
        Star,
        NumRooms,
        Address,
        Email
    )
    VALUES
    (@HotelEId, 5, 5, '505 Pineapple Lane, San Francisco, CA 94101', 'hotelchainE_hotel1@email.com'),
    (@HotelEId, 4, 5, '606 Papaya Road, San Francisco, CA 94101', 'hotelchainE_hotel2@email.com'), -- Same Area
    (@HotelEId, 3, 5, '707 Kiwi Street, Portland, OR 97201', 'hotelchainE_hotel3@email.com'),
    (@HotelEId, 4, 5, '808 Mango Avenue, New York, NY 10001', 'hotelchainE_hotel4@email.com'),
    (@HotelEId, 5, 5, '909 Banana Boulevard, Miami, FL 33101', 'hotelchainE_hotel5@email.com'),
    (@HotelEId, 3, 5, '101 Coconut Drive, Houston, TX 77001', 'hotelchainE_hotel6@email.com'),
    (@HotelEId, 4, 5, '202 Apple Lane, Austin, TX 73301', 'hotelchainE_hotel7@email.com'),
    (@HotelEId, 5, 5, '303 Orange Street, Denver, CO 80201', 'hotelchainE_hotel8@email.com');




    DECLARE @HotelId INT;
DECLARE @i INT;

DECLARE HotelCursor CURSOR FOR
    SELECT Id
    FROM dbo.Hotel;

OPEN HotelCursor;
FETCH NEXT FROM HotelCursor INTO @HotelId;

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @i = 1;
    WHILE @i <= 6
    BEGIN
        INSERT INTO dbo.Room
        (
            HotelId,
            Price,
            Capacity,
            SeaView,
            MountainView,
            Extendable,
            Amenities,
            ProblemsDamages
        )
        VALUES
        (
            @HotelId, 
            CAST((50 + (RAND(CHECKSUM(NEWID())) * 300)) AS DECIMAL(10,2)), -- Random price between 50 and 350
            CASE 
                WHEN RAND(CHECKSUM(NEWID())) < 0.125 THEN N'Single'
                WHEN RAND(CHECKSUM(NEWID())) < 0.25 THEN N'Double'
                WHEN RAND(CHECKSUM(NEWID())) < 0.375 THEN N'Twin'
                WHEN RAND(CHECKSUM(NEWID())) < 0.5 THEN N'Triple'
                WHEN RAND(CHECKSUM(NEWID())) < 0.625 THEN N'Queen'
                WHEN RAND(CHECKSUM(NEWID())) < 0.75 THEN N'King'
                WHEN RAND(CHECKSUM(NEWID())) < 0.875 THEN N'Suite'
                ELSE N'Family' 
            END, 
            CAST(CAST(RAND(CHECKSUM(NEWID())) * 2 AS INT) AS BIT),  -- Random SeaView (0 or 1)
            CAST(CAST(RAND(CHECKSUM(NEWID())) * 2 AS INT) AS BIT),  -- Random MountainView (0 or 1)
            CAST(CAST(RAND(CHECKSUM(NEWID())) * 2 AS INT) AS BIT),  -- Random Extendable (0 or 1)
            CASE 
                WHEN RAND(CHECKSUM(NEWID())) < 0.111 THEN N'WiFi'
                WHEN RAND(CHECKSUM(NEWID())) < 0.222 THEN N'Swimming Pool'
                WHEN RAND(CHECKSUM(NEWID())) < 0.333 THEN N'Gym'
                WHEN RAND(CHECKSUM(NEWID())) < 0.444 THEN N'Parking'
                WHEN RAND(CHECKSUM(NEWID())) < 0.555 THEN N'Air Conditioning'
                WHEN RAND(CHECKSUM(NEWID())) < 0.666 THEN N'Restaurant'
                WHEN RAND(CHECKSUM(NEWID())) < 0.777 THEN N'Bar'
                WHEN RAND(CHECKSUM(NEWID())) < 0.888 THEN N'Spa'
                ELSE N'Room Service' 
            END + N', ' + 
            CASE 
                WHEN RAND(CHECKSUM(NEWID())) < 0.111 THEN N'WiFi'
                WHEN RAND(CHECKSUM(NEWID())) < 0.222 THEN N'Swimming Pool'
                WHEN RAND(CHECKSUM(NEWID())) < 0.333 THEN N'Gym'
                WHEN RAND(CHECKSUM(NEWID())) < 0.444 THEN N'Parking'
                WHEN RAND(CHECKSUM(NEWID())) < 0.555 THEN N'Air Conditioning'
                WHEN RAND(CHECKSUM(NEWID())) < 0.666 THEN N'Restaurant'
                WHEN RAND(CHECKSUM(NEWID())) < 0.777 THEN N'Bar'
                WHEN RAND(CHECKSUM(NEWID())) < 0.888 THEN N'Spa'
                ELSE N'Room Service' 
            END, 
            CASE 
                WHEN RAND(CHECKSUM(NEWID())) < 0.111 THEN N'broken WiFi'
                WHEN RAND(CHECKSUM(NEWID())) < 0.222 THEN N'broken Swimming Pool'
                WHEN RAND(CHECKSUM(NEWID())) < 0.333 THEN N'broken Gym'
                WHEN RAND(CHECKSUM(NEWID())) < 0.444 THEN N'broken Parking'
                WHEN RAND(CHECKSUM(NEWID())) < 0.555 THEN N'broken Air Conditioning'
                WHEN RAND(CHECKSUM(NEWID())) < 0.666 THEN N'broken Restaurant'
                WHEN RAND(CHECKSUM(NEWID())) < 0.777 THEN N'broken Bar'
                WHEN RAND(CHECKSUM(NEWID())) < 0.888 THEN N'broken Spa'
                ELSE N'broken Room Service' 
            END
        );

        SET @i = @i + 1;
    END

    FETCH NEXT FROM HotelCursor INTO @HotelId;
END

CLOSE HotelCursor;
DEALLOCATE HotelCursor;


END;
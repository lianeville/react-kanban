import React, { useState, useEffect } from "react"
import axios from "axios"

function Weather(props) {
	const [position, setPosition] = useState()
	const [weatherData, setweatherData] = useState()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(setPosition)
	}, [])

	useEffect(() => {
		if (position) {
			const options = {
				method: "GET",
				url: "https://weatherapi-com.p.rapidapi.com/current.json",
				params: {
					q: position.coords.latitude + "," + position.coords.longitude,
				},
				headers: {
					"X-RapidAPI-Key":
						"848da14390mshd502723a69a0d54p15fdd4jsnad1a1a4ffc43",
					"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
				},
			}

			axios
				.request(options)
				.then(function (response) {
					setweatherData(response.data)
				})
				.catch(function (error) {
					console.error(error)
				})
		}
	}, [position])

	return (
		<div>
			{weatherData && (
				<>
					<h1>{weatherData.location.name}</h1>
					<p>{weatherData.current.temp_f} F</p>
				</>
			)}
		</div>
	)
}

export default Weather

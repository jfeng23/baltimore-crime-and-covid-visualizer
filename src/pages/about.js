import React from 'react';

const About = () => {

	return (
		<>
      <h1>Our Project</h1>
      <p>The Baltimore Crime and COVID Visualizer is a web-based tool designed
      to help analyze crime and COVID-19 statistics for the Baltimore area. It
      was developed over the course of a 15-week semester by a team of
      undergraduate computer science students.</p>
      <h1>Our Data</h1>
      <p>Our COVID-19 data was sourced from Data.Gov and covers the range of
      Baltimore COVID-19 cases from April 2020 to October 2022.</p>
      <p>Our Baltimore crime data was sourced from Open Baltimore from January
      2019 to October 2022.</p>
      <h1>Our Team</h1>
      <p>This project was a group effort, and each member of the team
      specialized in a different area of development to play to our individual
      strengths.</p>
      <ul>
        <li>Justin Feng - System Modeling, Scripting</li>
        <li>Joey Loeb - React, Map Design (Leaflet.js, Heatmap.js)</li>
        <li>Denish Pasupuleti - Chart Design (Chart.js)</li>
        <li>John Veres - Flask API</li>
      </ul>
		</>
	);
};

export default About;
